import {pipe, fromValue, concat, scan, map, subscribe} from "../../../_snowpack/pkg/wonka.js";
import client from "./client.js";
import {initialState} from "./constants.js";
export function query(args) {
  const queryResult$ = pipe(concat([
    fromValue({fetching: true, stale: false}),
    pipe(client.query(args.query, args.variables, args.context), map(({stale, data, error, extensions}) => ({
      fetching: false,
      stale: !!stale,
      data,
      error,
      extensions
    }))),
    fromValue({fetching: false, stale: false})
  ]), scan((result, partial) => ({
    ...result,
    ...partial
  }), initialState));
  return {
    subscribe(onValue) {
      return pipe(queryResult$, subscribe(onValue)).unsubscribe;
    }
  };
}
//# sourceMappingURL=query.js.map
