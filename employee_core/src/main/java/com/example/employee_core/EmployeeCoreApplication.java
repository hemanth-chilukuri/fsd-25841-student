package com.example.employee_core;


import org.springframework.beans.factory.BeanFactory;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class EmployeeCoreApplication {

    public static void main(String[] args) {

        BeanFactory factory =
                new AnnotationConfigApplicationContext(AppConfig.class);

        EmployeeService service =
                factory.getBean(EmployeeService.class);

        service.addEmployee(101, "Anand", "CSE");
        service.addEmployee(102, "Divya", "ECE");

        System.out.println("All Employees:");
        service.getAllEmployees().forEach(System.out::println);
    }
}