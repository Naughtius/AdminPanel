export function removeEmpty(obj) {
  return Object.entries(obj).reduce(
    (a, [k, v]) => (v ? ((a[k] = v), a) : a),
    {}
  )
}
