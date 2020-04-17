import * as React from "react";
import { render } from "react-dom";

import "./theme/index.less";
import "antd/dist/antd.less";

import { AppHMR } from "./App";

render(<AppHMR />, document.querySelector("#app-mount"));
