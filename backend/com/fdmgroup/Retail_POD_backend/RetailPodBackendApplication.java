package com.fdmgroup.Retail_POD_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class RetailPodBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(RetailPodBackendApplication.class, args);
	}

}
