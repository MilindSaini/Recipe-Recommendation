package com.recommend.recipe.service;

import com.recommend.recipe.model.Recipe;
import com.recommend.recipe.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipeService {

    private final RecipeRepository recipeRepository;

    @Autowired
    public RecipeService(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    public Recipe saveRecipe(String userId, String recipeName, String instructions, String ingredients, String nutritionalInfo, String substitutedIngredients, String dietaryRestrictions) {
        Recipe recipe = new Recipe();
        recipe.setUserId(userId);
        recipe.setRecipeName(recipeName);
        recipe.setInstructions(instructions);
        recipe.setIngredients(ingredients);
        recipe.setNutritionalInfo(nutritionalInfo);
        recipe.setSubstitutedIngredients(substitutedIngredients);
        recipe.setDietaryRestrictions(dietaryRestrictions);
        return recipeRepository.save(recipe);
    }

    public List<Recipe> getRecipesByUserId(String userId) {
        return recipeRepository.findByUserId(userId);
    }

    public void saveRecipe(Recipe recipe) {
    recipeRepository.save(recipe);
    }
}