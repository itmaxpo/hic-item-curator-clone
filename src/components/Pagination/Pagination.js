import React from 'react'
import Pagination from 'react-paginating'
import { PrevButton, NextButton, PaginationButton } from './styles'
import { ChevronLeftIcon, ChevronRightIcon } from 'components/Icon'
import { COLORS } from '@tourlane/tourlane-ui'

/**
 *  Pagination component
 *
 * @param {Number} total
 * @param {Number} limit
 * @param {Number} pageCount
 * @param {Number} currentPage
 */
const PaginationWrapper = ({ total, limit, pageCount, currentPage, onPageChange }) => {
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
        <div>
          {hasPreviousPage ? (
            <PrevButton
              {...getPageItemProps({
                pageValue: previousPage,
                onPageChange: onPageChange
              })}
            >
              <ChevronLeftIcon color={COLORS.INACTIVE_GRAY} />
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
            First
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
            Last
          </PaginationButton>

          {hasNextPage && (
            <NextButton
              {...getPageItemProps({
                pageValue: nextPage,
                onPageChange: onPageChange
              })}
            >
              <ChevronRightIcon />
            </NextButton>
          )}
        </div>
      )}
    </Pagination>
  )
}

export default PaginationWrapper
