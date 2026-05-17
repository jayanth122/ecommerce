package com.fdmgroup.Retail_POD_backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.fdmgroup.Retail_POD_backend.utils.JwtRequestFilter;

import lombok.extern.slf4j.Slf4j;

@Configuration
@EnableWebSecurity
@Slf4j
public class SecurityConfig {
    @Autowired
    private MyAuthenticationProvider authProvider;
    
    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        var htt = http
        		.securityMatcher("/**")  // Ensures security settings apply to all paths
        		.csrf(AbstractHttpConfigurer::disable) 								// Disable CSRF temporarily
                .cors(cors -> cors.configurationSource(corsConfigurationSource())) 	// CORS setup
                .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/v1/public/**",
                		"/swagger-ui/**", 
            			"/v3/api-docs/**").permitAll() 									// Allow endpoints to be accessed publicly
                .anyRequest().authenticated() 										// Secure all other endpoints
                ).authenticationProvider(authProvider)
                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
        
        log.info("Validated");
        return htt;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOriginPattern("*"); 	// Allow all origins. Replace "*" with specific domains for production
        configuration.addAllowedMethod("*");       		// Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
        configuration.addAllowedHeader("*");       		// Allow all headers
        configuration.setAllowCredentials(true);   		// Allow cookies or credentials
       
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
