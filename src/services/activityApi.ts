import { getJson, patchJson } from './request'
import { mapKeys, mapValues, get } from 'lodash'

interface MinMaxRestriction {
  restricted: boolean
  min: number | null
  max: number | null
}

export interface IActivity {
  uuid: string
  original_id: string
  supplier_id: string
  name: string
  display_name: string | null
  provider: string
  country: any
  description: string | null
  location: {
    lat: number
    lon: number
  }
  touristic_areas: { uuid: string; name: string }[]
  address: string | null
  exclusions: string | null
  inclusions: string | null
  restrictions: {
    disability_restricted: boolean
    pregnancy_restricted: boolean
    height: MinMaxRestriction
    weight: MinMaxRestriction
    physical_conditions: { restricted: boolean; notes: string | null }
    shoes_size_required: boolean | null
    clothes_size_required: boolean | null
    other_pax_information: { required: boolean; notes: string | null }
  }
  themes: string[]
  what_to_bring: string | null
}

export const getActivityById = async (id: string | number, locale = 'en-GB') => {
  let { data } = await getJson<{ data: IActivity }>(
    `${process.env.REACT_APP_PARTNERS_API}/content/activities/${id}`,
    {
      locale
    }
  )

  return data
}

interface IActivityPayload extends Omit<IActivity, 'uuid' | 'restrictions'> {
  locale: string

  pregnancy_restricted?: boolean | null
  disability_restricted?: boolean | null
  physical_conditions_restricted?: boolean | null
  physical_conditions_restrictions_notes?: string | null

  weight_restricted?: boolean | null
  weight_min_restriction?: number | null
  weight_max_restriction?: number | null

  height_restricted?: boolean | null
  height_min_restriction?: number | null
  height_max_restriction?: number | null

  shoes_size_required?: boolean | null
  clothes_size_required?: boolean | null
  other_pax_information_required?: boolean | null
  other_pax_information_notes?: boolean | string
}

const updatePropsMapping: Partial<Record<keyof IActivityPayload, string>> = {
  pregnancy_restricted: 'restrictions.pregnancy_restricted',
  disability_restricted: 'restrictions.disability_restricted',
  physical_conditions_restricted: 'restrictions.physical_conditions.restricted',
  physical_conditions_restrictions_notes: 'restrictions.physical_conditions.notes',

  weight_restricted: 'restrictions.weight.restricted',
  weight_min_restriction: 'restrictions.weight.min',
  weight_max_restriction: 'restrictions.weight.max',

  height_restricted: 'restrictions.height.restricted',
  height_min_restriction: 'restrictions.height.min',
  height_max_restriction: 'restrictions.height.max',

  shoes_size_required: 'restrictions.shoes_size_required',
  clothes_size_required: 'restrictions.clothes_size_required',
  other_pax_information_required: 'restrictions.other_pax_information.required',
  other_pax_information_notes: 'restrictions.other_pax_information.notes'
}

export const updateActivity = async ({ uuid, ...activity }: IActivity & { locale: string }) => {
  try {
    let { data } = await patchJson<{ data: IActivity }, IActivityPayload>(
      `${process.env.REACT_APP_PARTNERS_API}/content/activities/${uuid}`,
      {
        ...activity,
        ...mapValues(updatePropsMapping, (key) => get(activity, key!))
      },
      'application/json'
    )

    return data
  } catch (e) {
    if (e instanceof Error) {
      throw e
    }

    throw mapKeys(e, (_, key) => updatePropsMapping[key as keyof IActivityPayload] ?? key)
  }
}
