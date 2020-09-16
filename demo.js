const config = require('./config/sources')['uipath']
const { OrchestratorApi } = require('uipath-orchestrator-api-node')

const oc = new OrchestratorApi ( config )    
 
const main = async () => {
  const token = await oc.authenticate()
  const releases = await oc.release.findAll()
  console.log(releases)
  const release = releases.find((r) => r.ProcessKey === 'Turkish.Lira.to.USD')
  console.log("Starting Process", release.ProcessKey)

  const inputArgs = {
    inputLira: 3500,
  }

  const result = await oc.job._startJobs({
        startInfo: {
          ReleaseKey: release.Key,
          RobotIds: [],
          JobsCount: 1,
          Strategy: 'JobsCount',
          InputArguments: JSON.stringify(inputArgs),
        }
      })
  console.log(result.value)
}
 
if (!module.parent) {
  main()
}