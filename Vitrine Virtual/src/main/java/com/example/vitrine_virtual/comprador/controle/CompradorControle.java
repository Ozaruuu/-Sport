package com.example.vitrine_virtual.comprador.controle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.vitrine_virtual.comprador.modelo.Comprador;
import com.example.vitrine_virtual.comprador.servico.CompradorServico;


@RestController
@RequestMapping("/compradores")
public class CompradorControle {
    
    @Autowired
    private CompradorServico compradorServico;

    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrar(@RequestBody Comprador comprador) {
        return compradorServico.cadastrar(comprador);    
    }

    @PutMapping("/alterar")
    public ResponseEntity<?> alterar(@RequestBody Comprador comprador) {
        return compradorServico.alterar(comprador);
    }

    @GetMapping("/usar/{id}")
    public ResponseEntity<?> usar(@PathVariable String id) {
        return compradorServico.usar(id);
    }
    
    @GetMapping("/listar")
    public Iterable<Comprador> listar() {
        return compradorServico.listar();
    }

    @DeleteMapping("/remover/{id}")
    public ResponseEntity<?> remover(@PathVariable String id) {
        return compradorServico.remover(id);
    }
}
