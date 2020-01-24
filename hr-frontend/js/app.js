let hrViewModel = new HrViewModel();
$(
    () => {
        toastr.options = AppConfig.TOASTR_CONFIG;
        knockoutLocalize('tr');
        ko.applyBindings(hrViewModel);
        hrViewModel.employee.validateEmployee();
    }
);