var nameVar = 'Andrew';
var nameVar = 'Mike';
console.log('nameVar', nameVar);

let nameLet = 'Jen';
nameLet = 'Julie';
console.log('nameLet', nameLet);

const nameConst = 'Frank';
console.log('nameConst', nameConst);

// Block scoping
var fullName = 'Andrew Mead'

if (fullName) {
    // var firstName = fullname.split(' ')[0];
    const firstName = fullname.split(' ')[0];
    console.log(firstName)
}
//const and let cannot access outside the function because block scoping but var can
console.log(firstName)

function getPetName() {
    var petName = 'Hal';
    return petName;
}

getPetName();
console.log(petName);