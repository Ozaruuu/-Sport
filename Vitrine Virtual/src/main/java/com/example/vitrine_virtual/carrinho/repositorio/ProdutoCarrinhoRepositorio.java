package com.example.vitrine_virtual.carrinho.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.vitrine_virtual.carrinho.modelo.ProdutoCarrinho;

import jakarta.transaction.Transactional;

public interface ProdutoCarrinhoRepositorio extends JpaRepository<ProdutoCarrinho, String> {
    
    @Transactional
    @Modifying
    @Query("DELETE FROM ProdutoCarrinho pc WHERE pc.produto.id = :idProduto")
    void deleteByProdutoId(@Param("idProduto") String idProduto);
}
