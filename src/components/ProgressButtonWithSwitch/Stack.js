import { last } from 'lodash'

class Stack {
  _stack = []
  _index = 0
  _aborted = false

  do = (fn = () => undefined) => {
    if (this._stack.length && !last(this._stack).fn) {
      last(this._stack).fn = fn
    } else {
      this._stack.push({ fn, delay: 0 })
    }
    return {
      do: this.do,
      run: this.run,
      wait: this.wait
    }
  }

  wait = (delay = 0) => {
    this._stack.push({ delay })

    return {
      do: this.do
    }
  }

  run = () => {
    this._callStackItem()
  }

  abort = () => {
    this._aborted = true
  }

  _callStackItem = () => {
    const stackItem = this._stack[this._index]
    if (stackItem) {
      setTimeout(() => {
        if (this._aborted) {
          return
        }

        stackItem.fn()
        this._index++
        this._callStackItem()
      }, stackItem.delay)
    }
  }
}

export default Stack
