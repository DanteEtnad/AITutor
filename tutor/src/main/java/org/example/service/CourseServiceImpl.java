package org.example.service;

import org.example.model.Course;
import org.example.model.User;
import org.example.repository.CourseRepository;
import org.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Course uploadCourse(Course course, Long teacherId) throws IllegalArgumentException {

        User teacher = userRepository.findById(teacherId).orElse(null);
        if (teacher == null || !"teacher".equals(teacher.getRole())) {
            throw new IllegalArgumentException("无效的教师ID或用户不是教师");
        }


        course.setTeacher(teacher);


        return courseRepository.save(course);
    }
    @Override
    public List<Course> getAllCourses() {

        return courseRepository.findAll();
    }

    @Override
    public List<Course> getCoursesByTeacherId(Long teacherId) {

        return courseRepository.findByTeacherUserId(teacherId);
    }
}
