package com.example.cookingguide;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories
public class CookingGuideApplication {

	public static void main(String[] args) {
		SpringApplication.run(CookingGuideApplication.class, args);
	}

}
