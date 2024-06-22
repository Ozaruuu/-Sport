package com.example.vitrine_virtual.usuario.seguranca.cors;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000") //Substituir pelo domínio do site no deploy
                .allowedMethods("GET", "POST", "DELETE", "PUT");
    }
}
