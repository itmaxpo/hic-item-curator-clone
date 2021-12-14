import { useEffect, useRef } from 'react'

/**
 * useRefValue
 *
 * Keep track of the provided value in a ref and return 2 values, which are useful in different cases:
 *
 * latestRef:     (ref) Useful when you want to read the latest state from some asynchronous callback.
 *                Source: https://reactjs.org/docs/hooks-faq.html#why-am-i-seeing-stale-props-or-state-inside-my-function
 *                        Last part of https://overreacted.io/how-are-function-components-different-from-classes/
 *
 * previousValue: (value) Useful when you want to get the previous props or state.
 *                Source: https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
 */
export default function useRefValue(value: any) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  }, [value])
  return {
    latestRef: ref,
    previousValue: ref.current
  }
}
