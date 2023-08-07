export const phoneValidation = async (phone: string) => {
  const clientKey = 'ffb330b58c8e790ebaccfc13c097069b'
  const url = `http://apilayer.net/api/validate?access_key=${clientKey}&number=${phone}`

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error('Something went wrong')
    }

    const data = await response.json()
    return data
  } catch (error: any) {
    console.log('There has been a problem with your fetch operation: ' + error.message)
    throw error
  }
}
