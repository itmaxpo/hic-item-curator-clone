import PhoneNumber from 'awesome-phonenumber'

import { ISupplier } from 'services/configurationsApi'
import type { AccommodationType } from 'types/Accommodation'

interface ValidatePhoneNumberType {
  countryCode: string
  phoneNumber: string
  areaCode: string
  isValid: boolean
}

export const validatePhoneNumber = (textPhone: string): ValidatePhoneNumberType => {
  const isNonStandardPhoneNum =
    textPhone && !textPhone?.includes('+') && !textPhone?.startsWith('0')
  const standardNumber = isNonStandardPhoneNum ? `+${textPhone}` : textPhone
  const phone = new PhoneNumber(standardNumber || '')

  return {
    countryCode: phone.getRegionCode(),
    phoneNumber: phone.getNumber('significant') || '',
    areaCode: phone.getCountryCode() ? `+${phone.getCountryCode()}` : '',
    isValid: phone.isValid()
  }
}

export const mapSources = (suppliers: ISupplier[], accommodation: AccommodationType) => {
  const SuppliersUuidList = Object.keys(accommodation?.dmcs)
  const { google_place_id, giata_id, wetu_id } = accommodation

  return [
    ...suppliers
      .filter((supplier) => SuppliersUuidList.includes(supplier.uuid))
      ?.map(({ name }) => name),
    ...(google_place_id ? ['Google Places'] : []),
    ...(giata_id ? ['Giata'] : []),
    ...(wetu_id ? ['Wetu'] : [])
  ]
}
