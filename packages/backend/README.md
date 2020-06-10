<div align="center">
    <br />
    <p>
        <img src="https://i.imgur.com/ycGfMVr.png" width="500" alt="nyawesome" />
    </p>
    <p>
        <a href="https://github.com/catofpoptarts/metakitty">metakitty</a> &middot;
        <a href="https://github.com/catofpoptarts/nyawesome">nyawesome</a> &middot;
        nyapi &middot;
        <a href="https://github.com/catofpoptarts/fluffrontend">fluffrontend</a>
    </p>
    <br />
    
</div>

# nyapi

API for [nyawesome](https://github.com/catofpoptarts/nyawesome).

## Docker Build

The API can be run using Docker by building the image using the `Dockerfile` in the project root. The [meta repository](https://github.com/catofpoptarts/metakitty) contains an example of a `docker-compose.yml` build file.

## Installation & development

To run the API on your host machine, you need [yarn](https://yarnpkg.org). Run the following command to install dependancies:

```sh
$ yarn
```

The source code needs to be pre-compiled from TypeScript to regular JS before it can be run:

```sh
$ yarn build
// ...
$ yarn start
```

### Developing

The `build:dev` script starts the TS compiler in watch mode, and the `dev` script runs [nodemon](https://nodemon.io/) on the `dist` folder. The API will restart when changes are made to the source.

**Note:** These commands need to be run in separate terminals.

```sh
$ yarn build:dev
```

```sh
$ yarn dev
```

## SnepServer

The API has a gateway server for performing live updates on the frontend and refreshing the bot's cache - information on it can be found [here](https://github.com/catofpoptarts/nyapi/tree/master/src/SnepServer).

## KeppCon

The API also has a wrapper around MongoDB with a whole bunch of utility methods for creating accounts and doing OAuth2 authentication.

## Environment Configuration

The server will read from environment variables for its configuration values. It will fall back to generic defaults if these aren't specified, **but there's no guarantee that these will work.**

### Database Variables

-   `MONGO_URI` - URI to use for connecting to MongoDB.
-   `DB_USER` - User to use for authentication.
-   `DB_PASS` - Password to use for authentication.
-   `ENABLE_SRV` - Whether the server should connect using replica-set enabled protocol.

### API Variables

-   `BACKEND_PORT` - Defines the port on which the backend will listen. This should be the same as defined in the Dockerfile in order for the API to be accessible from outside the container.
-   `LOG_LEVEL` - The level of logging to perform.

### OAuth2 Configuration

These variables are required in order for OAuth2 to work. The backend will start without them, but will return `Error 500` responses to all OAuth-related routes.

-   `CLIENT_ID` - Application ID
-   `CLIENT_SECRET` - Secret used to sign OAuth2 requests made to the Discord API
-   `REDIRECT_URI` - The redirect URI the API should send to Discord.
-   `SCOPE` - Scopes to use when authenticating

<br/>

made with 💜 by [kipp](https://twitter.com/orifoxx) &copy; 2020
