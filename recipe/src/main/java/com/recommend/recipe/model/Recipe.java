package com.recommend.recipe.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "recipes")
public class Recipe {

    @Id
    private String id;
    private String recipeName;
    private String instructions;
    private String nutritionalInfo;
    private String substitutedIngredients;
    private String ingredients;
    private String dietaryRestrictions;
    private String userId; // Link to the user who created this recipe

    public Recipe() {
    }

    public Recipe(String recipeName, String instructions, String nutritionalInfo, String substitutedIngredients, String ingredients, String dietaryRestrictions, String userId) {
        this.recipeName = recipeName;
        this.instructions = instructions;
        this.nutritionalInfo = nutritionalInfo;
        this.substitutedIngredients = substitutedIngredients;
        this.ingredients = ingredients;
        this.dietaryRestrictions = dietaryRestrictions;
        this.userId = userId;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRecipeName() {
        return recipeName;
    }

    public void setRecipeName(String recipeName) {
        this.recipeName = recipeName;
    }

    public String getInstructions() {
        return instructions;
    }

    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }

    public String getNutritionalInfo() {
        return nutritionalInfo;
    }

    public void setNutritionalInfo(String nutritionalInfo) {
        this.nutritionalInfo = nutritionalInfo;
    }

    public String getSubstitutedIngredients() {
        return substitutedIngredients;
    }

    public void setSubstitutedIngredients(String substitutedIngredients) {
        this.substitutedIngredients = substitutedIngredients;
    }

    public String getIngredients() {
        return ingredients;
    }

    public void setIngredients(String ingredients) {
        this.ingredients = ingredients;
    }

    public String getDietaryRestrictions() {
        return dietaryRestrictions;
    }

    public void setDietaryRestrictions(String dietaryRestrictions) {
        this.dietaryRestrictions = dietaryRestrictions;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}