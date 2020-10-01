const AttachmentTable = ({artifacts, job, bot}) => (
  <div>
    <h3 class="text-xl font-bold mb-4 ">File Artifacts</h3>
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul>
        {artifacts.map((artifact, i) => (<li key={`file-${i}`}>
          <a target="_blank"
             href={`/api/botcommand/jobs/${bot.id}/${job.id}/artifacts/${artifact.id}/${artifact.fileName}`}
             className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out">
            <div className="flex items-center px-4 py-4 sm:px-6">
              <div className="min-w-0 flex-1 flex items-center">
                <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                  <div>
                    <div className="text-sm leading-5 font-medium text-indigo-600 truncate">{artifact.fileName}</div>
                    <div className="mt-2 flex items-center text-sm leading-5 text-gray-500">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                           xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                      </svg>
                      <span className="truncate">{artifact.id}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
              </div>
            </div>
          </a>
        </li>))}
      </ul>
    </div>
  </div>


)

export default AttachmentTable;
