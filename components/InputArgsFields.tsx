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
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <span className="block w-full rounded-md shadow-sm">
              <div key={inputArg.name}>
                <label>{inputArg.name}</label>
                <input type="text" name={inputArg.name} value={inputValues[inputArg.name]} onChange={handleChange}/>
              </div>
            </span>
          </div>
        </div>
      ))}

    </div>
  )
}

export default InputArgsFields
