package com.example.vitrine_virtual.loja.controle;

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

import com.example.vitrine_virtual.loja.modelo.Loja;
import com.example.vitrine_virtual.loja.servico.LojaServico;
import com.example.vitrine_virtual.produto.modelo.Produto;
import com.example.vitrine_virtual.produto.servico.ProdutoServico;

@RestController
@RequestMapping("/lojas")
public class LojaControle {
    
    @Autowired
    private LojaServico lojaServico;

    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrar(@RequestBody Loja loja) {
        return lojaServico.cadastrar(loja);    
    }

    @PutMapping("/alterar")
    public ResponseEntity<?> alterar(@RequestBody Loja loja) {
        return lojaServico.alterar(loja);
    }

    @GetMapping("/usar/{id}")
    public ResponseEntity<?> usar(@PathVariable String id) {
        return lojaServico.usar(id);
    }
    
    @GetMapping("/listar")
    public Iterable<Loja> listar() {
        return lojaServico.listar();
    }

    @DeleteMapping("/remover/{id}")
    public ResponseEntity<?> remover(@PathVariable String id) {
        return lojaServico.remover(id);
    }
}
