package com.example.vitrine_virtual.carrinho.modelo;


import java.util.List;

import org.hibernate.annotations.UuidGenerator;

import com.example.vitrine_virtual.comprador.modelo.Comprador;
import com.example.vitrine_virtual.produto.modelo.Produto;
import com.example.vitrine_virtual.usuario.modelo.Usuario;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="carrinhos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Carrinho {
    
    @Id
    @UuidGenerator
    @Column(name = "id", unique = true, updatable = false)
    private String idCarrinho;
    
    @OneToMany(mappedBy = "carrinho", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProdutoCarrinho> itens;
    
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_comprador", nullable = false)
    private Comprador comprador;
}

