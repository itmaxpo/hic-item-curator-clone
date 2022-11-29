import { lazy, Suspense, useState, useRef, useEffect } from 'react'
import { isEmpty } from 'lodash'
import queryString, { ParsedQuery } from 'query-string'
import { FlexContainer, Subline } from '@tourlane/tourlane-ui'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { useNotification } from 'components/Notification'

import Layout from 'components/Layout'
import { Wrapper, StyledLoader, SearchBoxLoader } from './styles'
import { calculateIndex, parseItems } from './utils'
import {
  getAreasInCountry,
  getAccommodations,
  IData,
  meta,
  ISearchQueryAccom
} from 'services/searchApi'
import {
  COUNTRY_ITEM_TYPE,
  AREA_ITEM_TYPE,
  ACCOMMODATION_ITEM_TYPE,
  ACTIVITY_ITEM_TYPE,
  ITEMS_PER_PAGE
} from 'utils/constants'
import { getQueryValue } from './SearchBox/utils'
import { SadFaceIcon } from 'components/Icon'
import { scrollToItemManager } from 'utils/ScrollToItemManager'

// @ts-ignore
const SearchBox = lazy(() => import(/* webpackChunkName: "SearchBox" */ './SearchBox'))
const SearchResult = lazy(() => import(/* webpackChunkName: "SearchResult" */ './SearchResult'))
const ActivitiesSearchResult = lazy(
  () => import(/* webpackChunkName: "ActivitiesSearchResult" */ './ActivitiesSearchResult')
)

export const NoResults = () => (
  <FlexContainer p={0} mt={2} direction={'ttb'} center alignItems={'center'}>
    <SadFaceIcon />
    <Subline>No results</Subline>
  </FlexContainer>
)

export interface IParseItem {
  id: string
  parentId: string
  type: string
  title: string
  description: string
  allImages: string[]
  isLoading: boolean
  isMerged: boolean
  blocked?: { markets: string }
  source: string[]
  isSelected: boolean
}

export interface IParsedResults {
  data: IParseItem[]
  meta: meta
}
const defaultAccommodationSearchState = {
  data: [],
  meta: {
    count: 0,
    total_count: 0
  }
}

