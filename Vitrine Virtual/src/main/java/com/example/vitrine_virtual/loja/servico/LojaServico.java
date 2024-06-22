package com.example.vitrine_virtual.loja.servico;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.vitrine_virtual.loja.modelo.Loja;
import com.example.vitrine_virtual.loja.repositorio.LojaRepositorio;
import com.example.vitrine_virtual.produto.modelo.MensagemApi;
import com.example.vitrine_virtual.produto.repositorio.ProdutoRepositorio;

import jakarta.transaction.Transactional;

@Service
@Transactional(rollbackOn = Exception.class)
public class LojaServico {
    
    @Autowired
    private LojaRepositorio lojaRepositorio;

    @Autowired
    private MensagemApi mensagemApi;

    //Função para o cadastro de lojas
    public ResponseEntity<?> cadastrar(Loja loja){
        return new ResponseEntity<Loja>(lojaRepositorio.save(loja), HttpStatus.CREATED);
    }

    //Função para alterar informações da Loja
    public ResponseEntity<?> alterar(Loja loja){
        return new ResponseEntity<Loja>(lojaRepositorio.save(loja), HttpStatus.OK);
    }

    //Função para listar lojas
    public Iterable<Loja> listar(){
        return lojaRepositorio.findAll();
    }

    //Função para retornar uma loja pelo id(UUID)
    public ResponseEntity<?> usar(String id){
        Optional<Loja> lojaOptional = lojaRepositorio.findById(id);

        if(lojaOptional.isEmpty()){
            mensagemApi.setMensagem("A loja não foi encontrada");
            return new ResponseEntity<MensagemApi>(mensagemApi, HttpStatus.BAD_REQUEST); 
        }else{
            Loja loja = lojaOptional.get();
            return new ResponseEntity<Loja>(loja, HttpStatus.OK);
        }
        
    }

    //Função para Remover loja pelo id(UUID)
    public ResponseEntity<MensagemApi> remover(String id){

        lojaRepositorio.deleteById(id);

        mensagemApi.setMensagem("A loja foi removida com sucesso");
        return new ResponseEntity<MensagemApi>(mensagemApi, HttpStatus.OK);
    }

}
