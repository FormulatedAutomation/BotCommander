import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import classNames from 'classnames'

const ProcessGrid = ({ processes }) => (
  <div>
    <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">Processes</h2>
    <ul className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {processes.map((process, i) => (<Link key={`processLink-${i}`} href={`/bot/${process.id}`}>
        <a>
          <li className="cursor-pointer col-span-1 flex shadow-sm rounded-md">
            <div
              className={classNames({
                'flex-shrink-0 flex items-center justify-center w-16 bg-white text-white text-sm leading-5 font-medium rounded-l-md': true,
                'bot-uipath': process.type === 'uipath',
                'bot-robocloud': process.type === 'robocloud',
              })}>

            </div>
            <div
              className="flex-1 flex items-center justify-between border border-gray-200 bg-white  hover:bg-gray-50 truncate">
              <div className="flex-1 px-4 py-2 text-sm leading-5 truncate">
                {process.name}
                <p className="text-gray-500">{process.description}</p>
              </div>
            </div>
          </li>
        </a>
      </Link>))}
    </ul>
  </div>
)

ProcessGrid.propTypes = {
  processes: PropTypes.array,
}

export default ProcessGrid
