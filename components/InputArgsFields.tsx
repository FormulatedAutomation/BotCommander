import { ClassAttributes, FunctionComponent, PropsWithChildren, useEffect, useReducer } from "react"

interface InputArgs {
  name: string
  type: string
  [key: string]: any
}

const InputArgsFields: FunctionComponent<{ inputArgs: InputArgs[], inputArgsChanges: (any) }> = ({inputArgs, inputArgsChanges}) => {
  const [inputValues, setInputValues] = useReducer((state, newState)=> ({...state, ...newState}), {})

  const handleChange = evt => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setInputValues({ [name]: newValue });
  }

  useEffect(() => {
    inputArgsChanges(inputValues)
  })

  return (
    <div>
      {Object.values(inputArgs).map(inputArg => (
        <div>
          <label htmlFor="{inputArg.name}" className="block text-sm font-medium leading-5 text-gray-700">{inputArg.name}</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input id="{inputArg.name}"
                   value={inputValues[inputArg.name]}
                   onChange={handleChange}
                   className="form-input block w-full sm:text-sm sm:leading-5" />
          </div>
        </div>
      ))}

    </div>
  )
}

export default InputArgsFields
