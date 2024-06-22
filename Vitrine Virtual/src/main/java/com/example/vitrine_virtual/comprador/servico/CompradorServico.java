package com.example.vitrine_virtual.comprador.servico;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.vitrine_virtual.carrinho.modelo.Carrinho;
import com.example.vitrine_virtual.carrinho.repositorio.CarrinhoRepositorio;
import com.example.vitrine_virtual.comprador.modelo.Comprador;
import com.example.vitrine_virtual.comprador.repositorio.CompradorRepositorio;
import com.example.vitrine_virtual.produto.modelo.MensagemApi;
import com.example.vitrine_virtual.usuario.modelo.Usuario;

import jakarta.transaction.Transactional;

@Service
@Transactional(rollbackOn = Exception.class)
public class CompradorServico {
    
    @Autowired
    private CompradorRepositorio compradorRepositorio;

    @Autowired
    private CarrinhoRepositorio carrinhoRepositorio;

    @Autowired
    private MensagemApi mensagemApi;

    //Função para o cadastro de compradores
    public ResponseEntity<?> cadastrar(Comprador comprador){
        // Salvar o usuário
        Comprador novoComprador = compradorRepositorio.save(comprador);
        
        // Criar um novo carrinho para o usuário
        Carrinho carrinho = new Carrinho();
        carrinho.setComprador(novoComprador);
        carrinhoRepositorio.save(carrinho);

        novoComprador.setCarrinho(carrinho);

        return new ResponseEntity<Comprador>(compradorRepositorio.save(comprador), HttpStatus.CREATED);
    }

    //Função para alterar informações do comprador
    public ResponseEntity<?> alterar(Comprador comprador){
        return new ResponseEntity<Comprador>(compradorRepositorio.save(comprador), HttpStatus.OK);
    }

    //Função para listar compradores
    public Iterable<Comprador> listar(){
        return compradorRepositorio.findAll();
    }

    //Função para retornar uma comprador pelo id(UUID)
    public ResponseEntity<?> usar(String id){
        Optional<Comprador> compradorOptional = compradorRepositorio.findById(id);

        if(compradorOptional.isEmpty()){
            mensagemApi.setMensagem("O comprador não foi encontrado");
            return new ResponseEntity<MensagemApi>(mensagemApi, HttpStatus.BAD_REQUEST); 
        }else{
            Comprador comprador = compradorOptional.get();
            return new ResponseEntity<Comprador>(comprador, HttpStatus.OK);
        }
        
    }

    //Função para Remover comprador pelo id(UUID)
    public ResponseEntity<MensagemApi> remover(String id){

        compradorRepositorio.deleteById(id);

        mensagemApi.setMensagem("O comprador foi removido com sucesso");
        return new ResponseEntity<MensagemApi>(mensagemApi, HttpStatus.OK);
    }
}
