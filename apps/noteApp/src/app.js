// import validator from 'validator'
import React from 'react';
import ReactDOM from 'react-dom';
import IndecisionApp from './components/IndecisionApp';
import 'normalize.css/normalize.css';
import './styles/styles.scss';


ReactDOM.render(<IndecisionApp />, document.getElementById('app'));


//React-modal
// const Layout = (props) => {
//   return ( 
//     <div>
//       <p>header</p>
//       {/* {props.content} */}
//       {props.children}
//       <p>footer</p>
//     </div>
//   )
// }

// const template = (
//   <div>
//     <h1>Page Title</h1>
//     <p>This is my page</p>
//   </div>
// )

// // ReactDOM.render(<Layout content={template} />, document.getElementById('app'));
// ReactDOM.render((
//   <Layout>
//     <p>This is my page</p>
//   </Layout>
//   ), document.getElementById('app'));

// class OldSyntax {
//   constructor() {
//     this.name = 'Mike';
//     this.getGreeting = this.getGreeting.bind(this);
//   }
//   getGreeting() {
//     return `Hi. My name is ${this.name}.`;
//   }
// }

// const OldSyntax = new OldSyntax();
// const getGreeting = OldSyntax.getGreeting();
// console.log(OldSyntax);

// // ------ 
// class NewSyntax {
//   name = 'Jen';
//   getGreeting = () => {
//     return `Hi. My name is ${this.name}.`;
//   }
// }

// const newSyntax = newSyntax();
// const newgetGreeting = newSyntax.getGreeting();
// console.log(newSyntax);


// // import './utils.js';
// // import subtract from './utils.js';
// // import anythingIWantasSubtract, { square, add } from './utils.js';

// // console.log('app.js is running');
// // console.log(square(4));
// // console.log(add(100, 23));
// // console.log(anythingIWantasSubtract(100, 81));

// import isSenior from './person.js'
// import { isAdult, canDrink } from './person.js';
// console.log(isAdult(18));
// console.log(canDrink(20));
// console.log(isSenior(64));