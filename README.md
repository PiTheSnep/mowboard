# mowboard

Frontend for Nyawesome VC bot.

## Packages

-   **frontend** - React web panel & dashboard for interactively configuring the bot.
-   **backend** - API backend allowing integration between the bot, MongoDB, and the frontend.
-   **shared** - Shared constructs & type definitions used throughout the project.

## Environment Configuration

The environment for this project is configured using the `.env`file. This is a key-value map of variables, an example of which is given below.

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
