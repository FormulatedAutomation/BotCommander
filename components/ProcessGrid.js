import Link from "next/link";
import classNames from 'classnames';

const ProcessGrid = ({processes}) => (
  <div>
    <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">Processes</h2>
    <ul className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {processes.map((process, i) => (<Link href={`/bots/${process.id}`}>
        <li className="cursor-pointer col-span-1 flex shadow-sm rounded-md">
        <div
          className={classNames({
            'flex-shrink-0 flex items-center justify-center w-16 bg-white text-white text-sm leading-5 font-medium rounded-l-md': true,
            'bot-uipath': process.type === 'uipath',
            'bot-robocloud': process.type === 'robocloud'
          })}>

        </div>
        <div
          className="flex-1 flex items-center justify-between border border-gray-200 bg-white  hover:bg-gray-50 truncate">
          <div className="flex-1 px-4 py-2 text-sm leading-5 truncate">
            <a href="#" className="text-gray-900 font-medium hover:text-gray-600 transition ease-in-out duration-150">
              {process.name}
            </a>
            <p className="text-gray-500">{process.description}</p>
          </div>
        </div>
      </li></Link>))}
    </ul>
  </div>
)

export default ProcessGrid;
