const add = function (a, b) {
    console.log(arguments);  // arguments return all the argument pass into the function although it not named
    return a + b;
}

// when use arrow function, no longer can access arguments
const add = (a, b) => {
    console.log(arguments);  
    return a + b;
}
console.log(add(55, 1, 100))

const user = {
    name: 'Andrew',
    cities: ['Philadelphia', 'New York', 'Dublin'],
    printPlacesLived: function () {
        // console.log(this.name);
        // console.log(this.cities);

        // // the this.name value in the bottom cannot be accessible so need another object that = this
        // const that = this; 

        // // this.cities.forEach(function (city) {
        // //     console.log(this.name + ' has lived in ' + city)
        // // })
        // this.cities.forEach(function (city) {
        //     console.log(that.name + ' has lived in ' + city)
        // })
        
        // //but it will run in arrow function 
        // this.cities.forEach((city) => {
        //     console.log(this.name + ' has lived in ' + city)
        // })

        // const cityMessaged = this.cities.map(() => {
        //     return this.name + ' has lived in ' + city;
        // }
        return this.cities.map((city) => this.name + ' has lived in ' + city);
    }
}

console.log(user.printPlacesLived());

const multiphier = {
    numbers: [10, 20, 30],
    multiplyBy: 3,
    multiphy() {
        return this.numbers.map((number) => numbers * this.multiplyBy);
    }
}