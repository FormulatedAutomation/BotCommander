![FA Github Header](https://user-images.githubusercontent.com/2868/98735818-fabe8a80-2371-11eb-884a-e555e31aa348.png)

# Bot Commander

[![FormulatedAutomation](https://circleci.com/gh/FormulatedAutomation/Profiler.svg?style=shield)](https://app.circleci.com/pipelines/github/FormulatedAutomation/Profiler)

![image](https://user-images.githubusercontent.com/2868/95122864-20c39000-071f-11eb-86c8-63820b013ae4.png)

### A human-friendly interface for running bots.

Bot Commander talks to vendor APIs directly to provide an environment for business-stakeholders to work with automations.  

Bot Commander is a [nextjs](https://nextjs.org/) web application that speaks directly to RPA vendor APIs for you.  It offers an extensible starting point if you need to trigger bots running and report on their status. 

 

![https://formulated.s3.us-east-2.amazonaws.com/processes-3.gif](https://formulated.s3.us-east-2.amazonaws.com/processes-3.gif)

Currently, UiPath and Robocorp bots are supported but more platforms can be implemented via a system of pluggable backends.  Contribution guidelines are forthcoming but pull requests are welcome.

This is experimental software and will be undergoing rapid change

# Get Started

Before getting started, you will need API Access to your bot provider.  This guide assumes that you have access to your vendor and have bots that you would like to run.  

### Download the Project

```bash
git clone git@github.com:FormulatedAutomation/BotCommander.git
npm install
```

## Configuration

### Connecting UiPath

To connect your UiPath bot, you need both the account API credentials as well as the bots basic information.

API credentials will be listed in under 'sources' in `config/api.js`, while the bot will be under `bots`

An example of a UiPath source config would be:

```jsx
{
   uipath: {
    platformHostname: 'platform.uipath.com',
    path: 'organization/myServiceInstanceLogicalName',
    refreshToken: process.env.UIPATH_REFRESH_TOKEN,
    serviceInstanceLogicalName: 'myServiceInstanceLogicalName',
    clientId: 'abc123456',
  },
```

Once you've defined a source, you can then define the bots which will use those source credentials to interact with the API.

The definiation of a UiPath bot looks like this:

```js
  {
    id: 'Turkish.Lira.to.USD',
    name: 'Turkish Lira Conversion Bot',
    description: 'Converts Turkish Lira to USD',
    source: 'uipath',
    type: 'uipath',
    acl: {
      groups: ['admins', 'users'],
    },
  },
```

For more details about where to find these keys, [click here](uipath_credentials_how_to.md).

### Connecting Robocloud

To connect your Robocloud bot, you need three pieces of information about your bot:

- Workspace ID
- Process ID
- Process Secret

This information can be found in the Robocloud 

- [Activate the Process API](https://robocorp.com/docs/product-manuals/robocorp-cloud/robocorp-cloud-process-api) in Robocloud
- Add your Process Secret and bot values to `config/api.js` within the `bots` list.

Here is an example entry:

```jsx
{
    id: 'Robocloud.Demo',
    name: 'My Robot',
    description: 'My Special Robot That Helps Me Out',
    secret: '****PROCESS-SECRET****',
    workspaceId: '****WORKSPACE-ID****',
    processId: '****PROCESS-ID****',
    type: 'robocloud',
    acl: {
      groups: ['admins', 'users'],
    },
  }
```

## Access Control List

TBD high-level explanation of how ACL works.

## Authorization

Bot Commander uses [next-auth](https://next-auth.js.org/) and have included an [Auth0](https://auth0.com/) provider.  An example of the auth config file found at `config/auth.js`

```jsx
// config/auth.js

export default [
  Providers.Auth0({
    domain: '****AUTH0-DOMAIN****',
    clientId: '****CLIENT-ID****',
    clientSecret: '****CLIENT-SECRET****',
  }),
  // ...add more providers here
]
```

## Environment Variables

Create a file named `.env` in the root directory of the project with environment variables you would like the application to use.  You should also be able to use actual environment variables as well.

TBD - Required Variables to Add

## Running

Since the app is a nextjs application you can find plentiful [resources](https://nextjs.org/docs) on how to get setup.  To test out your instance just run the following to launch the dev server.

```bash
# be sure to `npm install` before this 
npm run dev
```

## Docker Guide

Bot Commander works well with Docker as a self-contained nodejs application.


**Formulated Automation RPA Resources**


-   [/r/OpenSourceRPA](https://reddit.com/r/OpenSourceRPA)
-   [OpenSource RPA LinkedIn
    Group](https://www.linkedin.com/groups/12366622/)
-   [FormulatedAutomation's YouTube
    Screencasts](https://www.youtube.com/channel/UC_IMgIFlNBG94Vm8tNCNeUQ)
-   [Formulated Automation Podcast](https://www.formulatedautomation.com/category/podcast/)
