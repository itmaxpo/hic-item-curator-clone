import React, { lazy, Suspense, useState, useRef, useMemo, useEffect } from 'react'
import { flatten, isEmpty } from 'lodash'
import queryString from 'query-string'
import LazyLoad from 'react-lazyload'
import Layout from 'components/Layout'
import {
  Wrapper,
  CreateNewItemWrapper,
  CreateButton,
  SadFaceIconWrapper,
  StyledLoader,
  SearchBoxLoader
} from './styles'
import { calculateIndex, insertPage } from './utils'
import { getAreasInCountry, getAccommodations } from 'services/searchApi'
import {
  COUNTRY_ITEM_TYPE,
  AREA_ITEM_TYPE,
  ACCOMMODATION_ITEM_TYPE,
  ITEMS_PER_PAGE
} from 'utils/constants'
import { getQueryValue } from './SearchBox/utils'

const SearchBox = lazy(() => import(/* webpackChunkName: "SearchBox" */ './SearchBox'))
const SearchResult = lazy(() => import(/* webpackChunkName: "SearchResult" */ './SearchResult'))

/**
 * This is the Search Page component
 * Also it is a Home page for the app and server as '/' route
 *
 * @name SearchPage
 * @param {Object} history from react-router
 * @returns {Function} Search Page
 */
const SearchPage = ({ history }) => {
  const prevPayload = useRef(undefined)
  const itemTypeRef = useRef(undefined)
  const [results, setResults] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [country, setCountry] = useState(undefined)

  const parsedQuery = queryString.parse(history.location.search)

  // changes query in URL
  const onQueryUpdate = query => {
    history.push(`?${queryString.stringify(query)}`)
  }

  // changes query for SearchBox - so it clears "page" query
  const searchBoxQueryUpdate = query => {
    onQueryUpdate({ ...query, page: undefined })
  }

  const search = async (payload, page = 0, isNewSearch = false) => {
    const index = calculateIndex(page, ITEMS_PER_PAGE)

    // if its a brand new search (not fetching more items)
    // we clear the results
    if (isNewSearch) {
      setResults(null)
    }

    prevPayload.current = payload || prevPayload.current

    setIsLoading(true)

    // set search results
    switch (itemTypeRef.current) {
      case AREA_ITEM_TYPE: {
        const { data, meta } = await getAreasInCountry(prevPayload.current, index)
        setResults(prevResults =>
          insertPage(prevResults, index, data, meta.total_count, itemTypeRef.current)
        )
        break
      }
      case ACCOMMODATION_ITEM_TYPE: {
        const { data, meta } = await getAccommodations(prevPayload.current, index)
        setResults(prevResults =>
          insertPage(prevResults, index, data, meta.total_count, itemTypeRef.current)
        )
        break
      }
      default:
        return
    }

    setIsLoading(false)
    return
  }

  const createNewItem = () => {
    // Always should be on the top of the new page
    window.scrollTo(0, 0)
    history.push('/create')
  }

  const flattenedResults = useMemo(() => {
    return flatten(results)
  }, [results])

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

    setResults(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parsedQuery.countryId, parsedQuery.type])

  // effect to fire a search when pressing back button or url with sufficient data is provided
  useEffect(() => {
    const { areaId, countryId, name, supplier, page } = parsedQuery

    /*
     * early returns (no auto-triggered search):
     * - no country id
     * - user is on country tab
     * - user comes back from 'go to Area'
     */
    if (
      !countryId ||
      itemTypeRef.current === COUNTRY_ITEM_TYPE ||
      (itemTypeRef.current === AREA_ITEM_TYPE && areaId)
    )
      return

    search({ country: countryId, area: areaId, name, supplier }, page - 1 || 0)

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
          />
        </Suspense>
        {isLoading && <StyledLoader />}
        {!isEmpty(flattenedResults) && (
          <Suspense fallback={<StyledLoader />}>
            <SearchResult
              results={flattenedResults}
              setResults={newResults => {
                setResults(newResults)
              }}
              fetchMoreItems={search}
              isLoading={isLoading}
              locationQuery={parsedQuery}
              onQueryUpdate={onQueryUpdate}
              itemType={itemTypeRef.current}
              country={country}
              page={Number(parsedQuery.page)}
            />
          </Suspense>
        )}
        {results && !isLoading && (
          <LazyLoad height={131} once>
            <CreateNewItemWrapper p={0} direction={'ttb'} center alignItems={'center'}>
              {!isEmpty(flattenedResults) ? (
                <p>Didn't find what you're looking for?</p>
              ) : (
                <>
                  <SadFaceIconWrapper />
                  <p>No results</p>
                </>
              )}
              <CreateButton data-test="createNewItem" onClick={createNewItem}>
                Create New Item
              </CreateButton>
            </CreateNewItemWrapper>
          </LazyLoad>
        )}
      </Wrapper>
    </Layout>
  )
}

export default SearchPage
