package com.example.studentcrud.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.studentcrud.model.Student;

public interface StudentRepository extends JpaRepository<Student, Integer> {

}