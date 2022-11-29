import { getAccommodationCategoriesApi } from 'services/accommCategoriesApi'
import { ACCOMM_CATEGORY_COMPONENT_NAME } from 'pages/Item/utils'
import { usePromise } from '../../utils/usePromise'

const DEFAULT_LABEL = 'No Category'
// new format category: category?.uuid, old format category: kiwi://Elephant/Item/${category?.uuid}
export let useAccommodationCategories = (isNewFormat) => {
  let [{ data: categories = [] }] = usePromise(
    async () => sortCategories(mapCategories(await getAccommodationCategoriesApi(), isNewFormat)),
    []
  )

  return [{ value: null, label: DEFAULT_LABEL }, ...categories]
}

const mapCategories = (res, isNewFormat) => [
  ...res?.data
    .filter(({ uuid }) => uuid)
    .map((category) => {
      const label = category?.fields[0]?.content
      const value = isNewFormat ? category?.uuid : `kiwi://Elephant/Item/${category?.uuid}`
      return { value, label }
    })
]

const orderedCategories = ['No Category', 'Eco-Budget', 'Budget', 'Standard', 'Luxury', 'High-End']

// ensure the sorting follows this order
function sortCategories(categories) {
  return categories.sort(
    (a, b) => orderedCategories.indexOf(a.label) - orderedCategories.indexOf(b.label)
  )
}

/**
 * Other Helper methods
 */

export function getDefaultCategoryValue(categories = []) {
  const { value: defaultValue } = categories.find(
    (category) => category?.label === DEFAULT_LABEL
  ) ?? { value: null }
  return defaultValue
}

export function getCategoryValue(item, categories) {
  return item?.[ACCOMM_CATEGORY_COMPONENT_NAME] ?? getDefaultCategoryValue(categories)
}

export function getCategoryLabel(item, categories = []) {
  const value = getCategoryValue(item, categories)
  const { label } = categories.find((category) => category?.value === value) ?? { label: '' }
  return label
}
