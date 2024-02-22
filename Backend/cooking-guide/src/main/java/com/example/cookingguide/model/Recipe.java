package com.example.cookingguide.model;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document("webrecipe")
public class Recipe {

    @Id
    @JsonProperty("id")
    private String id;
    @JsonProperty("publisher")
    private String publisher;
    @JsonProperty("ingredients")
    private List<Ingredient> ingredients;
    @JsonProperty("source_url")
    private String source_url;
    @JsonProperty("image_url")
    private String image_url;
    @JsonProperty("title")
    private String title;
    @JsonProperty("servings")
    private int servings;
    @JsonProperty("cooking_time")
    private int cooking_time;

}
