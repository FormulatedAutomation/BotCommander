import React from 'react'
import PropTypes from 'prop-types'

import InputArgsFields from './InputArgsFields'
import BotRunButton from './BotRunButton'

const BotRunForm = ({ botInfo, setInputArgs, handleSubmit, loading }) => {
  return (
    <div className="px-4 py-4">

      <h2>Input Arguments</h2>

      <div className="py-3">

        <InputArgsFields inputArgs={botInfo.arguments.input}
          inputArgsChanges={setInputArgs}/>

        <span className="inline-flex rounded-md shadow-sm mt-3 mb-3">
          <BotRunButton handlePress={handleSubmit} loading={loading}/>
        </span>
      </div>
    </div>
  )
}

BotRunForm.defaultProps = {
  loading: false,
}

BotRunForm.propTypes = {
  botInfo: PropTypes.any,
  setInputArgs: PropTypes.func,
  handleSubmit: PropTypes.func,
  loading: PropTypes.bool,
}

export default BotRunForm
