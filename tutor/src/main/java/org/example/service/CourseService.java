package org.example.service;

import org.example.model.Course;
import java.util.List;

public interface CourseService {
    Course uploadCourse(Course course, Long teacherId) throws IllegalArgumentException;
    List<Course> getAllCourses();
    List<Course> getCoursesByTeacherId(Long teacherId);
}
