class Employee {
    constructor() {
        this.birthYear = ko.observable(2000).extend({required: true});
        this.department = ko.observable("IT");
        this.fullname = ko.observable("Jack Bauer").extend({required: true, minLength: 3});
        this.fulltime = ko.observable(true);
        this.iban = ko.observable("TR").extend({required: true, iban: true});
        this.identity = ko.observable("24420422662").extend({required: true, tcKimlikNo: true})
        this.photo = ko.observable(AppConfig.NO_IMAGE);
        this.salary = ko.observable(3000).extend({required: true, min: 3000});
    }

    isEmployeeValid = () => {
        for (let field in this) {
            let value = this[field];
            if (ko.isObservable(value) && 'rules' in value
                && !value.isValid())
                return false;
        }
        return true;
    }

    validateEmployee = () => {
        for (let field in this) {
            let value = this[field];
            if (ko.isObservable(value) && 'rules' in value) {
                value.isModified(true);
                ko.validation.validateObservable(value);
            }
        }
    }

    update = (employee) => {
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