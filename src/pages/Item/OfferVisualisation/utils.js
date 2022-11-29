import * as PhoneNumber from 'awesome-phonenumber'
import { isUndefined } from 'lodash/fp'

export const parsePolygonCoordinates = (coordinates) =>
  coordinates.map((coordinate) => ({
    lat: coordinate[1],
    lng: coordinate[0]
  }))

export const parsePhoneNumber = (phoneNumber, accommodationCountryCode) => {
  // giata returns some phone numbers without '+' sign
  const isNonStandardPhoneNum =
    phoneNumber && !phoneNumber?.includes('+') && !phoneNumber?.startsWith('0')
  const standardNumber = isNonStandardPhoneNum ? `+${phoneNumber}` : phoneNumber

  const oldNumber = isUndefined(standardNumber) ? '' : standardNumber
  const phone = new PhoneNumber(standardNumber || '')
  const countryCode = phone.getRegionCode() || accommodationCountryCode
  const tel = phone.getNumber('significant') || ''
  const dialCode = phone.getCountryCode() ? `+${phone.getCountryCode()}` : accommodationCountryCode
  const isValid = phone.isValid()
  return {
    countryCode,
    phoneNumber: tel,
    oldNumber,
    dialCode,
    isValid
  }
}
