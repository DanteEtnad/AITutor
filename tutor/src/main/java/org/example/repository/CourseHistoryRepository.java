package org.example.repository;

import org.example.model.CourseHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseHistoryRepository extends JpaRepository<CourseHistory, Long> {
    CourseHistory findByStudentUserIdAndCourseCourseId(Long studentId, Long courseId);
    List<CourseHistory> findByStudentUserId(Long studentId);
}
