// exports - default export && named exports
console.log('app.js is running');

const square = (x) => x*x;

export const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

export default subtract;

// export {
//    square,
//   subtract as default
// };