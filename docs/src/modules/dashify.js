export default function dashify(str) {
  return str
    .toLowerCase()
    // dashify
    .replace(/\W+/g, "-")
    // trim dash
    .replace(/^-+/, "")
    .replace(/-+$/, "")
}
