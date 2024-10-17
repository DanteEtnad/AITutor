package org.example.service;

import org.example.model.CourseHistory;
import java.util.List;


public interface CourseHistoryService {
    CourseHistory selectCourse(Long studentId, Long courseId) throws IllegalArgumentException;
    List<CourseHistory> getSelectedCoursesByStudentId(Long studentId);
    String interactWithChatGPT(Long studentId, Long courseId, String studentMessage);
}
