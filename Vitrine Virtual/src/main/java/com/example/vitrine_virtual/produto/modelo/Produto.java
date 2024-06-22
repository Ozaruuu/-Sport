package com.example.vitrine_virtual.produto.modelo;

import org.hibernate.annotations.UuidGenerator;

import com.example.vitrine_virtual.loja.modelo.Loja;
import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="produtos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Produto {
    
    @Id
    @UuidGenerator
    @Column(name = "id", unique = true, updatable = false)
    private String id;
    private String descricao;
    private int quantidade;
    private double valor;
    private String categoria;
    private Double avaliacao;
    private String urlImagem; //caminho para a imagem do produto
    
    @JoinColumn(name = "id_loja")
    private String idLoja;
}
