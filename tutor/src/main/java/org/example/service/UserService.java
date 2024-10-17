package org.example.service;

import org.example.model.User;

public interface UserService {
    User createUser(User user);
    User loginUser(String username, String password) throws IllegalArgumentException;
    void rechargeBalance(Long userId, double amount) throws IllegalArgumentException;
    void withdrawBalance(Long userId, double amount) throws IllegalArgumentException;
    User getUserById(Long userId) throws IllegalArgumentException;

}