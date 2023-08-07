/* eslint-disable camelcase */
import { EQuizType } from 'src/types/enums'
import { Quiz } from 'src/types/quiz'

export function parseQuizToObject(quiz: Quiz): { [key: string]: string | string[] } {
  const result: { [key: string]: string | string[] } = {}

  for (const question of quiz) {
    for (const answer of question.answers) {
      if (answer.type === EQuizType.radio || answer.type === EQuizType.select) {
        const valuesArray = Array.isArray(answer.values) ? answer.values : []
        const value = valuesArray.length > 0 ? [valuesArray[0].value] : []
        result[answer.name] = value
      } else {
        if (Array.isArray(answer.values) && answer.values.length > 0) {
          const { value } = answer.values[0]
          result[answer.name] = value
        } else {
          result[answer.name] = ''
        }
      }
    }
  }

  return result
}

export const convertData = (data: { [key: string]: string | string[] }) => {
  const keyToConvertToString = 'features'
  const campaignData = {
    lp_campaign_id: '64b9ccf73e38c',
    lp_campaign_key: 'mYFhzwtX7LKWBGgD34Tb'
  }

  return {
    ...data,
    ...campaignData,
    [keyToConvertToString]: JSON.stringify(data[keyToConvertToString])
  }
}
