package com.recommend.recipe.service;

import java.util.List;
import java.util.Optional;

import com.recommend.recipe.model.User;

public interface UserService {
    List<User> getAllUsers();
    User findByUsername(String username);
    Optional<User> findByEmail(String email);
    User registerUser(User user);
}
