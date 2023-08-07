import React from 'react'

import { Button } from '@mui/material'
import { sendQuizData } from 'src/api/qiuzPost'
import { useSwiper } from 'swiper/react'

interface IButtonNextProps {
  currentStep: number
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
  data: { [key: string]: string | string[] }
  totalSteps: number
}

interface IButtonPrevProps {
  currentStep: number
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
}

export const SwiperButtonNext: React.FC<IButtonNextProps> = ({
  currentStep,
  setCurrentStep,
  totalSteps,
  data
}) => {
  const swiper = useSwiper()

  const onClick = () => {
    setCurrentStep((prev) => prev + 1)
    swiper.slideNext()
  }

  const onSend = () => {
    sendQuizData(data)
  }

  if (totalSteps && currentStep >= totalSteps - 1) {
    return <Button onClick={onSend}>Send</Button>
  } else {
    return <Button onClick={onClick}>Next</Button>
  }
}

export const SwiperButtonPrev: React.FC<IButtonPrevProps> = ({ currentStep, setCurrentStep }) => {
  const swiper = useSwiper()

  const onClick = () => {
    setCurrentStep((prev) => prev - 1)
    swiper.slidePrev()
  }

  return (
    <Button disabled={currentStep === 0} onClick={onClick}>
      Prev
    </Button>
  )
}
