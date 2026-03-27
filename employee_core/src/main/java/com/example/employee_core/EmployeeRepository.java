package com.example.employee_core;

import org.springframework.stereotype.Component;
import java.util.*;

@Component
public class EmployeeRepository {

    private final Map<Integer, Employee> store = new HashMap<>();

    public void save(Employee e) {
        store.put(e.getId(), e);
    }

    public Employee findById(int id) {
        return store.get(id);
    }

    public List<Employee> findAll() {
        return new ArrayList<>(store.values());
    }

    public boolean deleteById(int id) {
        return store.remove(id) != null;
    }
}