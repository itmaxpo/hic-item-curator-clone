import React from 'react'
import Pagination from 'react-paginating'
import { Wrapper, StyledCircleIconButton, PaginationButton } from './styles'

/**
 *  Pagination component
 *
 * @param {Number} total
 * @param {Number} limit
 * @param {Number} pageCount
 * @param {Number} currentPage
 */
const PaginationWrapper = ({ total, limit, pageCount = 8, currentPage, onPageChange }) => {
  return (
    <Pagination total={total} limit={limit} pageCount={pageCount} currentPage={currentPage}>
      {({
        pages,
        currentPage,
        hasNextPage,
        hasPreviousPage,
        previousPage,
        nextPage,
        totalPages,
        getPageItemProps
      }) => (
        <Wrapper justify="center">
          {hasPreviousPage ? (
            <StyledCircleIconButton
              data-test="previous-page"
              hasArrow
              arrow="left"
              {...getPageItemProps({
                pageValue: previousPage,
                onPageChange: onPageChange
              })}
            />
          ) : null}

          <PaginationButton
            data-test="first-page"
            {...getPageItemProps({
              pageValue: 1,
              onPageChange: onPageChange
            })}
          >
            First
          </PaginationButton>

          {pages.map((page, index) => {
            return (
              <PaginationButton
                data-test={`page-${index + 1}`}
                className={`${currentPage === page ? 'active' : ''}`}
                {...getPageItemProps({
                  pageValue: page,
                  key: page,
                  onPageChange: onPageChange
                })}
              >
                {page}
              </PaginationButton>
            )
          })}

          <PaginationButton
            data-test="last-page"
            {...getPageItemProps({
              pageValue: totalPages,
              onPageChange: onPageChange
            })}
          >
            Last
          </PaginationButton>

          {hasNextPage && (
            <StyledCircleIconButton
              data-test="next-page"
              hasArrow
              arrow="right"
              {...getPageItemProps({
                pageValue: nextPage,
                onPageChange: onPageChange
              })}
            />
          )}
        </Wrapper>
      )}
    </Pagination>
  )
}

export default PaginationWrapper
