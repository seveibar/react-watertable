// @flow

export default (v: any) => {
  if (typeof v === "string") {
    return {
      type: v.trim().startsWith("#") ? "markdown" : "text"
    }
  } else if (typeof v === "number") {
    return { type: "numeric" }
  } else if (typeof v === "boolean") {
    return { type: "boolean" }
  } else if (
    Array.isArray(v) &&
    (typeof v[0] === "string" || typeof v[0] === "number")
  ) {
    return { type: "text", multiple: true }
  } else if (Array.isArray(v) && typeof v[0] === "object") {
    return { type: "json-array" }
  } else if (typeof v === "object") {
    return { type: "json" }
  }
}
