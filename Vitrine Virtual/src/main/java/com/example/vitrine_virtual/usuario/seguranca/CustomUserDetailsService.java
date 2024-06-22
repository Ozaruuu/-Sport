package com.example.vitrine_virtual.usuario.seguranca;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.example.vitrine_virtual.usuario.modelo.Usuario;
import com.example.vitrine_virtual.usuario.repositorio.UsuarioRepositorio;

@Component
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        
        Usuario usuario = this.usuarioRepositorio.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("Usuario não encontrado"));
    
        return new org.springframework.security.core.userdetails.User(usuario.getEmail(), usuario.getSenha(), new ArrayList<>());
    }

    
}