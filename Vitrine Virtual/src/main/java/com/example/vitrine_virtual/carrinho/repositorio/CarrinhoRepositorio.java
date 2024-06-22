package com.example.vitrine_virtual.carrinho.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.vitrine_virtual.carrinho.modelo.Carrinho;
import com.example.vitrine_virtual.produto.modelo.Produto;

@Repository
public interface CarrinhoRepositorio extends JpaRepository<Carrinho, String>{

    @Query("SELECT cart FROM Carrinho cart WHERE cart.idCarrinho = :idCarrinho")
    public Iterable<Produto> findAllProductsByCartId(@Param("idCarrinho") String idCarrinho);
    
}
