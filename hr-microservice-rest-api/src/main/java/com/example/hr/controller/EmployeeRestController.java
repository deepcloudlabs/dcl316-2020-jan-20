package com.example.hr.controller;

import com.example.hr.entity.Employee;
import com.example.hr.service.EmployeeService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.annotation.RequestScope;

import java.util.List;

/**
 * @author Binnur Kurt <binnur.kurt@gmail.com>
 * @url http://localhost:8001/hr/api/v1/employees
 */
@RestController
@RequestScope
@RequestMapping("employees")
@CrossOrigin
public class EmployeeRestController {
    private EmployeeService employeeSrv;

    public EmployeeRestController(EmployeeService employeeSrv) {
        this.employeeSrv = employeeSrv;
    }

    /**
     * @url GET http://localhost:8001/hr/api/v1/employees?page=2&size=10
     */
    @GetMapping(params = {"page", "size"})
    public List<Employee> findAllEmployees(@RequestParam int page, @RequestParam int size) {
        return employeeSrv.findAllEmployees(page, size);
    }

    @GetMapping("{identity}")
    public Employee findEmployeeByIdentity(@PathVariable String identity) {
        return employeeSrv.findByIdentity(identity);
    }

    @DeleteMapping("{identity}")
    public Employee removeEmployeeByIdentity(@PathVariable String identity) {
        return employeeSrv.removeByIdentity(identity);
    }

    @PostMapping
    public void addEmployee(@RequestBody Employee employee) {
        employeeSrv.createEmployee(employee);
    }

    @PutMapping
    public void updateEmployee(@RequestBody Employee employee) {
        employeeSrv.updateEmployee(employee);
    }
}