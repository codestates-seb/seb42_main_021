package com.DuTongChitongYutong.EverybodyChachapark;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
<<<<<<< HEAD
import org.springframework.web.bind.annotation.CrossOrigin;
=======
>>>>>>> db83303be000cb95a3427d1c1da6fb893007d3d7

@CrossOrigin
@EnableJpaAuditing
@SpringBootApplication
public class EverybodyChachaparkApplication {

	public static void main(String[] args) {
		SpringApplication.run(EverybodyChachaparkApplication.class, args);

	}
}
