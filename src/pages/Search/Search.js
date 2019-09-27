import React, { useState, useRef, useCallback, useMemo } from 'react'
import { flatten, isEmpty } from 'lodash'
import * as queryString from 'query-string'
import Layout from 'components/Layout'
import { Wrapper, CreateNewItemWrapper, CreateButton, SadFaceIconWrapper } from './styles'
import SearchBox from './SearchBox'
import SearchResultWrapper from './SearchResult'
import { parseSearchResponse, calculateOffsetAndIndex, insertPage } from './utils'
import { getAreasInCountry, getAccommodations } from 'services/searchApi'
import { AREA_ITEM_TYPE, ACCOMMODATION_ITEM_TYPE } from 'pages/ItemPage/itemParser'
import { getQueryValue } from './SearchBox/utils'

/**
 * This is the Search Page component
 * Also it is a Home page for the app and server as '/' route
 *
 * @name SearchPage
 * @param {Object} location from route
 * @returns {Object} Search Page
 */
const SearchPage = ({ history }) => {
  const totalResultsCount = useRef(undefined)
  const prevPayload = useRef(undefined)
  const [results, setResults] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [itemType, setItemType] = useState(undefined)
  const parsedQuery = queryString.parse(history.location.search)

  const onItemTypeChangeHandler = useCallback(type => {
    setItemType(type)
  }, [])

  const onSearchHandler = (searchResponse, totalResults) => {
    const country = getQueryValue(parsedQuery, 'countryName', 'countryId').label

    totalResultsCount.current = totalResults
    setResults(parseSearchResponse(searchResponse, totalResults, itemType, country))
  }
  // changes query in URL
  const onQueryUpdate = query => {
    history.push(`?${queryString.stringify(query)}`)
  }

  const search = async payload => {
    prevPayload.current = payload

    setResults([])
    // set search results
    switch (itemType) {
      case AREA_ITEM_TYPE: {
        const { data, meta } = await getAreasInCountry('', payload)
        onSearchHandler(data, meta.total_count)
        break
      }
      case ACCOMMODATION_ITEM_TYPE: {
        const { data, meta } = await getAccommodations(payload)
        onSearchHandler(data, meta.total_count)
        break
      }
      default:
        return
    }
  }

  const fetchMoreItems = async (page, itemsPerPage) => {
    const { offset, index } = calculateOffsetAndIndex(page, itemsPerPage)

    switch (itemType) {
      case AREA_ITEM_TYPE: {
        const { data } = await getAreasInCountry('', prevPayload.current, offset)
        setResults(prevResults => insertPage(prevResults, index, data, itemType))
        break
      }
      case ACCOMMODATION_ITEM_TYPE: {
        const { data } = await getAccommodations(prevPayload.current, offset)
        setResults(prevResults => insertPage(prevResults, index, data, itemType))
        break
      }
      default:
        return
    }

    return
  }
  // Updates allItems with changed selectedItems
  const updateSelectedResults = (allItems, index, propName, propValue) =>
    allItems.map((arr, i) =>
      i !== index ? arr : arr.map(item => ({ ...item, [propName]: propValue }))
    )

  const createNewItem = () => {
    // Always should be on the top of the new page
    window.scrollTo(0, 0)
    history.push('/create')
  }

  const flattenedResults = useMemo(() => {
    return flatten(results)
  }, [results])

  return (
    <Layout>
      <Wrapper>
        <SearchBox
          search={search}
          onItemTypeChange={onItemTypeChangeHandler}
          history={history}
          locationQuery={parsedQuery}
          onQueryUpdate={onQueryUpdate}
          isLoading={isLoading}
          onLoadingChange={setIsLoading}
        />
        {!isEmpty(flattenedResults) && (
          <SearchResultWrapper
            results={flattenedResults}
            updateSelectedResults={updateSelectedResults}
            fetchMoreItems={fetchMoreItems}
            onLoadingChange={setIsLoading}
            isLoading={isLoading}
            locationQuery={parsedQuery}
            onQueryUpdate={onQueryUpdate}
            itemType={itemType}
          />
        )}
        {results && !isLoading && (
          <CreateNewItemWrapper p={0} direction={'ttb'} center alignItems={'center'}>
            {!isEmpty(flattenedResults) ? (
              <p>Didn't find what you're looking for?</p>
            ) : (
              <>
                <SadFaceIconWrapper />
                <p>No results</p>
              </>
            )}
            <CreateButton onClick={createNewItem}>Create New Item</CreateButton>
          </CreateNewItemWrapper>
        )}
      </Wrapper>
    </Layout>
  )
}

export default SearchPage
