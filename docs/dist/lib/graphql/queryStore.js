import {writable} from "../../../_snowpack/pkg/svelte/store.js";
import {query} from "./query.js";
export function queryStore(queryString, options = {}) {
  let stopCurrentQuery;
  const $data = {
    state: "Idle",
    error: void 0,
    polling: false,
    stale: false
  };
  const {subscribe, set} = writable($data);
  function _set(data) {
    Object.assign($data, data);
    set($data);
  }
  function onResult(result) {
    if (result.fetching) {
      _set({state: "Fetching"});
    }
    _set({stale: result.stale});
    if (result.error) {
      _set({error: result.error});
    } else if (result.data) {
      let data = result.data;
      if (typeof options?.transform === "string") {
        if (data[options.transform]) {
          data = data[options.transform];
        } else {
          _set({
            error: {
              code: 11,
              message: `${options.transform} does not exist in result.data: ${data}`
            }
          });
        }
      } else if (options.transform) {
        data = options.transform(data);
      }
      _set({state: "Ready", polling: !options.once});
      _set({data});
    }
  }
  const store = {
    subscribe,
    fetch,
    cancel,
    acknowledgeError
  };
  function fetch() {
    if ($data.state !== "Idle") {
      return;
    }
    stopCurrentQuery = query({
      query: queryString,
      variables: options.variables,
      context: {
        pollInterval: options.once ? void 0 : 2e3,
        requestPolicy: "cache-and-network"
      }
    }).subscribe(onResult);
    return store;
  }
  function cancel(options2 = {}) {
    if (stopCurrentQuery) {
      stopCurrentQuery();
      _set({state: "Idle", polling: false, stale: false, error: void 0});
      if (options2.clear) {
        _set({data: void 0});
      }
    }
  }
  function acknowledgeError() {
    _set({error: void 0});
  }
  return store;
}
//# sourceMappingURL=queryStore.js.map
