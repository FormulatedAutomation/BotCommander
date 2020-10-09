# How to find your API credentials in UiPath

This guide will walk you through the steps needed to find UiPath Credentials in Orchestrator

#### 1. Start on the main management page of Orchestrator and click Manage

![Home - UiPath Automation Cloud (1)](https://user-images.githubusercontent.com/2868/95628557-4963c680-0a4c-11eb-9606-630d756e7274.png)

#### 2. Click the dropdown button next to the "Tenant" name

![Tenants (1)](https://user-images.githubusercontent.com/2868/95628611-67312b80-0a4c-11eb-9c7b-1ec0b0b6104f.png)

#### 3. To the right of Orchestrator, click the 'more' icon

![Tenants (2)](https://user-images.githubusercontent.com/2868/95628706-95af0680-0a4c-11eb-84f9-e4f694edafe0.png)

#### 4. Finally Click "API Access"

![Tenants (3)](https://user-images.githubusercontent.com/2868/95628766-ae1f2100-0a4c-11eb-8a27-2e0b2aafa4e0.png)


At this point you should see your credentials, please take note, and copy them to the api.js file or where you store your credentials (Environment variable etc.)

![Tenants (4)](https://user-images.githubusercontent.com/2868/95628835-d0b13a00-0a4c-11eb-8c54-5947e23cda9a.png)


### Retrieving Bot Information

Bot information can be found in Orchstrator under the 'Automations' tab:

![Processes - UiPath Orchestrator](https://user-images.githubusercontent.com/2868/95628992-17069900-0a4d-11eb-85cf-4b2060580fc5.png)

The only piece on information you need here is the 'Name', this will be how we lookup and start your bot via the API.
