export function input({
  id,
  name,
  placeholder = "",
  type,
  required = false,
  value = false,
}) {
  return `
  <div class="input">
    <div class="input__container">
      <input
        type="${type ? type : "text"}"
        placeholder="${placeholder}"
        class="input__content"
        id="${id}"
        name="${name ? name : id}"
        ${value ? `value="${value}"` : ""}
        ${required ? "required" : ""}
      />
    </div>
  </div>
  `;
}

export function select(value = "") {
  return `
  <div class="custom-select">
  <select name="relation" required class="select-display">
  <option value="" ${
    value == "" ? "selected" : ""
  } disabled hidden>Relation</option>
  <option value="Family" ${value == "Family" ? "selected" : ""}>Family</option>
  <option value="Friends" ${
    value == "Friends" ? "selected" : ""
  }>Friends</option>
  <option value="Work" ${value == "Work" ? "selected" : ""}>Work</option>
  <option value="Acquaintance" ${
    value == "Acquaintance" ? "selected" : ""
  }>Acquaintance</option>
  </select>
  </div>
  `;
}
