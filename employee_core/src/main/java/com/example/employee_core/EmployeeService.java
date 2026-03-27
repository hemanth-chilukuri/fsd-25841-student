package com.example.employee_core;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class EmployeeService {

    private final EmployeeRepository repository;

    @Autowired
    public EmployeeService(EmployeeRepository repository) {
        this.repository = repository;
    }

    public void addEmployee(int id, String name, String dept) {
        repository.save(new Employee(id, name, dept));
    }

    public Employee getEmployee(int id) {
        return repository.findById(id);
    }

    public List<Employee> getAllEmployees() {
        return repository.findAll();
    }

    public boolean removeEmployee(int id) {
        return repository.deleteById(id);
    }
}