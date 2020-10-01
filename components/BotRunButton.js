import classNames from 'classnames';

const BotRunButton = ({handlePress, loading = false}) => {
  const handleClick = () => {
    if (loading) {
      return;
    }
    handlePress()
  }
  const buttonClassName = classNames({
    'inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium': true,
    'rounded-md ': true,
    'focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150': true,
    'text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700': !loading,
    'text-white bg-gray-600 hover:bg-gray-500 focus:outline-none focus:border-gray-700': loading
  })
  return (
    <button type="button"
            onClick={handleClick}
            disabled={loading}
            className={buttonClassName}>
      {loading ? <span>Loading...</span> : <span>Run Bot</span>}
      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
           xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" stroke-linejoin="round"
              strokeWidth="2"
              d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    </button>
  );
}
export default BotRunButton;
