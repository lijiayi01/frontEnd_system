interface Person {
    firstName: String,
    lastName: String
}

function greeter(person: Person){
    console.log("Hello, " + person.firstName + " " + person.lastName);
}
let user = { firstName: "Jane", lastName: "User" };

greeter(user)

class Student {
    fullName: string;
    constructor(public firstName, public middleInitial, public lastName) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}
let user1 = new Student("Jane", "M.", "User");

greeter(user1)