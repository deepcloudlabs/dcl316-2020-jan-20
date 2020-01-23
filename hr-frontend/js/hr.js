class HrViewModel {
    constructor() {
        this.employee = new Employee();
        this.employees = ko.observableArray([]);
        this.fileData = ko.observable({
            dataUrl: ko.observable(AppConfig.NO_IMAGE)
        });

        this.find = this.find.bind(this);
        this.findAll = this.findAll.bind(this);
        this.insertFile = this.insertFile.bind(this);
        this.dragover = this.dragover.bind(this);
    }

    findAll() {
        fetch(`${AppConfig.BASE_URL}/employees?page=0&size=10`)
            .then(res => res.json())
            .then(employees => this.employees(employees))
    }

    find() {
        fetch(`${AppConfig.BASE_URL}/employees/${this.employee.identity()}`)
            .then(res => res.json())
            .then(emp => this.employee.update(emp))
    }

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
};