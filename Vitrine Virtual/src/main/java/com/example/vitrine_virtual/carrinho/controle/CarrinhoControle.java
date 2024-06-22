package com.example.vitrine_virtual.carrinho.controle;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.vitrine_virtual.carrinho.modelo.Carrinho;
import com.example.vitrine_virtual.carrinho.modelo.ProdutoCarrinho;
import com.example.vitrine_virtual.carrinho.servico.CarrinhoServico;
import com.example.vitrine_virtual.produto.modelo.Produto;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("/carrinhos")
public class CarrinhoControle {
    
    
    @Autowired
    private CarrinhoServico carrinhoServico;

    @PostMapping("/{IdComprador}/add/{IdProduto}/{quantidade}")
    public ResponseEntity<?> adicionarProdutoAoCarrinho(@PathVariable String IdComprador, @PathVariable String IdProduto, @PathVariable int quantidade) {
        Carrinho carrinho = carrinhoServico.adicionarProdutoAoCarrinho(IdComprador, IdProduto, quantidade);
        return ResponseEntity.ok(carrinho.getItens());
    }

    @PutMapping("/{IdComprador}/alterar/{IdProduto}/{quantidade}")
    public ResponseEntity<?> alterarProdutoDoCarrinho(@PathVariable String IdComprador, @PathVariable String IdProduto, @PathVariable int quantidade) {
        return carrinhoServico.alterarProdutoDoCarrinho(IdComprador, IdProduto, quantidade);
    }
    
    //Método para listar todos os produtos do carrinho
    @GetMapping("/listar/{IdComprador}")
    public Iterable<ProdutoCarrinho> listar(@PathVariable String IdComprador) {
        return carrinhoServico.listar(IdComprador);
    }

    //Método para retornar o carrinho pelo id do comprador
    @GetMapping("/usar/{IdComprador}")
    public ResponseEntity<?> usarCarrinho(@PathVariable String IdComprador) {
        return carrinhoServico.getCarrinho(IdComprador);
    }

    //Método para remover um item do carrinho pelo id do produto
    @DeleteMapping("/{IdComprador}/remover/{IdProduto}")
    public ResponseEntity<?> removerDoCarrinho(@PathVariable String IdComprador, @PathVariable String IdProduto) {
        return carrinhoServico.removerDoCarrinho(IdComprador, IdProduto);
    }
     
}

