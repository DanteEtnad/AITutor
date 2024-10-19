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
    private static final String OPENAI_API_KEY = "OPENAI_API_KEY"; // 替换为实际的 API 密钥

    @Override
    public CourseHistory selectCourse(Long studentId, Long courseId) throws IllegalArgumentException {
        // 验证学生和课程是否存在
        User student = userRepository.findById(studentId).orElse(null);
        Course course = courseRepository.findById(courseId).orElse(null);

        if (student == null || !"student".equals(student.getRole())) {
            throw new IllegalArgumentException("Invalid student ID or user is not a student");
        }

        if (course == null) {
            throw new IllegalArgumentException("Invalid Course ID");
        }


        // 检查学生余额是否足够支付课程费用
        if (student.getBalance().compareTo(course.getPrice()) < 0) {
            throw new IllegalArgumentException("Insufficient balance to select the course");
        }

        // 扣除学生余额，增加教师余额
        User teacher = course.getTeacher();
        student.setBalance(student.getBalance().subtract(course.getPrice()));
        teacher.setBalance(teacher.getBalance().add(course.getPrice()));

        // 保存学生和教师更新后的信息
        userRepository.save(student);
        userRepository.save(teacher);

        // 保存选课记录
        CourseHistory courseHistory = new CourseHistory();
        courseHistory.setStudent(student);
        courseHistory.setCourse(course);
        courseHistory.setStartDate(LocalDateTime.now());

        return courseHistoryRepository.save(courseHistory);
    }

    @Override
    public List<CourseHistory> getSelectedCoursesByStudentId(Long studentId) {
        // 从数据库中获取特定学生的所有选课记录
        return courseHistoryRepository.findByStudentUserId(studentId);
    }


    @Override
    public String interactWithChatGPT(Long studentId, Long courseId, String studentMessage) {
        // 验证课程和学生的关系
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




