package org.example.service;

import org.example.model.User;
import org.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User createUser(User user) {
        try {
            // Check if username already exists
            User existingUser = userRepository.findByUsername(user.getUsername());
            if (existingUser != null) {
                throw new IllegalArgumentException("Username already exists");
            }
            // Save new user
            return userRepository.save(user);
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    @Override
    public User loginUser(String username, String password) throws IllegalArgumentException {
        // Find user by username
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new IllegalArgumentException("User name does not exist");
        }
        // Verify password
        if (!user.getPassword().equals(password)) {
            throw new IllegalArgumentException("Incorrect password");
        }
        return user;
    }

    @Override
    public void rechargeBalance(Long userId, double amount) throws IllegalArgumentException {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            throw new IllegalArgumentException("User does not exist");
        }
        if (amount <= 0) {
            throw new IllegalArgumentException("Recharge amount must be greater than 0");
        }
        // Add balance
        user.setBalance(user.getBalance().add(new BigDecimal(amount)));
        userRepository.save(user);
    }

    @Override
    public void withdrawBalance(Long userId, double amount) throws IllegalArgumentException {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            throw new IllegalArgumentException("User does not exist");
        }
        if (!"teacher".equals(user.getRole())) {
            throw new IllegalArgumentException("Only teacher users can withdraw cash");
        }
        if (amount <= 0) {
            throw new IllegalArgumentException("The cash withdrawal amount must be greater than 0");
        }
        if (user.getBalance().compareTo(BigDecimal.valueOf(amount)) < 0) {
            throw new IllegalArgumentException("Insufficient balance to withdraw funds");
        }
        user.setBalance(user.getBalance().subtract(BigDecimal.valueOf(amount)));
        userRepository.save(user);
    }

    @Override
    public User getUserById(Long userId) throws IllegalArgumentException {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User does not exist"));
    }

    @Override
    public User getUserByUsername(String username) throws IllegalArgumentException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new IllegalArgumentException("User does not exist");
        }
        return user;
    }

}
