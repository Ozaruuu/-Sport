package com.example.vitrine_virtual.carrinho.modelo;

import java.util.UUID;

import org.hibernate.annotations.UuidGenerator;

import com.example.vitrine_virtual.produto.modelo.Produto;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "produto_no_carrinho")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProdutoCarrinho { //Representa o produto e sua quantidade no carrinho

    @Id
    @UuidGenerator
    @Column(name = "id", unique = true, updatable = false)
    private String IdProdutoCarrinho;

    @ManyToOne
    @JoinColumn(name = "id_produto", nullable = false)
    private Produto produto;

    @Column(nullable = false)
    private int quantidade;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY) // Ignora a serialização do carrinho para evitar repetições
    @JoinColumn(name = "id_carrinho", nullable = false)
    private Carrinho carrinho;
}
