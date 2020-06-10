<div align="center">
    <br />
    <p>
        <img src="https://i.imgur.com/ycGfMVr.png" width="500" alt="nyawesome" />
    </p>
    <br />
</div>

# mowboard

Mono-repository for [Nyawesome](https://github.com/PiTheSnep/nyawesome)'s web dashboard.

## Packages

-   **frontend** - React web panel & dashboard for interactively configuring the bot.
-   **backend** - API backend allowing integration between the bot, MongoDB, and the frontend.
-   **shared** - Shared constructs & type definitions used throughout the project.

## Environment Configuration

The environment for this project is configured using the `.env` file. This is a key-value map of variables, an example of which is given below.

```dotenv
TOKEN=""

DB_URI=""
READ_PERMISSION_LEVEL=2
WRITE_PERMISSION_LEVEL=1

BACKEND_PORT=8080
CLIENT_ID=""
CLIENT_SECRET=""
WS_PORT=6342
REDIRECT_URI=""
SCOPE=""
```

made with 💜 by [skye](https://twitter.com/skyefoxie) &copy; 2020
