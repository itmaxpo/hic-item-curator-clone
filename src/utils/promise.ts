import partition from 'lodash/partition'

export let isFulfilled = <T>(p: PromiseSettledResult<T>): p is PromiseFulfilledResult<T> =>
  p.status === 'fulfilled'

export let allSettled = async <T>(promises: Promise<T>[]) => {
  let results = await Promise.allSettled(promises)
  let [resolved, rejected] = partition(results, isFulfilled)

  return [resolved.map((r) => r.value), rejected.map((r) => r.reason)] as const
}
