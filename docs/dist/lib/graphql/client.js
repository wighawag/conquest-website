import * as __SNOWPACK_ENV__ from '../../../_snowpack/env.js';

import {Client, defaultExchanges} from "../../../_snowpack/pkg/@urql/core.js";
import {devtoolsExchange} from "../../../_snowpack/pkg/@urql/devtools.js";
const exchanges = defaultExchanges.concat();
if (__SNOWPACK_ENV__.MODE === "development") {
  exchanges.unshift(devtoolsExchange);
}
let url = __SNOWPACK_ENV__.SNOWPACK_PUBLIC_THE_GRAPH_HTTP;
try {
  const queryParams = new URLSearchParams(location.search);
  if (queryParams.has("subgraph")) {
    url = queryParams.get("subgraph");
  }
} catch (e) {
}
if (!url) {
  console.error(`no url specific either at build time or runtim (through query params) for subgraph`);
}
const client = new Client({
  url,
  exchanges
});
export default client;
//# sourceMappingURL=client.js.map
