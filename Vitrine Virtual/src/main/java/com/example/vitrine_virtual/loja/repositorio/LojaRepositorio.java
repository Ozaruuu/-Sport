package com.example.vitrine_virtual.loja.repositorio;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.vitrine_virtual.loja.modelo.Loja;

@Repository
public interface LojaRepositorio extends JpaRepository<Loja, String> {
    
    Optional<Loja> findByEmail(String email);
}
