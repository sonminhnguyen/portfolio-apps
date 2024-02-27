class VisibilityToggle extends React.Component {
  constructor(props) {
    super(props)
    this.handleToggleVisibility= this.handleToggleVisibility.bind(this);
    this.state = {
      Visibility: flase
    };
  }
  handleToggleVisibility() {
    this.setState((prevState) => {
      return {
        Visibility: !prevState.Visibility 
      };
    })
  }
  render() {
    return (
          <div>
            <h1>Visibility Toggle</h1>
            <button onClick={handleToggleVisibility}>
              {Visibility ? 'Hide details' : 'Show details'}
            </button>
            {Visibility && (
              <div>
                <p>Hey. These are some details you can now see!</p>
              </div>
            )} 
          </div>
        );
  }
} 

ReactDOM.render(<VisibilityToggle />, document.getElementById('app'));



// let Visibility = false;

// const ToggleVisibility = () => {
//   Visibility = !Visibility;
//   render();
// }
// const render = () => {
//   const jsx = (
//     <div>
//       <h1>Visibility Toggle</h1>
//       <button onClick={ToggleVisibility}>
//         {Visibility ? 'Hide details' : 'Show details'}
//       </button>
//       {Visibility && (
//         <div>
//           <p>Hey. These are some details you can now see!</p>
//         </div>
//       )} 
//     </div>
//   );

//   ReactDOM.render(jsx, document.getElementById('app'))
// }

// render();