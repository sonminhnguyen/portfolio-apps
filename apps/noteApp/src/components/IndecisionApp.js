import React from 'react';
import AddOption from './AddOption';
import Options from './Options';
import Action from './Action';
import Header from './Header';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {
  state = {
      options: [],
      selectedOption: undefined
  }

  componentDidMount = () => {
    try {
        // console.log('fetching data');
        const json = localStorage.getItem('options');
        const options = JSON.parse(json);
        
        if(options) {
            this.setState(() => ({ options }))
        }
    } catch (e) {
        //Do nothing
    }
  }
  componentDidUpdate = (prevProps, prevState) => {
      if(prevState.options.length !== this.state.options.length) {
          const json = JSON.stringify(this.state.options);
          localStorage.setItem('options', json);
          // console.log('saving data');
      }
  }
  
  componentWillUnmount = () => {
      console.log()
  }

  handleDeleteOptions = () => {
      this.setState(() => ({ options: [] }));
  }

  handleDeleteOption = (optionToRemove) => {
      this.setState((prevState) => ({
          options: prevState.options.filter((option) => {
              return optionToRemove !== option;
          })
      }));
  }
  handleClearSelectedOption = () => {
      this.setState(() => ({
          selectedOption: undefined
      }));
  }
  handlePick = () => {
      const randomNum = Math.floor(Math.random() * this.state.options.length); //math.floor => rounding down
      const option = this.state.options[randomNum];
    //   alert(option);
      this.setState(() => ({
          selectedOption: option
      }))
  }

  handleAddOption = (option) => {
      if(!option) {
          return 'Enter valid valie to add item';
      } else if(this.state.options.indexOf(option) > -1) {
          return 'This option already exists';
      }
      
      this.setState((prevState) => {
          // prevState.options.push(option);
          return {
              options: prevState.options.concat(option)
          };
      });
  }
  render() {
      // const title = 'Indecision';
      const subtitle = 'Put your life in the hands of a computer'
      // const options = []

      return (
          <div>
              {/* <Header title={title} subtitle={subtitle} />  */}
              <Header subtitle={subtitle} /> 
              <div className="container">
                <Action 
                    hasOptions={this.state.options.length > 0}
                    handlePick={this.handlePick}
                />
                <div className="widget">
                    <Options 
                        options={this.state.options} 
                        handleDeleteOptions={this.handleDeleteOptions}
                        handleDeleteOption={this.handleDeleteOption}
                    />
                    <AddOption 
                        handleAddOption={this.handleAddOption}
                    />
                </div>
              </div>
              
              <OptionModal 
                selectedOption={this.state.selectedOption}
                handleClearSelectedOption={this.handleClearSelectedOption}
              />
          </div>
      );
  }
}

IndecisionApp.defaultProps = {
  options: []
}

//   constructor(props) {
//       super(props);
//       this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
//       this.handlePick = this.handlePick.bind(this);
//       this.handleAddOption = this.handleAddOption.bind(this);
//       this.handleDeleteOption = this.handleDeleteOption.bind(this);
//       this.state= {
//           options: props.options
//       }
//   }
    
//   // mount a single instance of indecision app
//   componentDidMount() {
//       try {
//           // console.log('fetching data');
//           const json = localStorage.getItem('options');
//           const options = JSON.parse(json);
          
//           if(options) {
//               this.setState(() => ({ options }))
//             }
//         } catch (e) {
//             //Do nothing
//         }
//     }
//   // going to fire after state or props update
//   componentDidUpdate(prevProps, prevState) {
//     if(prevState.options.length !== this.state.options.length) {
//         const json = JSON.stringify(this.state.options);
//         localStorage.setItem('options', json);
//         // console.log('saving data');
//     }
//   }
//   // going to fire just before component goes away
//   componentWillUnmount() {
//     console.log()
//   }
//   handleDeleteOptions() {
//     this.setState(() => ({ options: [] }));
//   }
//   handleDeleteOption(optionToRemove) {
//     this.setState((prevState) => ({
//         options: prevState.options.filter((option) => {
//             return optionToRemove !== option;
//         })
//     }));
//   }
//   handlePick() {
//     const randomNum = Math.floor(Math.random() * this.state.options.length); //math.floor => rounding down
//     const option = this.state.options[randomNum];
//     alert(option);
//   }
//   handleAddOption(option) {
//     if(!option) {
//         return 'Enter valid valie to add item';
//     } else if(this.state.options.indexOf(option) > -1) {
//         return 'This option already exists';
//     }
    
//     this.setState((prevState) => {
//         // prevState.options.push(option);
//         return {
//             options: prevState.options.concat(option)
//         };
//     });
//   }