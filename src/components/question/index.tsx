import React, { useCallback, useEffect, useState } from 'react'

import GooglePlacesAutocomplete from 'react-google-autocomplete'

import {
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  OutlinedInput,
  Box
} from '@mui/material'
import { debounce } from 'lodash'
import queryString from 'query-string'
import { emailValidation } from 'src/api/emailValidation'
import { phoneValidation } from 'src/api/phoneValidation'
import { getCityByZip } from 'src/api/zip'
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { SwiperButtonNext, SwiperButtonPrev } from '../swiperButton'
import { EQuizType } from 'src/types/enums'
import { Answer } from 'src/types/quiz'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import { quiz } from 'src/utils/constants/question'
import { parseQuizToObject } from 'src/utils/parseData/quizParse'

import styles from './question.module.scss'

export const Questions = () => {
  const [data, setData] = useState(parseQuizToObject(quiz))
  const [currentStep, setCurrentStep] = useState(0)
  const totalSteps = quiz.length
  const params = queryString.parse(location.search)

  const renderInputByType = (
    answers: Answer[],
    data: { [key: string]: string | string[] },
    setData: React.Dispatch<React.SetStateAction<{ [key: string]: string | string[] }>>
  ) => {
    const handleInputChange = (name: string, value: string) => {
      setData((prevData) => ({
        ...prevData,
        [name]: value
      }))
    }
    const handleRadioChange = (name: string, value: string) => {
      setData((prevData) => ({
        ...prevData,
        [name]: [value]
      }))
    }
    const handleSelectChange = (name: string, value: string | string[]) => {
      setData((prevData) => ({
        ...prevData,
        [name]: typeof value === 'string' ? value.split(',') : value
      }))
    }
    const handleZipChange = useCallback(async (name: string, value: string) => {
      setData((prevData) => ({
        ...prevData,
        [name]: value
      }))

      await fetchZipDelay(value)
    }, [])
    const handleEmailChange = useCallback(async (name: string, value: string) => {
      setData((prevData) => ({
        ...prevData,
        [name]: value
      }))

      await fetchEmailDelay(value)
    }, [])
    const handlePhoneChange = useCallback(async (name: string, value: string) => {
      setData((prevData) => ({
        ...prevData,
        [name]: value
      }))

      await fetchPhoneDelay(value)
    }, [])

    const fetchZipDelay = debounce(async (zip: string) => {
      const res = await getCityByZip(zip)

      if (res.results.length === 0) {
        alert('the zip is invalid')
        setData((prevData) => ({
          ...prevData,
          ['city']: '',
          ['state']: ''
        }))
      } else {
        setData((prevData) => ({
          ...prevData,
          ['city']: res.results[0].address_components[1].long_name,
          ['state']: res.results[0].address_components[2].long_name
        }))
      }
    }, 1000)
    const fetchEmailDelay = debounce(async (email: string) => {
      const res = await emailValidation(email)

      console.log('Email Validation:', res)
    }, 2000)
    const fetchPhoneDelay = debounce(async (phone: string) => {
      const res = await phoneValidation(phone)

      console.log('Phone Validation:', res)
    }, 2000)

    return answers.map((answerItem, key) => {
      switch (answerItem.type) {
        case EQuizType.radio:
          return (
            <RadioGroup key={key}>
              {Array.isArray(answerItem.values) &&
                answerItem.values.map((answer, index) => (
                  <FormControlLabel
                    key={index}
                    value={answer.value}
                    control={<Radio />}
                    label={answer.name}
                    checked={data[answerItem.name][0] === answer.value}
                    onChange={(e) =>
                      handleRadioChange(answerItem.name, (e.target as HTMLInputElement).value)
                    }
                  />
                ))}
            </RadioGroup>
          )
        case EQuizType.select:
          return (
            <FormControl key={key}>
              <InputLabel>Select</InputLabel>
              <Select
                multiple
                value={data[answerItem.name]}
                input={<OutlinedInput label='Features' />}
                onChange={(e) => handleSelectChange(answerItem.name, e.target.value)}
              >
                {Array.isArray(answerItem.values) &&
                  answerItem.values.map((answer, index) => (
                    <MenuItem key={index} value={answer.value}>
                      {answer.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          )
        case EQuizType.zip:
          return (
            <TextField
              key={key}
              type='text'
              placeholder='Enter your zip...'
              value={data[answerItem.name] || ''}
              onChange={(e) => handleZipChange(answerItem.name, e.target.value)}
            />
          )
        case EQuizType.inputAddress:
          return (
            <GooglePlacesAutocomplete
              key={key}
              apiKey='AIzaSyDcFfXYKbLxNHJKzr5_qIlni3BRucMXXbc'
              onPlaceSelected={(place) =>
                handleInputChange(answerItem.name, place.formatted_address)
              }
            />
          )

        case EQuizType.email:
          return (
            <Box className={styles.textField} key={key}>
              <TextField
                type='email'
                placeholder='Enter your Email...'
                value={data[answerItem.name]}
                onChange={(e) => handleEmailChange(answerItem.name, e.target.value)}
              />
            </Box>
          )
        case EQuizType.phone:
          return (
            <Box className={styles.textField} key={key}>
              <TextField
                type='number'
                placeholder='Enter your phone...'
                value={data[answerItem.name]}
                onChange={(e) => handlePhoneChange(answerItem.name, e.target.value)}
              />
            </Box>
          )
        default:
          return (
            <Box className={styles.textField} key={key}>
              <TextField
                type='text'
                placeholder={`Enter ${answerItem.name}`}
                value={data[answerItem.name] || ''}
                onChange={(e) => handleInputChange(answerItem.name, e.target.value)}
              />
            </Box>
          )
      }
    })
  }

  useEffect(() => {
    Object.values(params).forEach((el, index) => {
      setData((prevData) => ({
        ...prevData,
        [`lp_s${index + 1}`]: el as string
      }))
    })
  }, [])

  return (
    <>
      <Swiper
        scrollbar={{ draggable: false }}
        modules={[Navigation]}
        className='mySwiper'
        simulateTouch={false}
      >
        {quiz.map((el, index) => (
          <SwiperSlide key={index}>
            <Box className={styles.question}>
              <Typography>{el.question}</Typography>
            </Box>
            {renderInputByType(el.answers, data, setData)}
          </SwiperSlide>
        ))}
        <Box className={styles.controlBtn}>
          <SwiperButtonPrev currentStep={currentStep} setCurrentStep={setCurrentStep} />
          <SwiperButtonNext
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            totalSteps={totalSteps}
            data={data}
          />
        </Box>
      </Swiper>
    </>
  )
}
