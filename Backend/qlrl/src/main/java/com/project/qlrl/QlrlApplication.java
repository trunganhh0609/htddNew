package com.project.qlrl;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@EnableScheduling
public class QlrlApplication {

	public static void main(String[] args) {
		SpringApplication.run(QlrlApplication.class, args);
	}

}