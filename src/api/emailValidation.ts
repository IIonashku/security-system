export const emailValidation = async (email: string) => {
  const clientKey = 'f8770e70c0e042b5a1621fee1f1707b4'
  const url = `https://emailvalidation.abstractapi.com/v1/?api_key=${clientKey}&email=${email}`

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
