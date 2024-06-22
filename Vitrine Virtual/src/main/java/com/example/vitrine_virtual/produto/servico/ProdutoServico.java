package com.example.vitrine_virtual.produto.servico;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Optional;
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
import com.example.vitrine_virtual.carrinho.repositorio.ProdutoCarrinhoRepositorio;
import com.example.vitrine_virtual.produto.DiretorioImagens;

import jakarta.transaction.Transactional;

@Service
@Transactional(rollbackOn = Exception.class)
public class ProdutoServico {
    
    private static final String DIRETORIO_IMAGENS = DiretorioImagens.DIRETORIO_IMAGENS;

    @Autowired
    private ProdutoRepositorio produtoRepositorio;

    @Autowired
    private ProdutoCarrinhoRepositorio produtoCarrinhoRepositorio;

    @Autowired
    private MensagemApi mensagemApi;


    //Função para o cadastro de produtos
    public ResponseEntity<?> cadastrar(Produto produto){

        if (produto.getDescricao().equals("")) {
            mensagemApi.setMensagem("O produto deve ter uma descrição");
            return new ResponseEntity<MensagemApi>(mensagemApi, HttpStatus.BAD_REQUEST);
        }else{
            return new ResponseEntity<Produto>(produtoRepositorio.save(produto), HttpStatus.CREATED);
        }
    }

    //Função para alterar informações do produto
    public ResponseEntity<?> alterar(Produto produto){

        if (produto.getDescricao().equals("")) {
            mensagemApi.setMensagem("O produto deve ter uma descrição");
            return new ResponseEntity<MensagemApi>(mensagemApi, HttpStatus.BAD_REQUEST);
        }else{
            return new ResponseEntity<Produto>(produtoRepositorio.save(produto), HttpStatus.OK);
        }
    }

    //Função para listar produtos
    public Iterable<Produto> listar(){
        return produtoRepositorio.findAll();
    }

    //Função para listar produtos
    public Iterable<Produto> listarProdutosDaLoja(String id){
        return produtoRepositorio.findAllByLojaId (id);
    }

    //Função para retornar um produto pelo id(UUID)
    public ResponseEntity<?> usar(String id){
        Optional<Produto> produtoOptional = produtoRepositorio.findById(id);

        if(produtoOptional.isEmpty()){
            mensagemApi.setMensagem("O produto não foi encontrado");
            return new ResponseEntity<MensagemApi>(mensagemApi, HttpStatus.BAD_REQUEST); 
        }else{
            Produto produto = produtoOptional.get();
            return new ResponseEntity<Produto>(produto, HttpStatus.OK);
        }
        
    }

    //Função para Remover produto pelo id(UUID)
    public ResponseEntity<MensagemApi> remover(String id){
        
        produtoCarrinhoRepositorio.deleteByProdutoId(id); //Remove o produto dos carrinhos para depois remover do banco de produtos
        produtoRepositorio.deleteById(id);

        mensagemApi.setMensagem("O produto foi removido com sucesso");
        return new ResponseEntity<MensagemApi>(mensagemApi, HttpStatus.OK);
    }


    public Produto getProduto(String id){
        return produtoRepositorio.findById(id).orElseThrow(() -> new RuntimeException("Produto não encontrado"));
    }
    
    //Função para salvar a imagem no diretorio especificado e o url da imagem no objeto Produto
    public String uploadImagem(String id, MultipartFile file){ //id do produto e arquivo de imagem
        Produto produto = getProduto(id);
        String urlImagem = funcaoImagem.apply(id, file);
        produto.setUrlImagem(urlImagem);

        produtoRepositorio.save(produto);

        return urlImagem;
    }

    //Função para pegar a extensão do arquivo (.jpeg, .png etc...), caso não consiga, coloca ".png" no final
    private final Function<String, String> separarExtensaoDoNomeDoArquivo = nomeArquivo -> Optional.of(nomeArquivo).filter(nome -> nome.contains("."))
    .map(nome -> "." + nome.substring(nome.lastIndexOf(".") + 1)).orElse(".png");

    //Função responsável por criar o diretório e salvar imagens do produto
    private final BiFunction<String, MultipartFile, String> funcaoImagem = (id, imagem) -> {
        String nomeArq = id + separarExtensaoDoNomeDoArquivo.apply(imagem.getOriginalFilename());
        
        try{
            java.nio.file.Path diretorioDeArmazenamento = Paths.get(DIRETORIO_IMAGENS).toAbsolutePath().normalize();
            if(!Files.exists(diretorioDeArmazenamento)) { //Verifica se diretório já existe, se não, cria o diretório
                Files.createDirectories(diretorioDeArmazenamento);
            }

            //salva o arquivo no diretorio com nome do id do produto e substitui caso já exista
            Files.copy(imagem.getInputStream(), diretorioDeArmazenamento.resolve(nomeArq), StandardCopyOption.REPLACE_EXISTING);
            return ServletUriComponentsBuilder.fromCurrentContextPath().path("/produtos/imagens/" + nomeArq).toUriString();
        }catch(Exception exception){
            throw new RuntimeException("Não foi possível salvar imagem");
        }
    };

}
