const InputArgsFields = ({inputArgs}: {inputArgs: any[]}) => {
  return (
    <div>
      {Object.values(inputArgs).map(inputArg => (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <span className="block w-full rounded-md shadow-sm">
              <div key={inputArg.name}>
                <input ></input>
              </div>
            </span>
          </div>
        </div>
      ))}

    </div>
  )
}

export default InputArgsFields
