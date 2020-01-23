class Employee {
    constructor() {
        this.birthYear = ko.observable(2000);
        this.department = ko.observable("IT")
        this.fullname = ko.observable("Jack Bauer");
        this.fulltime = ko.observable(true);
        this.iban = ko.observable("TR");
        this.identity = ko.observable("12345678910")
        this.photo = ko.observable(AppConfig.NO_IMAGE);
        this.salary = ko.observable(3000);
    }

    update(employee) {
        for (let property in employee) {
            if (property in this) {
                if (ko.isObservable(this[property]))
                    this[property](employee[property]);
                else
                    this[property] = employee[property];
            }
        }
    }

}