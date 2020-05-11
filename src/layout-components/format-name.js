export function formatName(input) {
  let name = input.toLowerCase();

  name = name.replace(/^\s+/g, "");
  name = name.replace(/\s+$/g, "");
  name = name.replace(/\s+/g, "-");
  name = name.replace(/[^a-z0-9@_-]+/g, "");

  return name;
}
