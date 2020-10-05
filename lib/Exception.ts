export class Exception extends Error {
  debugData: object
  constructor (msg: string, debugData: object) {
    super(msg)
    this.debugData = debugData
  }
}
