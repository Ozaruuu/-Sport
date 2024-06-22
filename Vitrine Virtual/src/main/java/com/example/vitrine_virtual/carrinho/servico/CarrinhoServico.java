package com.example.vitrine_virtual.carrinho.servico;


import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Optional;
import java.util.UUID;
import java.util.function.BiFunction;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.vitrine_virtual.produto.modelo.MensagemApi;
import com.example.vitrine_virtual.produto.modelo.Produto;
import com.example.vitrine_virtual.produto.repositorio.ProdutoRepositorio;
import com.example.vitrine_virtual.usuario.modelo.Usuario;
import com.example.vitrine_virtual.carrinho.modelo.Carrinho;
import com.example.vitrine_virtual.carrinho.modelo.ProdutoCarrinho;
import com.example.vitrine_virtual.carrinho.repositorio.CarrinhoRepositorio;
import com.example.vitrine_virtual.carrinho.repositorio.ProdutoCarrinhoRepositorio;
import com.example.vitrine_virtual.comprador.modelo.Comprador;
import com.example.vitrine_virtual.comprador.repositorio.CompradorRepositorio;
import com.example.vitrine_virtual.produto.DiretorioImagens;

import jakarta.transaction.Transactional;

@Service
@Transactional(rollbackOn = Exception.class)
public class CarrinhoServico {
    @Autowired
    private MensagemApi mensagemApi;
    
    @Autowired
    private CarrinhoRepositorio carrinhoRepositorio;

    @Autowired
    private ProdutoCarrinhoRepositorio produtoCarrinhoRepositorio;

    @Autowired
    private ProdutoRepositorio produtoRepositorio;

    @Autowired
    private CompradorRepositorio compradorRepositorio;


    public Carrinho adicionarProdutoAoCarrinho(String IdComprador, String IdProduto, int quantidade) {
        Comprador comprador = compradorRepositorio.findById(IdComprador).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        Produto produto = produtoRepositorio.findById(IdProduto).orElseThrow(() -> new RuntimeException("Produto não encontrado"));
        
        Carrinho carrinho = comprador.getCarrinho();

        //Cria o item do carrinho, define o produto e quantidade e salva no carrinho
        ProdutoCarrinho itemCarrinho = new ProdutoCarrinho();
        itemCarrinho.setProduto(produto);
        itemCarrinho.setQuantidade(quantidade);
        itemCarrinho.setCarrinho(carrinho);

        produtoCarrinhoRepositorio.save(itemCarrinho);

        carrinho.getItens().add(itemCarrinho);

        return carrinhoRepositorio.save(carrinho);
    }

    //Função para alterar quantidade de um produto do carrinho
    public ResponseEntity<?> alterarProdutoDoCarrinho(String IdComprador, String IdProduto, int novaQuantidade){
        Comprador comprador = compradorRepositorio.findById(IdComprador).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        Produto produto = produtoRepositorio.findById(IdProduto).orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        Carrinho carrinho = comprador.getCarrinho();

        // Verifica se o produto existe no carrinho
        ProdutoCarrinho itemExistente = carrinho.getItens().stream()
            .filter(item -> item.getProduto().getId().equals(IdProduto))
            .findFirst()
            .orElseThrow(() -> new RuntimeException("Produto não encontrado no carrinho"));

        itemExistente.setQuantidade(novaQuantidade);
        produtoCarrinhoRepositorio.save(itemExistente);
        
        return new ResponseEntity<Carrinho>(carrinhoRepositorio.save(carrinho), HttpStatus.OK);
    }

    //Função para listar produtos do carrinho
    public Iterable<ProdutoCarrinho> listar(String IdComprador){
        Comprador comprador = compradorRepositorio.findById(IdComprador).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        Carrinho carrinho = comprador.getCarrinho();

        return carrinho.getItens();
    }

    //Função para retornar carrinho do usuário
    public ResponseEntity<?> getCarrinho(String IdComprador){
        Optional<Comprador> compradorOptional = compradorRepositorio.findById(IdComprador);
        
        if(compradorOptional.isEmpty()){
            mensagemApi.setMensagem("O produto não foi encontrado");
            return new ResponseEntity<MensagemApi>(mensagemApi, HttpStatus.BAD_REQUEST); 
        }else{
            Comprador comprador = compradorOptional.get();
            return new ResponseEntity<Carrinho>(comprador.getCarrinho(), HttpStatus.OK);
        }
    }

    //Função para Remover item do carrinho pelo id do produto
    public ResponseEntity<MensagemApi> removerDoCarrinho(String IdComprador, String IdProduto){
        Comprador comprador = compradorRepositorio.findById(IdComprador).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        Carrinho carrinho = comprador.getCarrinho();


        // Verifica se o produto existe no carrinho através do IdProduto
        ProdutoCarrinho produtoCarrinho = carrinho.getItens().stream()
            .filter((ProdutoCarrinho item) -> {
                return item.getProduto().getId().equals(IdProduto);
            })
            .findFirst()
            .orElseThrow(() -> new RuntimeException("Produto não encontrado no carrinho"));


        carrinho.getItens().remove(produtoCarrinho);
        produtoCarrinhoRepositorio.delete(produtoCarrinho);

        carrinhoRepositorio.save(carrinho);

        mensagemApi.setMensagem("O produto foi removido com sucesso");
        return new ResponseEntity<MensagemApi>(mensagemApi, HttpStatus.OK);
    }
}
