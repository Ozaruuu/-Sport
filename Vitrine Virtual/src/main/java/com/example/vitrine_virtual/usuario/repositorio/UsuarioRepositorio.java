package com.example.vitrine_virtual.usuario.repositorio;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.vitrine_virtual.usuario.modelo.Usuario;

public interface UsuarioRepositorio extends JpaRepository<Usuario, String>  {
    
    Optional<Usuario> findByEmail(String email);
}
