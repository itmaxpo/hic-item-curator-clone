import React from 'react'
import { PaginationWrapper, PrevButton, NextButton, PaginationButton } from './styles'

/**
 *  Pagination component
 *
 * @param {Number} total
 * @param {Number} limit
 * @param {Number} pageCount
 * @param {Number} currentPage
 */
const Pagination = ({ total, limit, pageCount, currentPage, onPageChange }) => {
  return (
    <PaginationWrapper total={total} limit={limit} pageCount={pageCount} currentPage={currentPage}>
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
        <div>
          {hasPreviousPage ? (
            <PrevButton
              {...getPageItemProps({
                pageValue: previousPage,
                onPageChange: onPageChange
              })}
            >
              {'<'}
            </PrevButton>
          ) : (
            <PrevButton className={'empty'} width={'26px'}>
              {' '}
              &nbsp;{' '}
            </PrevButton>
          )}

          <PaginationButton
            {...getPageItemProps({
              pageValue: 1,
              onPageChange: onPageChange
            })}
          >
            first
          </PaginationButton>

          {pages.map(page => {
            return (
              <PaginationButton
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
            {...getPageItemProps({
              pageValue: totalPages,
              onPageChange: onPageChange
            })}
          >
            last
          </PaginationButton>

          {hasNextPage && (
            <NextButton
              {...getPageItemProps({
                pageValue: nextPage,
                onPageChange: onPageChange
              })}
            >
              {'>'}
            </NextButton>
          )}
        </div>
      )}
    </PaginationWrapper>
  )
}

export default Pagination
