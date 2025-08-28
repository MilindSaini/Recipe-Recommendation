package com.recommend.recipe.controller;

import com.recommend.recipe.model.Recipe;
import com.recommend.recipe.service.RecipeService;
import com.recommend.recipe.service.UserService;
import com.recommend.recipe.utils.AuthUtil; // Assuming you have this utility class

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
        // Assuming AuthUtil.getCurrentUserId() retrieves the authenticated user's ID
        String userId = AuthUtil.getCurrentUserId();
        if (userId == null) {
            // This case should ideally not happen with @PreAuthorize("isAuthenticated()"),
            // but as a fallback or if AuthUtil works differently.
            return ResponseEntity.status(401).build(); // Unauthorized
        }

        List<Recipe> recipes = recipeService.getRecipesByUserId(userId);
        return ResponseEntity.ok(recipes);
    }
}