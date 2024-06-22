package com.example.vitrine_virtual.produto.controle;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.vitrine_virtual.produto.DiretorioImagens;
import com.example.vitrine_virtual.produto.modelo.Produto;
import com.example.vitrine_virtual.produto.servico.ProdutoServico;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import org.springframework.http.MediaType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("/produtos")
public class ProdutoControle {
    
    private static final String DIRETORIO_IMAGENS = DiretorioImagens.DIRETORIO_IMAGENS;
    
    @Autowired
    private ProdutoServico produtoServico;

    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrar(@RequestBody Produto produto) {
        return produtoServico.cadastrar(produto);    
    }

    @PutMapping("/alterar")
    public ResponseEntity<?> alterar(@RequestBody Produto produto) {
        return produtoServico.alterar(produto);
    }

    @GetMapping("/usar/{id}")
    public ResponseEntity<?> usar(@PathVariable String id) {
        return produtoServico.usar(id);
    }
    
    //Método para listar todos os produtos
    @GetMapping("/listar")
    public Iterable<Produto> listar() {
        return produtoServico.listar();
    }

    //Método para retornar todos os produtos de uma loja específica pelo idLoja
    @GetMapping("/listar/{id}")
    public Iterable<Produto> listarProdutosDaLoja(@PathVariable String id) {
        return produtoServico.listarProdutosDaLoja(id);
    }

    @DeleteMapping("/remover/{id}")
    public ResponseEntity<?> remover(@PathVariable String id) {
        return produtoServico.remover(id);
    }

    @PutMapping("/upload")
    public ResponseEntity<String> uploadImagem(@RequestParam("id") String id, @RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok().body(produtoServico.uploadImagem(id, file));
    }

    @GetMapping(path = "/imagens/{id}", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public byte[] getImagem(@PathVariable("id") String id) throws IOException {
        return Files.readAllBytes(Paths.get(DIRETORIO_IMAGENS + id));
    }
    
    
}
