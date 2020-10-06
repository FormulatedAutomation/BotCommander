import React, { FunctionComponent } from 'react'
import PropTypes from 'prop-types'

interface InputArgs {
  [key: string]: any
}

interface OutputArgs {
  [key: string]: any
}

const TBody = ({ obj, keyPrefix }: {obj: object, keyPrefix: string}) => {
  return <tbody>
    {
      Object.keys(obj).map((key, idx) => {
        return (
          <tr key={`${keyPrefix}-${idx}`}>
            <td className="border px-4 py-2">{key}</td>
            <td className="border px-4 py-2">{obj[key]}</td>
          </tr>
        )
      })
    }

  </tbody>
}

const InputOutputArgs: FunctionComponent<{ inputArgs: InputArgs, outputArgs: OutputArgs }> = ({ inputArgs, outputArgs }) => {
  return <div className="pb-10">
    <table className="table-auto">
      <thead>
        <tr>
          <th className="px-4 py-2">InputName</th>
          <th className="px-4 py-2">Value</th>
        </tr>
      </thead>
      <TBody obj={inputArgs} keyPrefix="input"></TBody>
    </table>
    <table className="table-auto mt-5">
      <thead>
        <tr>
          <th className="px-4 py-2">Output Name</th>
          <th className="px-4 py-2">Value</th>
        </tr>
      </thead>
      <TBody obj={outputArgs} keyPrefix="output"></TBody>
    </table>
  </div>
}

InputOutputArgs.propTypes = {
  inputArgs: PropTypes.array,
  outputArgs: PropTypes.array,
}

export default InputOutputArgs
