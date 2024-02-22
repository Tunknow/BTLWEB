package com.example.cookingguide.controller;

import com.example.cookingguide.model.Recipe;
import com.example.cookingguide.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/recipes")
@CrossOrigin(origins = "http://localhost:1234")
public class RecipeController {

    @Autowired
    private RecipeRepository repository;

    @PostMapping
    public ResponseEntity<Recipe> createRecipe(@RequestBody Recipe recipe) {
        try {
            if (recipe == null || recipe.getTitle() == null || recipe.getIngredients() == null) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }

            repository.save(recipe);
            return new ResponseEntity<>(recipe, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/{id}")
    public ResponseEntity<Recipe> getRecipeById(@PathVariable("id") String recipeId) {
        try {
            Optional<Recipe> recipeOptional = repository.findByRecipeId(recipeId);

            if (recipeOptional.isPresent()) {
                Recipe recipe = recipeOptional.get();
                return new ResponseEntity<>(recipe, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> searchRecipes(@RequestParam("search") String keyword) {
        try {
            List<Recipe> foundRecipes = repository.findByTitleContainingKeyword(keyword);

            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("results", foundRecipes.size());
            response.put("data", Collections.singletonMap("recipes", foundRecipes));

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
