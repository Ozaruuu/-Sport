package com.example.vitrine_virtual.usuario.seguranca;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.example.vitrine_virtual.usuario.modelo.Usuario;

@Service
public class TokenServico {
    
    @Value("${api.security.token.secret}") //Chave privada definida em application.properties
    private String secretKey;

    public String gerarToken(Usuario usuario){
        try {
            Algorithm algorithm = Algorithm.HMAC256(secretKey); //Algoritmo de criptografia usando uma chave privada
            
            String token = JWT.create()
            .withIssuer("login-auth-api")
            .withSubject(usuario.getEmail())
            .withExpiresAt(this.gerarDataDeExpiracao())
            .sign(algorithm);

            return token;
        
        } catch (JWTCreationException exception) {
            throw new RuntimeException("Erro na autenticação");
        }   
    }

    public String validarToken(String token){
        try {
            Algorithm algorithm = Algorithm.HMAC256(secretKey);
            
            return JWT.require(algorithm)
            .withIssuer("login-auth-api")
            .build()
            .verify(token)
            .getSubject();

        } catch (JWTVerificationException ex) {
            return null;
        }
    }

    private Instant gerarDataDeExpiracao(){
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
    }
}
