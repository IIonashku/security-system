export const getCityByZip = async (zip: string) => {
  const clientKey = 'AIzaSyDcFfXYKbLxNHJKzr5_qIlni3BRucMXXbc'
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&sensor=true&key=${clientKey}`

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(
        "This API doesn't provide information about this zipcode! Try again with another zipcode value"
      )
    }

    const data = await response.json()
    return data
  } catch (error: any) {
    console.log('There has been a problem with your fetch operation: ' + error.message)
    throw error
  }
}
