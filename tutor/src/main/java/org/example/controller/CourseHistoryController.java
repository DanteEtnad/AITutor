package org.example.controller;

import org.example.model.CourseHistory;
import org.example.service.CourseHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;



@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/course-history")
public class CourseHistoryController {

    @Autowired
    private CourseHistoryService courseHistoryService;

    @PostMapping("/select")
    public ResponseEntity<String> selectCourse(@RequestParam Long studentId, @RequestParam Long courseId) {
        try {
            courseHistoryService.selectCourse(studentId, courseId);
            return new ResponseEntity<>("Course Selection Success", HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("Server error, please try again later", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/student")
    public ResponseEntity<List<CourseHistory>> getSelectedCoursesByStudentId(@RequestParam Long studentId) {
        try {
            List<CourseHistory> courseHistories = courseHistoryService.getSelectedCoursesByStudentId(studentId);
            return new ResponseEntity<>(courseHistories, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/interact")
    public ResponseEntity<String> interactWithChatGPT(@RequestParam Long studentId, @RequestParam Long courseId, @RequestParam String message) {
        try {
            String response = courseHistoryService.interactWithChatGPT(studentId, courseId, message);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("Server error, please try again later", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
