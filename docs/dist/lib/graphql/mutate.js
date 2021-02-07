import client from "./client.js";
export function mutate(args) {
  return client.mutation(args.query, args.variables, args.context).toPromise();
}
//# sourceMappingURL=mutate.js.map
