console.log('app.js is running');

const app = {
    title: 'Indecision App',
    subtitle: 'Put your life in  the hands of a computer',
    options: []
}

const onFormSubmit = (e) => {
    e.preventDefault(); // stop full page refresh and allow to run some code right here to handle the event

    const option = e.target.elements.option.value; //e.target going to point to the element that the event started on
    //element have name element => option and option point to input

    if(option) {
        app.options.push(option);
        e.target.elements.option.value = '';
        render();
    }
};

const onRemoveAll = () => {
    app.options = [];
    render();
}

const onMakeDecision = () => {
    const randomNum = Math.floor(Math.random() * app.options.length); //math.floor => rounding down
    const option = app.options[randomNum];
    alert(option);
}

const appRoot = document.getElementById('app');

const render = () => {
    const template = (
        <div>
            <h1>{app.title}</h1> 
            {app.subtitle && <p>{app.subtitle}</p>}
            <p>{app.options.length > 0 ? 'Here are your options' : 'No options'}</p>
            <p>{app.options.length}</p>
            <button disabled={app.options.length === 0} onClick={onMakeDecision}>What should i do?</button>
            <button onClick={onRemoveAll}>Remove All</button>
            <ol>
            {
                app.options.map((option) => <li key={option}>{option}</li>)
            }
            </ol>
            <form onSubmit={onFormSubmit}>
                <input type="text" name="option" />
                <button>Add Option</button>
            </form>
        </div>
        );

        ReactDOM.render(template, appRoot);
};
render();



// const user = {
//     name: 'Andrew', 
//     age: 26,
//     location: 'Philadelphia'
// }

// const userName = 'Mike'
// const userAge = 26;
// const userLocation = 'philadelphia'

// function getLocation(location) {
//     if(location) {
//         return <p>Location: {location}</p>;
//     }
// }

// const templateTwo = (
//     <div>
//         <h1>{user.name ? user.name : 'Anonymous'}</h1>
//         {/* <p>Age: {user.age}</p> */}
//         {/* if true && "age" => age or if false && "age" => false */}
//         {(user.age && user.age>=18) && <p>Age: {user.age}</p>}
//         {/* <p>Location: {getLocation(user.location)}</p> */}
//         {getLocation(user.location)}
//     </div>
// );
