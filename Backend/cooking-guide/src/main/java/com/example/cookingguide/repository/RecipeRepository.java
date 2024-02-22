package com.example.cookingguide.repository;

import com.example.cookingguide.model.Recipe;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RecipeRepository extends MongoRepository<Recipe, Long> {
    @Query("{'_id' : ObjectId('?0')}")
    Optional<Recipe> findByRecipeId( String recipeId);


    @Query("{ 'title' : { '$regex' : ?0, '$options' : 'i' } }")
    List<Recipe> findByTitleContainingKeyword(String keyword);
}
