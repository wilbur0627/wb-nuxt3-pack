let a = ["123", "456", "789", "5dwa6", ['123', { qqder: 'qqder' }]];
// let a = 'nuxt/pinia'
let b = 'modules: ["qqder"]';
if (typeof a === "string") {
  b = `modules: ['${a}']`;
} else {
  b = `modules: ['${a.join("', '")}']`;
}
console.log(b);
