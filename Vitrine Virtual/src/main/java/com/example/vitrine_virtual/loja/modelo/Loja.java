package com.example.vitrine_virtual.loja.modelo;

import org.hibernate.annotations.UuidGenerator;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "lojas")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Loja {
    
    @Id
    @UuidGenerator
    @Column(name = "id", unique = true, updatable = false)
    private String id;
    private String nome;
    private String cnpj;
    private String email;
    private String endereco;
    private Double avaliacao;
    private int totalAvaliacoes;
    private String cpf;
    
}
