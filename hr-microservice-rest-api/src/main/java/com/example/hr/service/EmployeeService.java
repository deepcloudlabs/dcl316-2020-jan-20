package com.example.hr.service;

import com.example.hr.entity.Employee;
import com.example.hr.repository.EmployeeRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        return employeeRepository.findById(identity).orElseThrow(() -> new IllegalArgumentException("Cannot find employee!"));
    }

    public List<Employee> findAllEmployees(int page, int size) {
        return employeeRepository.findAll(PageRequest.of(page, size)).getContent();
    }

    @Transactional
    public void createEmployee(Employee employee) {
        String identity = employee.getIdentity();
        if (employeeRepository.existsById(identity)) {
            throw new IllegalArgumentException("Employee already exists!");
        }
        employeeRepository.save(employee);
    }

    @Transactional
    public void updateEmployee(Employee employee) {
        String identity = employee.getIdentity();
        if (!employeeRepository.existsById(identity)) {
            throw new IllegalArgumentException("Employee does not exist!");
        }
        Employee managed = employeeRepository.findById(identity).get();
        if (nonNull(employee.getPhoto())) managed.setPhoto(employee.getPhoto());
        managed.setDepartment(employee.getDepartment());
        managed.setFulltime(employee.isFulltime());
        managed.setSalary(employee.getSalary());
        managed.setIban(employee.getIban());
    }

    @Transactional
    public Employee removeByIdentity(String identity) {
        Employee employee = employeeRepository.findById(identity).orElseThrow(() -> new IllegalArgumentException("Cannot find employee!"));
        employeeRepository.delete(employee);
        return employee;
    }
}
