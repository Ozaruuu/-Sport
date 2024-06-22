package com.example.vitrine_virtual.produto.repositorio;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.vitrine_virtual.produto.modelo.Produto;

@Repository
public interface ProdutoRepositorio extends JpaRepository<Produto, String>{

    @Query("SELECT p FROM Produto p WHERE p.idLoja = :idLoja")
    public Iterable<Produto> findAllByLojaId(@Param("idLoja") String idLoja);
    
}
