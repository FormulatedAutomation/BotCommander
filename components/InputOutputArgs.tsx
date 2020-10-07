import React, { FunctionComponent } from 'react'
import PropTypes from 'prop-types'

interface InputArgs {
  [key: string]: any
}

interface OutputArgs {
  [key: string]: any
}

const KeyList = ({ obj, keyPrefix }: { obj: object, keyPrefix: string }) => {
  return <div>
    {
      Object.keys(obj).map((key, idx) => {
        return (
          <div className="sm:col-span-1" key={`${keyPrefix}-${idx}`}>
            <dt className="text-sm leading-5 font-medium text-gray-500">
              {key}
            </dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900">
              {obj[key]}
            </dd>
          </div>
        )
      })
    }

  </div>
}

const InputOutputArgs: FunctionComponent<{ inputArgs: InputArgs, outputArgs: OutputArgs }> = ({ inputArgs, outputArgs }) => {
  return (
    <div>
      <div className="border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-3">
          Run Results
        </h3>
      </div>
      <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 mt-3">
        <KeyList obj={inputArgs}  keyPrefix="input" />
        <KeyList obj={outputArgs} keyPrefix="output" />
      </dl>
    </div>)
}

InputOutputArgs.propTypes = {
  inputArgs: PropTypes.array,
  outputArgs: PropTypes.array,
}

export default InputOutputArgs
