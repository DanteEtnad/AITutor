package org.example.service;

import org.example.model.Course;
import org.example.model.User;
import org.example.repository.CourseRepository;
import org.example.repository.UserRepository;
import org.example.service.CourseService;
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
        // 验证教师身份
        User teacher = userRepository.findById(teacherId).orElse(null);
        if (teacher == null || !"teacher".equals(teacher.getRole())) {
            throw new IllegalArgumentException("无效的教师ID或用户不是教师");
        }

        // 设置课程的教师ID
        course.setTeacher(teacher);

        // 保存课程
        return courseRepository.save(course);
    }
    @Override
    public List<Course> getAllCourses() {
        // 从数据库中获取所有课程
        return courseRepository.findAll();
    }

    @Override
    public List<Course> getCoursesByTeacherId(Long teacherId) {
        // 从数据库中获取特定教师的课程
        return courseRepository.findByTeacherUserId(teacherId);
    }
}
