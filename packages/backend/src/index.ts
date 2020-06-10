import "@mowboard/shared";

import { NyawesomeServer } from "./NyawesomeServer";

const VERSION = "0.1.0";

console.log(`\nNyawesome API v${VERSION}`);
console.log("made with 💜 by skye\n");

const server = new NyawesomeServer();
server.start();
