package org.example.controller;

import org.example.model.User;
import org.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // DTO for login response
    public static class LoginResponse {
        private String username;
        private String role;
        private String token; // If needed for authentication

        public LoginResponse(String username, String role, String token) {
            this.username = username;
            this.role = role;
            this.token = token;
        }

        public String getUsername() {
            return username;
        }

        public String getRole() {
            return role;
        }

        public String getToken() {
            return token;
        }
    }

    @PostMapping("/create")
    public ResponseEntity<String> createUser(@RequestBody User user) {
        try {
            userService.createUser(user);
            return new ResponseEntity<>("User created successfully", HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("Server error, please try again later", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestParam String username, @RequestParam String password) {
        try {
            User user = userService.loginUser(username, password);

            // If login is successful, return user details (including role)
            LoginResponse response = new LoginResponse(user.getUsername(), user.getRole(), "dummy-token"); // You can add real token logic here
            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("Server error, please try again later", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/recharge")
    public ResponseEntity<String> rechargeBalance(@RequestParam Long userId, @RequestParam double amount) {
        try {
            userService.rechargeBalance(userId, amount);
            return new ResponseEntity<>("Recharge Successfully", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("Server error, please try again later", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/withdraw")
    public ResponseEntity<String> withdrawBalance(@RequestParam Long userId, @RequestParam double amount) {
        try {
            userService.withdrawBalance(userId, amount);
            return new ResponseEntity<>("Withdrawal Successful", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("Server error, please try again later", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/info")
    public ResponseEntity<User> getUserInfo(@RequestParam String username) {
        try {
            User user = userService.getUserByUsername(username); // 通过用户名查询用户
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/info/username")
    public ResponseEntity<User> getUserInfoByUsername(@RequestParam String username) {
        try {
            User user = userService.getUserByUsername(username);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
