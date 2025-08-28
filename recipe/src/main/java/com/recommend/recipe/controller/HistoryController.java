package com.recommend.recipe.controller;

import com.recommend.recipe.model.Recipe;
import com.recommend.recipe.service.RecipeService;
import com.recommend.recipe.service.UserService;
import com.recommend.recipe.utils.AuthUtil; // Assuming you have this utility class
import com.recommend.recipe.model.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class HistoryController {

    @Autowired
    RecipeService recipeService;

    @Autowired
    UserService userService; // Injected in case you need user details, though AuthUtil might suffice for ID

    @GetMapping("/history")
    @PreAuthorize("isAuthenticated()") // Ensures the user is authenticated
    public ResponseEntity<List<Recipe>> getRecipeHistory() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        // Find the user by username to get their ID
        User user = userService.findByUsername(username);
        if (user == null) {
            // This should not happen if authentication is successful, but as a safeguard
            return ResponseEntity.notFound().build();
        }
        String userId = user.getId();
        List<Recipe> recipes = recipeService.getRecipesByUserId(userId);
        return ResponseEntity.ok(recipes);
    }
}