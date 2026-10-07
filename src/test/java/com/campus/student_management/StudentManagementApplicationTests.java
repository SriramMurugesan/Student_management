package com.campus.student_management;

import com.campus.student_management.entity.Department;
import com.campus.student_management.entity.Student;
import com.campus.student_management.repository.DepartmentRepository;
import com.campus.student_management.repository.StudentRepository;
import com.campus.student_management.service.StudentService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class StudentManagementApplicationTests {

    @Autowired
    private StudentService studentService;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Test
    void contextLoads() {
    }

    @Test
    void testCreateAndFindStudent() {
        Department dept = departmentRepository.findAll().stream().findFirst()
                .orElseGet(() -> departmentRepository.save(new Department("ECE")));

        Student student = new Student("Test Student", dept, 20);
        Student saved = studentService.createStudent(student);

        assertNotNull(saved.getId());
        assertEquals("Test Student", saved.getName());
        assertEquals(dept.getId(), saved.getDepartment().getId());

        Student retrieved = studentService.getStudentById(saved.getId());
        assertEquals("Test Student", retrieved.getName());

        // Cleanup
        studentService.deleteStudent(saved.getId());
    }
}
