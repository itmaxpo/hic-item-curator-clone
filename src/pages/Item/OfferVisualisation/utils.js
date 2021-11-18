import * as PhoneNumber from 'awesome-phonenumber'
import { isUndefined } from 'lodash/fp'

export const parsePolygonCoordinates = (coordinates) =>
  coordinates.map((coordinate) => ({
    lat: coordinate[1],
    lng: coordinate[0]
  }))

export const parsePhoneNumber = (phoneNumber, accommodationCountryCode) => {
  const oldNumber = isUndefined(phoneNumber) ? '' : phoneNumber
  const phone = new PhoneNumber(phoneNumber || '')
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
