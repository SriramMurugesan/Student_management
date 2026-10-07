package com.campus.student_management.service;

import com.campus.student_management.entity.Student;
import com.campus.student_management.repository.StudentRepository;
import org.springframework.stereotype.Service;
import com.campus.student_management.exception.StudentNotFoundException;

import java.util.List;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {

        this.studentRepository = studentRepository;
    }

    // CREATE
    public Student createStudent(Student student) {

        return studentRepository.save(student);
    }

    // READ ALL
    public List<Student> getAllStudents() {

        return studentRepository.findAll();
    }

    // READ BY ID
    public Student getStudentById(Long id) {

        return studentRepository.findById(id).orElseThrow(() -> new StudentNotFoundException("Student not found with ID: " + id));
    }

    // UPDATE
    public Student updateStudent(Long id, Student student) {

        Student existingStudent = studentRepository.findById(id)
                .orElseThrow(() -> new StudentNotFoundException("Student not found with ID: " + id));

        existingStudent.setName(student.getName());
        existingStudent.setDepartment(student.getDepartment());
        existingStudent.setAge(student.getAge());

        return studentRepository.save(existingStudent);
    }

    // DELETE
    public String deleteStudent(Long id) {

        if (!studentRepository.existsById(id)) {
            throw new StudentNotFoundException("Student not found with ID: " + id);
        }
        studentRepository.deleteById(id);
        return "Student deleted successfully";
    }
}