import { convertData } from 'src/utils/parseData/quizParse'

export const sendQuizData = async (data: { [key: string]: string | string[] }) => {
  const url = 'https://bluemodo.leadspediatrack.com/post.do'

  const newData = convertData(data)

  const urlWithQueryParams = new URL(url)
  Object.entries(newData).forEach(([key, value]) => {
    urlWithQueryParams.searchParams.append(key, value)
  })

  const response = await fetch(urlWithQueryParams, {
    method: 'GET'
  })

  const xmlResponse = await response.text()
  const convertedData = convertXMLData(xmlResponse)

  alert(JSON.stringify(convertedData))
}

const convertXMLData = (xmlString: string) => {
  const parser = new DOMParser()
  const xmlDoc = parser.parseFromString(xmlString, 'text/xml')

  const resultElement = xmlDoc.querySelector('result')
  const priceElement = xmlDoc.querySelector('price')
  const msgElement = xmlDoc.querySelector('msg')
  const errorElement = xmlDoc.querySelector('errors error')

  const result = resultElement?.textContent
  const price = priceElement?.textContent
  const msg = msgElement?.textContent
  const error = errorElement?.textContent

  return {
    result,
    price,
    msg,
    error
  }
}
