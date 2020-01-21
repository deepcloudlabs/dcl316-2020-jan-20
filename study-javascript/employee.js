class Employee {
    constructor(identity, fullname, salary) {
        this.identity = identity;
        this.fullname = fullname;
        this.salary = salary;
        // this.sayHello = this.sayHello.bind(this);
    }

    sayHello = () => {
        console.log(`Hello, ${this.fullname}!`);
    }
}

let jack = new Employee("1",
    "Jack Bauer", 100000)
/*
jack.sayHello()
window.fullname = "Kate Austen"
window.setTimeout(jack.sayHello, 3000)*/

let kate = new Employee("2",
    "Kate Austen", 200000)
Employee.prototype.iban = "TR1"

console.log("Attributes:")
for (let prop in jack) {
    let value = jack[prop];
    if (typeof value != "function")
        console.log(prop)
}
console.log("Functions:")
for (let prop in jack) {
    let value = jack[prop];
    if (typeof value == "function")
        console.log(prop)
}

