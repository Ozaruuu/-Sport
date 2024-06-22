package com.example.vitrine_virtual.produto.modelo;

import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

//Classe que irá retornar uma mensagem para as requisições de API

@Component
@Getter
@Setter
public class MensagemApi {
    
    private String mensagem;
}