const SearchPage = () => {
  let [urlParams] = useSearchParams()
  const queryParams = Object.fromEntries(urlParams)
  const { areaId, countryId, name, supplier, provider, page, missingGeolocation, blocked } =
    queryParams

  const prevPayload = useRef<any>(undefined)
  const itemTypeRef = useRef<any>(undefined)
  const [results, setResults] = useState<IParsedResults | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [country, setCountry] = useState(undefined)
  const [category, setCategory] = useState(queryParams?.type)
  const { enqueueNotification } = useNotification()
  const navigate = useNavigate()

  const accommodationPageOffset = useRef(0)

  // this feature will be killed very soon 💀...
  const onFilterByMissingGeolocation = (filterValue: string) => {
    onQueryUpdate({
      ...queryParams,
      missingGeolocation: filterValue
    })
    setResults(null)
  }
  const onFilterByBlocklist = (isBlocked: 'true' | 'false') => {
    onQueryUpdate({
      ...queryParams,
      blocked: isBlocked
    })
    setResults(null)
  }

  // changes query in URL
  const onQueryUpdate = (query: ParsedQuery<string>) => {
    navigate(`?${queryString.stringify(query)}`)
    scrollToItemManager.setItemToScrollTo(null)
  }

  // changes query for SearchBox - so it clears "page" query
  const searchBoxQueryUpdate = (query: ParsedQuery<string>) => {
    onQueryUpdate({ ...query, page: null })
  }

  /**
   * The offset parameter can be removed once the response for
   * mergeItems request has been fixed on the backend.
   */

  const search = async (
    payload?: ISearchQueryAccom,
    page?: number,
    isNewSearch?: boolean,
    offset?: number
  ): Promise<void> => {
    try {
      const updateSearchState = (data: IData[], meta: meta) => {
        const parsedItems = parseItems(data, itemTypeRef.current)
        setResults((currentState) => {
          const d = currentState?.data ?? []
          return {
            data: offset === 0 ? parsedItems : [...d, ...parsedItems],
            meta
          }
        })
      }

      const index = calculateIndex(page ?? 0, ITEMS_PER_PAGE)

      // if its a brand new search (not fetching more items)
      // we clear the results and set page query to first page
      if (isNewSearch) {
        setResults(defaultAccommodationSearchState)
        onQueryUpdate({ ...queryParams, page: String(1) })
      }

      prevPayload.current = payload || prevPayload.current

      // set search results
      switch (itemTypeRef.current) {
        case AREA_ITEM_TYPE: {
          setIsLoading(true)
          const { data, meta } = await getAreasInCountry(prevPayload?.current, index)
          updateSearchState(data, meta)
          break
        }
        case ACCOMMODATION_ITEM_TYPE: {
          setIsLoading(true)
          const { data, meta } = await getAccommodations(
            prevPayload.current,
            offset ?? accommodationPageOffset.current
          )
          /**
           * if there is an offset and its zero reset
           * accommodationPageOffset to zero. This is not the best
           * implementation but it will do for now until we fix mergeItems response
           * on the beckend.
           */
          accommodationPageOffset.current =
            offset === 0 ? data.length : accommodationPageOffset.current + data.length
          updateSearchState(data, meta)
          break
        }
        default:
          return
      }
    } catch (error: any) {
      enqueueNotification({
        variant: 'error',
        message: error.message || 'Items could not be fetched'
      })
    }

    setIsLoading(false)
  }

  // effect to update local values with query values
  useEffect(() => {
    itemTypeRef.current = queryParams.type

    // set country
    if (
      queryParams.countryId &&
      country !== getQueryValue(queryParams, 'countryName', 'countryId')?.label
    ) {
      setCountry(getQueryValue(queryParams, 'countryName', 'countryId')?.label)
    }

    if (!queryParams.countryId) {
      setCountry(undefined)
    }

    setResults(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams.countryId, queryParams.type])

  // effect to fire a search when pressing back button or url with sufficient data is provided
  useEffect(() => {
    /*
     * early returns (no auto-triggered search):
     * - user haven't selected an item tab
     * - user is on country tab
     * - user is on area tab but haven't selected a country
     * - user comes back from 'go to Area'
     * - user is on accommodation tab but haven't selected country nor supplier
     */

    if (
      !itemTypeRef.current ||
      itemTypeRef.current === COUNTRY_ITEM_TYPE ||
      (itemTypeRef.current === AREA_ITEM_TYPE && !countryId) ||
      (itemTypeRef.current === AREA_ITEM_TYPE && areaId) ||
      (itemTypeRef.current === ACCOMMODATION_ITEM_TYPE && !(countryId || supplier))
    )
      return
    search(
      {
        country: countryId as string,
        area: areaId as string,
        name: name as string,
        supplier: supplier as string,
        provider: provider as string,
        missingGeolocation: missingGeolocation === 'true',
        blocked: blocked === 'true'
      },
      page ? Number(page) - 1 : 0,
      true,
      0
    )

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout>
      <Wrapper>
        <Suspense fallback={<SearchBoxLoader category={queryParams.type} />}>
          <SearchBox
            search={search}
            locationQuery={queryParams}
            onQueryUpdate={searchBoxQueryUpdate}
            onFilterByMissingGeolocation={onFilterByMissingGeolocation}
            onFilterByBlocklist={onFilterByBlocklist}
            setCategory={setCategory}
            isLoading={isLoading}
          />
        </Suspense>

        {isLoading && <StyledLoader />}

        {category === ACTIVITY_ITEM_TYPE ? (
          <ActivitiesSearchResult
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            locationQuery={queryParams}
            onQueryUpdate={onQueryUpdate}
          />
        ) : (
          !!results && (
            <SearchResult
              results={results}
              fetchMoreItems={search}
              isLoading={isLoading}
              itemType={itemTypeRef.current}
              country={country}
              page={Number(queryParams.page)}
            />
          )
        )}

        {results && isEmpty(results) && !isLoading && <NoResults />}
      </Wrapper>
    </Layout>
  )
}

export default SearchPage
