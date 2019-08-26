import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react'
import { flatten, floor } from 'lodash'
import Layout from 'components/Layout'
import { Wrapper, CreateNewItemWrapper, CreateButton } from './styles'
import SearchBox from './SearchBox'
import SearchResultWrapper from './SearchResult'
import { parseSearchResponse, parseSuppliers, calculateOffsetAndIndex, insertPage } from './utils'
import { getAreasInCountry, getAccommodations, getSuppliers } from 'services/searchApi'
import { AREA_ITEM_TYPE, ACCOMMODATION_ITEM_TYPE } from 'pages/ItemPage/utils'

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
  const [results, setResults] = useState([])
  const [itemType, setItemType] = useState(undefined)
  const [suppliers, setSuppliers] = useState([])

  const onItemTypeChangeHandler = useCallback(type => {
    setItemType(type)
  }, [])

  const onSearchHandler = (searchResponse, totalResults) => {
    totalResultsCount.current = totalResults
    setResults(parseSearchResponse(searchResponse, totalResults, itemType))
  }

  const search = async payload => {
    prevPayload.current = payload
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
    let limit = 50

    // if on last page, set limit by the number of items that are left
    // and set index where to insert them
    // (can't insert on last page because potentially it would create more pages)
    const isLastPage = results.length - 1 === index
    let isLastPageIndexToInsert

    if (isLastPage) {
      limit = totalResultsCount.current % limit
      // 10 is the size of the pages of "results"
      isLastPageIndexToInsert = index - floor(limit / 10)
    }

    switch (itemType) {
      case AREA_ITEM_TYPE: {
        const { data } = await getAreasInCountry('', prevPayload.current, offset, limit)
        setResults(prevResults =>
          insertPage(
            prevResults,
            isLastPageIndexToInsert ? isLastPageIndexToInsert : index,
            data,
            itemType
          )
        )
        break
      }
      case ACCOMMODATION_ITEM_TYPE: {
        const { data } = await getAccommodations(prevPayload.current, offset, limit)
        setResults(prevResults =>
          insertPage(
            prevResults,
            isLastPageIndexToInsert ? isLastPageIndexToInsert : index,
            data,
            itemType
          )
        )
        break
      }
      default:
        return
    }

    return
  }

  const updateSelectedResults = itemsToUpdate => {
    // console.log(itemsToUpdate)
  }

  const createNewItem = () => {
    // Always should be on the top of the new page
    window.scrollTo(0, 0)
    history.push('/create')
  }

  const flattenedResults = useMemo(() => {
    return flatten(results)
  }, [results])

  // fetch suppliers on mount
  useEffect(() => {
    async function fetchSuppliers() {
      const { data } = await getSuppliers()
      setSuppliers(parseSuppliers(data))
    }

    fetchSuppliers()
  }, [])

  return (
    <Layout>
      <Wrapper>
        <SearchBox
          search={search}
          onItemTypeChange={onItemTypeChangeHandler}
          suppliers={suppliers}
        />
        <SearchResultWrapper
          results={flattenedResults}
          updateSelectedResults={updateSelectedResults}
          fetchMoreItems={fetchMoreItems}
        />
        <CreateNewItemWrapper p={0} direction={'ttb'} center alignItems={'center'}>
          <p>Didn't find what you're looking for?</p>
          <CreateButton onClick={createNewItem}>Create New Item</CreateButton>
        </CreateNewItemWrapper>
      </Wrapper>
    </Layout>
  )
}

export default SearchPage
