import typeColors from "./typeColors";

function renderTypes(types) {
  return types
    .map((t) => {
      const typeName = t.type.name;
      const color = typeColors[typeName] || "bg-gray-400";

      return `<span class="rounded-3xl py-1 px-3 text-xs text-white uppercase ${color}">${typeName}</span>`;
    })
    .join(" ");
}

export default renderTypes;
