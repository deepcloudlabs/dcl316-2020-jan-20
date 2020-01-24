package com.example.hr.service;

import com.example.hr.entity.Employee;
import com.example.hr.exception.DuplicateEmployeeException;
import com.example.hr.exception.EmployeeNotFoundException;
import com.example.hr.exception.ErrorCode;
import com.example.hr.repository.EmployeeRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

import static java.util.Objects.nonNull;

/**
 * @author Binnur Kurt <binnur.kurt@gmail.com>
 */
@Service
public class EmployeeService {
    private EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public Employee findByIdentity(String identity) {
        return employeeRepository.findById(identity).orElseThrow(
                () -> new EmployeeNotFoundException(
                        "Cannot find employee!",
                        ErrorCode.EMPLOYEE_NOT_FOUND,
                        "a822594e-dfed-4d97-acbe-7d16a9bbab76")
        );
    }

    public List<Employee> findAllEmployees(int page, int size) {
        return employeeRepository.findAll(PageRequest.of(page, size)).getContent();
    }

    public void createEmployee(Employee employee) {
        String identity = employee.getIdentity();
        if (employeeRepository.existsById(identity)) {
            throw new DuplicateEmployeeException(
                    "Employee already exists!",
                    ErrorCode.DUPLICATE_EMPLOYEE,
                    "fbdb5484-e3d1-4071-abf0-f423a2f69d6c"
            );
        }
        employeeRepository.save(employee);
    }

    public void updateEmployee(Employee employee) {
        String identity = employee.getIdentity();
        if (!employeeRepository.existsById(identity)) {
            throw new EmployeeNotFoundException(
                    "Cannot find employee!",
                    ErrorCode.EMPLOYEE_NOT_FOUND,
                    "ffc6795e-e8e3-45a8-8642-61c8556684cd");
        }
        Employee managed = employeeRepository.findById(identity).get();
        if (nonNull(employee.getPhoto())) managed.setPhoto(employee.getPhoto());
        managed.setDepartment(employee.getDepartment());
        managed.setFulltime(employee.isFulltime());
        managed.setSalary(employee.getSalary());
        managed.setIban(employee.getIban());
        employeeRepository.save(managed);
    }

    public Employee removeByIdentity(String identity) {
        Employee employee = employeeRepository.findById(identity).orElseThrow(
                () -> new EmployeeNotFoundException(
                        "Cannot find employee!",
                        ErrorCode.EMPLOYEE_NOT_FOUND,
                        "4343e24f-d7d6-487f-b063-5a98343b4022")
        );
        employeeRepository.delete(employee);
        return employee;
    }
}
