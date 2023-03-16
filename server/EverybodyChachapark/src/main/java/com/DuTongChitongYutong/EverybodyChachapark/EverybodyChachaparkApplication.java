package com.DuTongChitongYutong.EverybodyChachapark;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.task.AsyncTaskExecutor;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;

import java.util.concurrent.Callable;
import java.util.concurrent.Future;

@EnableAsync
@EnableJpaAuditing
@SpringBootApplication
public class EverybodyChachaparkApplication {

	public static void main(String[] args) {
		SpringApplication.run(EverybodyChachaparkApplication.class, args);

	}
}
