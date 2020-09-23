// Handles determining what resources we can access
// Expects a list of processes and a list of user ACLs
// Returns a Boolean noting is a user is able to access a process
export class ACL {

  acl: object
  bots: object

  constructor(acl, bots) {
    this.acl = acl
    this.bots = bots
  }

  isAllowed(email: string) {
    // TODO: @mdp Implement this
    return true
  }

}