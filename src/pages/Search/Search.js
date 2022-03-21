import { lazy, Suspense, useState, useRef, useEffect } from 'react'
import { isEmpty } from 'lodash'
import queryString from 'query-string'
import { FlexContainer, Subline } from '@tourlane/tourlane-ui'

import Layout from 'components/Layout'
import { Wrapper, StyledLoader, SearchBoxLoader } from './styles'
import { calculateIndex, parseItems } from './utils'
import { getAreasInCountry, getAccommodations } from 'services/searchApi'
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

const SearchBox = lazy(() => import(/* webpackChunkName: "SearchBox" */ './SearchBox'))
const SearchResult = lazy(() => import(/* webpackChunkName: "SearchResult" */ './SearchResult'))
const ActivitiesSearchResult = lazy(() =>
  import(/* webpackChunkName: "ActivitiesSearchResult" */ './ActivitiesSearchResult')
)

export const NoResults = () => (
  <FlexContainer p={0} mt={2} direction={'ttb'} center alignItems={'center'}>
    <SadFaceIcon />
    <Subline>No results</Subline>
  </FlexContainer>
)

const defaultAccommodationSearchState = {
  data: [],
  meta: {
    count: 0,
    total_count: 0
  }
}

/**
 * This is the Search Page component
 * Also it is a Home page for the app and server as '/' route
 *
 * @name SearchPage
 * @param {Object} history from react-router
 * @returns {Function} Search Page
 */

const SearchPage = ({ history }) => {
  const parsedQuery = queryString.parse(history.location.search)
  const { areaId, countryId, name, supplier, provider, page, missingGeolocation, blocked } =
    parsedQuery

  const prevPayload = useRef(undefined)
  const itemTypeRef = useRef(undefined)
  const [results, setResults] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [country, setCountry] = useState(undefined)
  const [category, setCategory] = useState(parsedQuery.type)
  const { enqueueNotification } = useNotification()

  const accommodationPageOffset = useRef(0)

  // this feature will be killed very soon 💀...
  const onFilterByMissingGeolocation = (filterValue) => {
    onQueryUpdate({
      ...parsedQuery,
      missingGeolocation: filterValue
    })
    setResults(null)
  }
  const onFilterByBlocklist = (isBlocked) => {
    onQueryUpdate({
      ...parsedQuery,
      blocked: isBlocked
    })
    setResults(null)
  }

  // changes query in URL
  const onQueryUpdate = (query) => {
    history.push(`?${queryString.stringify(query)}`)
    scrollToItemManager.setItemToScrollTo(null)
  }

  // changes query for SearchBox - so it clears "page" query
  const searchBoxQueryUpdate = (query) => {
    onQueryUpdate({ ...query, page: undefined })
  }

  /**
   * The offset parameter can be removed once the response for
   * mergeItems request has been fixed on the backend.
   */
  const search = async (payload = null, page = 0, isNewSearch = false, offset) => {
    try {
      const updateSearchState = (data, meta) => {
        const parsedItems = parseItems(data, itemTypeRef.current)
        setResults((currentState) => {
          const d = currentState?.data ?? []
          return {
            data: offset === 0 ? parsedItems : [...d, ...parsedItems],
            meta
          }
        })
      }

      const index = calculateIndex(page, ITEMS_PER_PAGE)

      // if its a brand new search (not fetching more items)
      // we clear the results and set page query to first page
      if (isNewSearch) {
        setResults(defaultAccommodationSearchState)
        onQueryUpdate({ ...parsedQuery, page: 1 })
      }

      prevPayload.current = payload || prevPayload.current

      // set search results
      switch (itemTypeRef.current) {
        case AREA_ITEM_TYPE: {
          setIsLoading(true)
          const { data, meta } = await getAreasInCountry(prevPayload.current, index)
          updateSearchState(data, meta)
          break
        }
        case ACCOMMODATION_ITEM_TYPE: {
          setIsLoading(true)
          const { data, meta } = await getAccommodations(
            prevPayload.current,
            offset ?? accommodationPageOffset.current + 1
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
    } catch (error) {
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
      country !== getQueryValue(parsedQuery, 'countryName', 'countryId').label
    ) {
      setCountry(getQueryValue(parsedQuery, 'countryName', 'countryId').label)
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
        country: countryId,
        area: areaId,
        name,
        supplier,
        provider,
        missingGeolocation: missingGeolocation === 'true',
        blocked: blocked === 'true'
      },
      page - 1 || 0
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
          !isEmpty(results) && (
            <SearchResult
              results={results}
              fetchMoreItems={search}
              isLoading={isLoading}
              locationQuery={parsedQuery}
              onQueryUpdate={onQueryUpdate}
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
