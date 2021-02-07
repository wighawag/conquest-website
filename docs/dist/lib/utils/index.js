export function wait(numSeconds, v) {
  return new Promise(function(resolve) {
    setTimeout(resolve.bind(null, v), numSeconds * 1e3);
  });
}
//# sourceMappingURL=index.js.map
