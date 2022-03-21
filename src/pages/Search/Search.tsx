import { lazy, Suspense, useState, useRef, useEffect, FC } from 'react'
import { isEmpty } from 'lodash'
import queryString, { ParsedQuery } from 'query-string'
import { FlexContainer, Subline } from '@tourlane/tourlane-ui'
import { RouteComponentProps } from 'react-router-dom'

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
import { useNotification } from 'components/Notification'

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

const SearchPage: FC<RouteComponentProps> = ({ history }) => {
  const parsedQuery = queryString.parse(history.location.search)
  const { areaId, countryId, name, supplier, provider, page, missingGeolocation, blocked } =
    parsedQuery

  const prevPayload = useRef<any>(undefined)
  const itemTypeRef = useRef<any>(undefined)
  const [results, setResults] = useState<IParsedResults | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [country, setCountry] = useState(undefined)
  const [category, setCategory] = useState(parsedQuery.type)
  const { enqueueNotification } = useNotification()

  const accommodationPageOffset = useRef(0)

  // this feature will be killed very soon 💀...
  const onFilterByMissingGeolocation = (filterValue: string) => {
    onQueryUpdate({
      ...parsedQuery,
      missingGeolocation: filterValue
    })
    setResults(null)
  }
  const onFilterByBlocklist = (isBlocked: 'true' | 'false') => {
    onQueryUpdate({
      ...parsedQuery,
      blocked: isBlocked
    })
    setResults(null)
  }

  // changes query in URL
  const onQueryUpdate = (query: ParsedQuery<string>) => {
    history.push(`?${queryString.stringify(query)}`)
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
        onQueryUpdate({ ...parsedQuery, page: String(1) })
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
    itemTypeRef.current = parsedQuery.type

    // set country
    if (
      parsedQuery.countryId &&
      country !== getQueryValue(parsedQuery, 'countryName', 'countryId')?.label
    ) {
      setCountry(getQueryValue(parsedQuery, 'countryName', 'countryId')?.label)
    }

    if (!parsedQuery.countryId) {
      setCountry(undefined)
    }

    setResults(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parsedQuery.countryId, parsedQuery.type])

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
        provider,
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
        <Suspense fallback={<SearchBoxLoader category={parsedQuery.type} />}>
          <SearchBox
            search={search}
            history={history}
            locationQuery={parsedQuery}
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
            locationQuery={parsedQuery}
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
              page={Number(parsedQuery.page)}
            />
          )
        )}

        {results && isEmpty(results) && !isLoading && <NoResults />}
      </Wrapper>
    </Layout>
  )
}

export default SearchPage
