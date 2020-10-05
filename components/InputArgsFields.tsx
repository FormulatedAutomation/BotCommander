import React, { FunctionComponent, useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'

interface InputArgs {
  name: string
  type: string
  [key: string]: any
}

const InputArgsFields: FunctionComponent<{ inputArgs: InputArgs[], inputArgsChanges: (any) }> = ({ inputArgs, inputArgsChanges }) => {
  const [inputValues, setInputValues] = useReducer((state, newState) => ({ ...state, ...newState }), {})

  const handleChange = evt => {
    const name = evt.target.name
    const newValue = evt.target.value
    setInputValues({ [name]: newValue })
  }

  useEffect(() => {
    inputArgsChanges(inputValues)
  })

  return (
    <div>
      {Object.values(inputArgs).map(inputArg => (
        <div key={`input-${inputArg.name}`}>
          <label htmlFor={inputArg.name} className="block text-sm font-medium leading-5 text-gray-700">{inputArg.name}</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input id={inputArg.name}
              value={inputValues[inputArg.name] || ''}
              onChange={handleChange}
              name={inputArg.name}
              type="text"
              className="form-input block w-full sm:text-sm sm:leading-5" />
          </div>
        </div>
      ))}

    </div>
  )
}

InputArgsFields.propTypes = {
  inputArgs: PropTypes.array,
  inputArgsChanges: PropTypes.func,
}

export default InputArgsFields
