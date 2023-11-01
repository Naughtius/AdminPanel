import { Select } from 'antd'
import is from '@sindresorhus/is'

/**
 * Трансформирует значение в React Key
 *
 * @param value - любое значение
 *
 * @example
 * toReactKey(Symbol('value'));
 * // => 'Symbol(value)'
 *
 * @example
 * toReactKey([1, 2, 3]);
 * // => '1,2,3'
 *
 * @example
 * toReactKey({ some: 'object' });
 * // => '[object Object]'
 */
export const toReactKey = (value) =>
  is.string(value) || is.number(value) ? value : String(value)

/**
 * Трансформирует `[key, value]`
 * в `<Select.Option />` элемент с заданными опциями
 */
export const fromEntriesToSelectOption =
  (options = {}) =>
  ([key, value]) => {
    const { setOptionValueAsValue, setProps } = {
      setOptionValueAsValue: false,
      ...options,
    }
    const processedKey = toReactKey(key)
    const processedValue = toReactKey(value)

    return (
      <Select.Option
        key={processedKey}
        {...setProps?.([key, value])}
        value={setOptionValueAsValue ? processedValue : processedKey}
      >
        {processedValue}
      </Select.Option>
    )
  }

export const fromEnumToSelectOptions = (object, options) =>
  Object.entries(object).map(fromEntriesToSelectOption(options))
