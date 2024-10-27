package org.example.service;

import org.example.model.Course;
import org.example.model.CourseHistory;
import org.example.model.User;
import org.example.repository.CourseHistoryRepository;
import org.example.repository.CourseRepository;
import org.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.util.ArrayList;
import java.util.List;
import java.util.HashMap;
import java.util.Map;
import java.time.LocalDateTime;

@Service
public class CourseHistoryServiceImpl implements CourseHistoryService {

    @Autowired
    private CourseHistoryRepository courseHistoryRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;

    private static final String OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
    private static final String OPENAI_API_KEY = "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";

    @Override
    public CourseHistory selectCourse(Long studentId, Long courseId) throws IllegalArgumentException {

        User student = userRepository.findById(studentId).orElse(null);
        Course course = courseRepository.findById(courseId).orElse(null);

        if (student == null || !"student".equals(student.getRole())) {
            throw new IllegalArgumentException("Invalid student ID or user is not a student");
        }

        if (course == null) {
            throw new IllegalArgumentException("Invalid Course ID");
        }

        if (courseHistoryRepository.findByStudentUserIdAndCourseCourseId(studentId, courseId) != null) {
            throw new IllegalArgumentException("This course has already been selected, please select another course");
        }


        if (student.getBalance().compareTo(course.getPrice()) < 0) {
            throw new IllegalArgumentException("Insufficient balance to select the course");
        }


        User teacher = course.getTeacher();
        student.setBalance(student.getBalance().subtract(course.getPrice()));
        teacher.setBalance(teacher.getBalance().add(course.getPrice()));


        userRepository.save(student);
        userRepository.save(teacher);


        CourseHistory courseHistory = new CourseHistory();
        courseHistory.setStudent(student);
        courseHistory.setCourse(course);
        courseHistory.setStartDate(LocalDateTime.now());

        return courseHistoryRepository.save(courseHistory);
    }

    @Override
    public List<CourseHistory> getSelectedCoursesByStudentId(Long studentId) {

        return courseHistoryRepository.findByStudentUserId(studentId);
    }


    @Override
    public String interactWithChatGPT(Long studentId, Long courseId, String studentMessage) {

        try {
            CourseHistory courseHistory = courseHistoryRepository.findByStudentUserIdAndCourseCourseId(studentId, courseId);
            if (courseHistory == null) {
                throw new IllegalArgumentException("The student has not yet taken this course");
            }

            Course course = courseHistory.getCourse();
            String courseContext = course.getContent();

            RestTemplate restTemplate = new RestTemplate();

            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("model", "gpt-4o-mini");
            List<Map<String, String>> messages = new ArrayList<>();
            messages.add(Map.of("role", "system", "content", courseContext));
            messages.add(Map.of("role", "user", "content", studentMessage));
            requestBody.put("messages", messages);
            requestBody.put("max_tokens", 50);
            requestBody.put("temperature", 0.7);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Authorization", "Bearer " + OPENAI_API_KEY);

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

            ResponseEntity<Map> response = restTemplate.postForEntity(OPENAI_API_URL, request, Map.class);

            if (response.getStatusCode() == HttpStatus.OK) {
                Map<String, Object> responseBody = response.getBody();
                if (responseBody != null && responseBody.containsKey("choices")) {
                    List<Map<String, Object>> choices = (List<Map<String, Object>>) responseBody.get("choices");
                    if (!choices.isEmpty()) {
                        Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
                        return (String) message.get("content");
                    }
                }
            }

            throw new RuntimeException("ChatGPT API 返回非预期的响应");
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("与 ChatGPT 互动时出错：" + e.getMessage(), e);
        }
    }
}




