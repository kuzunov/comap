# CoMAP

CoMAP (Community organization, management and planning) is a final course project for the 2022 React Fullstack Academy, organized by [*AKKODIS* ](https://www.akkodis.com/) (formerly [MODIS](https://www.modis.com/en-bg/)).

###### [You can also check out the backend part of the project here!](https://github.com/kuzunov/comap-server)

## Idea

The project got its start from my own desire to have a robust and mutable social network, that helps people organize direct action activities. Initial versions will be centralized, and will gradually transition to a more decentralized network. 

## Features

#### Locations
One of the more important parts of direct action is location. Communities need to be in close proximity to interact and take part in direct action. This will only be an initial feature until communities are organized.
#### Handling event organization
Events will be organized according to need. Organizations can add events and manage them.
#### Social networks
The main focus is easier community organization and local, robust, active network forming. CoMAP will be used to coordinate members and users and notify them of events, that may be of interest to them. 
#### Time banks
Time banks are not yet available, but will be the second major feature of CoMAP. The app will help users and organizations handle labour-time and time-based volunteering. Users will have skills and expertise they are willing to share with others in exchange for time-vouchers that could be used in the app. 

Users will be able to search for users by their skills, organizations will be able to broadcast their need for specific skills in regard to events and more.


## Installation

### Starting the main app
Clone the [CoMAP repository](https://github.com/kuzunov/comap). 

The app requires a Google API key, with the following APIs activated: 

```
Maps JavaScript API

~~Geocoding API~~

~~Geolocation API~~

Places API
```

You have to put your API key in a `.env` file in the root directory of the project. The name of the variable is
```
REACT_APP_GOOGLE_API_KEY = YOUR_API_KEY
```
There are some other variables you have to set before you can run the app:

In the env.var.config.ts file in the src directory of the project

```
const AVATAR_FOLDER = '/avatar_folder/' - folder for default avatars
const DEFAULT_AVATAR = 'default_avatar_' - default avatar prefix
const APP_URL = 'http://localhost:3000' - main app url
const API_BASE_URL = 'http://localhost:64000' - backend url endpoin
```

After the initial configuration, run yarn or npm to download dependencies. You can check the `package.json` file for more information on the dependencies.

The `start` script runs the app;

Don't forget to run the backend part of the app first! [CoMAP server](https://github.com/kuzunov/comap-server)

## Main technologies

#### [React](https://reactjs.org/)
#### [MUI](https://mui.com/)
#### [Google APIs](https://developers.google.com/apis-explorer)