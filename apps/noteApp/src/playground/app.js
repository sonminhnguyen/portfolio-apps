    // upper case is required "Header" if not react treat it like string not a component

    // const obj = {
    //     name: 'Vikram',
    //     getName() {
    //         return this.name;
    //     }
    // }

    // // const getName = obj.getName.bind(obj);
    // const getName = obj.getName.bind({ name: 'Andrew' });
    // console.log(getName());


     
//stateless functional component

class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.state= {
            options: props.options
        }
    }
    // mount a single instance of indecision app
    componentDidMount() {
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
    // going to fire after state or props update
    componentDidUpdate(prevProps, prevState) {
        if(prevState.options.length !== this.state.options.length) {
            const json = JSOn.stringify(this.state.options);
            localStorage.setItem('options', json);
            // console.log('saving data');
        }
    }
    // going to fire just before component goes away
    componentWillUnmount() {
        console.log()
    }
    handleDeleteOptions() {
        this.setState(() => ({ options: [] }));
    }
    handleDeleteOption(optionToRemove) {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => {
                return optionToRemove !== option;
            })
        }));
    }
    handlePick() {
        const randomNum = Math.floor(Math.random() * this.state.options.length); //math.floor => rounding down
        const option = this.state.options[randomNum];
        alert(option);
    }
    handleAddOption(option) {
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
                <Action 
                    hasOptions={this.state.options.length > 0}
                    handlePick={this.handlePick}
                />
                <Options 
                    options={this.state.options} 
                    handleDeleteOptions={this.handleDeleteOptions}
                    handleDeleteOption={this.handleDeleteOption}
                />
                <AddOption 
                    handleAddOption={this.handleAddOption}
                />
            </div>
        );
    }
}

IndecisionApp.defaultProps = {
    options: []
}

const Header = (props) => {
    return (
    <div>
        <h1>{props.title}</h1>
        {props.subtitle && <h2>{props.subtitle}</h2>}
    </div>
    );
};

Header.defaultProps = {
    title: 'some default'
}

const Action = (props) => {
    return (
        <div>
            <button 
            onClick={props.handlePick}
            disabled= {!props.hasOptions}
            >
                What should i do?
            </button>
        </div>
    );
};

const Options = (props) => {
    return (
        <div>
            <button onClick={props.handleDeleteOption}>Remove All</button>
            {props.options.length === 0 && <p>Please add an option to ge started!</p>}
            {
                props.options.map((option) => (
                    <Option 
                        key={option} 
                        optionText={option} 
                        handleDeleteOption={props.handleDeleteOption}
                    />
                ))
            }
        </div>
    );
};

const Option = (props) => {
    
    return (
        <div>
            {props.optionText}
            <button 
                onClick={(e) => {
                    props.handleDeleteOption(props.optionText);
                }}
            >
                remove
            </button>
        </div>
    );
};

class AddOption extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            error: undefined
        };
    }
    handleAddOption(e) {
        e.preventDefault();

        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);

        this.setState(() => ({ error }));

        if(!error) {
            e.target.elements.option.value = '';
        }
    }
    render() {
        return ( 
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option" />
                    <button>Add Option</button>
                </form>
            </div>
        );
    }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
// ReactDOM.render(<IndecisionApp options={['devils den', 'second district']} />, document.getElementById('app'));


// class Header extends React.Component  { 
//     render() {
//         return (
//         <div>
//             <h1>{this.props.title}</h1>
//             <h2>{this.props.subtitle}</h2>
//         </div>
//         );
//     }
// }

// class Action extends React.Component {
//     // handlePick() {
//     //     alert('handlePick');
//     // }
//     render() {
//         return (
//             <div>
//                 {/* we dont wanna call it but reference it so dont have parentheses afterwards */}
//                 <button 
//                 onClick={this.props.handlePick}
//                 disabled= {!this.props.hasOptions}
//                 >
//                     What should i do?
//                 </button>
//             </div>
//         );
//     }
// }

// class Options extends React.Component {
//     // constructor(props) {
//     //     super(props);
//     //     this.handeRemoveAll = this.handeRemoveAll.bind(this);
//     // }
//     // handeRemoveAll() {
//     //     alert('')
//     // }

//     render() {
//         return (
//             <div>
//                 {/* <button onClick={this.handeRemoveAll.bind(this)}>Remove All</button> */}
//                 <button onClick={this.props.handleDeleteOptions}>Remove All</button>
//                 {/* {this.props.options.length} */}
//                 {
//                     // this.props.options.map((option) => <p key={option}>{option}</p>)
//                     this.props.options.map((option) => <Option key={option} optionText={option} />)
//                 }
//             </div>
//         );
//     }
// }

// class Option extends React.Component {
//     render() {
//         return (
//             <div>
//                 {this.props.optionText}
//             </div>
//         );
//     }
// }
// ReactDOM.render(<IndecisionApp />, document.getElementById('app'));


// const jsx = (
//     <div>
//         <h1>Title</h1>
//         <Header />
//         <Action />
//         <Options />
//         <AddOption />
//     </div>
// )

// const User = (props) => {
//     return (
//         <div>
//             <p>Name: {props.name}</p>
//             <p>Age: {props.age}</p>
//         </div>
//     );
// }

// ReactDOM.render(<User name="andrew" age={26} />, document.getElementById('app'));