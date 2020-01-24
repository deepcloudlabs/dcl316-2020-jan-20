class HrViewModel {
    constructor() {
        this.employee = new Employee();
        this.employees = ko.observableArray([]);
        this.fileData = ko.observable({
            dataUrl: ko.observable(AppConfig.NO_IMAGE)
        });
        this.totalSalary = ko.computed(() =>
            this.employees().map(emp => emp.salary)
                .reduce(
                    (sum, salary) => sum + salary, 0
                )
        );
        this.avgSalary = ko.computed(() =>
            this.totalSalary() / this.employees().length
        )
        //region method bindings
        this.add = this.add.bind(this);
        this.remove = this.remove.bind(this);
        this.update = this.update.bind(this);
        this.find = this.find.bind(this);
        this.findAll = this.findAll.bind(this);
        this.insertFile = this.insertFile.bind(this);
        this.dragover = this.dragover.bind(this);
        //endregion
    }

    copyRow = (emp) => {
        this.employee.update(emp);
        this.fileData().dataUrl(emp.photo);
        toastr.success(`${emp.fullname} is copied!`);
    }

    add() {
        let emp = ko.toJS(this.employee);
        emp.photo = toRawImage(this.fileData().dataUrl());
        fetch(`${AppConfig.BASE_URL}/employees`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(emp)
            })
            .then(res => {
                if (res.status != 200) return res.json();
            })
            .then(res => {
                if (res == undefined)
                    toastr.success(`${emp.fullname} is created!`);
                else if ('errorCode' in res) throw res;
            }).catch(err => {
            toastr.error(err.message)
        });
    }

    update() {
        let emp = ko.toJS(this.employee);
        emp.photo = toRawImage(this.fileData().dataUrl());
        fetch(`${AppConfig.BASE_URL}/employees`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(emp)
            })
            .then(res => {
                if (res.status != 200) return res.json();
            })
            .then(res => {
                if (res == undefined)
                    toastr.success(`${emp.fullname} is updated!`);
                else if ('errorCode' in res) throw res;
            }).catch(err => {
            toastr.error(err.message)
        });
    }

    findAll() {
        fetch(`${AppConfig.BASE_URL}/employees?page=0&size=10`)
            .then(res => res.json())
            .then(employees => {
                    employees.forEach(
                        emp => emp.photo = toSrcImage(emp.photo)
                    )
                this.employees(employees);
                toastr.success(`${employees.length} employees are retrieved from the server.`)
                }
            )
    }

    find() {
        fetch(`${AppConfig.BASE_URL}/employees/${this.employee.identity()}`)
            .then(res => res.json())
            .then(res => {
                if ('errorCode' in res) throw res; else return res;
            })
            .then(emp => {
                this.fileData().dataUrl(toSrcImage(emp.photo));
                this.employee.update(emp);
                toastr.success(`${emp.fullname} is retrieved from the server!`);
            })
            .catch(err => {
                toastr.error(err.message)
            });
    }

    removeAtRow = (emp) => {
        fetch(`${AppConfig.BASE_URL}/employees/${emp.identity}`,
            {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(res => {
                if ('errorCode' in res) throw res; else return res;
            })
            .then(emp => {
                this.fileData().dataUrl(toSrcImage(emp.photo));
                this.employee.update(emp);
                let emps = this.employees()
                    .filter(row => emp.identity != row.identity);
                this.employees(emps);
            })
            .catch(err => {
                toastr.error(err.message)
            });
    }

    remove() {
        fetch(`${AppConfig.BASE_URL}/employees/${this.employee.identity()}`,
            {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(res => {
                if ('errorCode' in res) throw res; else return res;
            })
            .then(emp => {
                this.fileData().dataUrl(toSrcImage(emp.photo));
                this.employee.update(emp);
            })
            .catch(err => {
                toastr.error(err.message)
            });
    }

    //region drag-and-drop
    insertFile(e, data) {
        e.preventDefault();
        let files = e.target.files || e.originalEvent.dataTransfer.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (event) => {
            this.fileData().dataUrl(event.target.result);
        };
    };

    dragover(e) {
        e.preventDefault();
    };

    //endregion
};