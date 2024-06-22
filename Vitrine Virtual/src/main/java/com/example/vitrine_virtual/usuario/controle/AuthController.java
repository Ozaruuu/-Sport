package com.example.vitrine_virtual.usuario.controle;

import org.springframework.web.bind.annotation.RestController;

import com.example.vitrine_virtual.comprador.modelo.Comprador;
import com.example.vitrine_virtual.comprador.repositorio.CompradorRepositorio;
import com.example.vitrine_virtual.loja.modelo.Loja;
import com.example.vitrine_virtual.loja.repositorio.LojaRepositorio;
import com.example.vitrine_virtual.produto.modelo.MensagemApi;
import com.example.vitrine_virtual.usuario.dto.LoginRequestDTO;
import com.example.vitrine_virtual.usuario.dto.RegisterRequestDTO;
import com.example.vitrine_virtual.usuario.dto.ResponseDTO;
import com.example.vitrine_virtual.usuario.modelo.Usuario;
import com.example.vitrine_virtual.usuario.repositorio.UsuarioRepositorio;
import com.example.vitrine_virtual.usuario.seguranca.TokenServico;

import lombok.RequiredArgsConstructor;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    
    private final UsuarioRepositorio usuarioRepositorio;
    private final PasswordEncoder passwordEncoder;
    private final TokenServico tokenServico;

    @Autowired
    private MensagemApi mensagemApi;

    @Autowired
    private LojaRepositorio lojaRepositorio;

    @Autowired
    private CompradorRepositorio compradorRepositorio;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginRequestDTO body) {
        
        Usuario usuario =  this.usuarioRepositorio.findByEmail(body.email()).orElseThrow(() -> new RuntimeException("Usuario não encontrado!"));
        
        //Caso a senha esteja correta, gera o token e retorna
        if(passwordEncoder.matches(body.password(), usuario.getSenha())){
            String token = this.tokenServico.gerarToken(usuario);

            // Cria entidades para verificar o tipo do usuário que está fazendo Login (Se é Loja ou Comprador)
            Optional<Loja> loja = this.lojaRepositorio.findByEmail(body.email());
            Optional<Comprador> comprador = this.compradorRepositorio.findByEmail(body.email());
            String tipoUsuario = "";
            String id = "";
            if (loja.isPresent()){
                tipoUsuario = "Loja";
                id = loja.get().getId();
            }
            if (comprador.isPresent()){
                tipoUsuario = "Comprador";
                id = comprador.get().getId();
            }
            return ResponseEntity.ok(new ResponseDTO(usuario.getNome(), token, tipoUsuario, id));
        }

        mensagemApi.setMensagem("Dados de login incorretos, tente novamente");
        System.out.println(mensagemApi.getMensagem());
        return new ResponseEntity<MensagemApi>(mensagemApi, HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequestDTO body) {
        Optional<Usuario> usuario = this.usuarioRepositorio.findByEmail(body.email());

        //Verifica se o usuário já existe no banco de dados, se não existir, cria a conta
        if(usuario.isEmpty()){
            Usuario novoUsuario = new Usuario();
            novoUsuario.setSenha(passwordEncoder.encode(body.password()));
            novoUsuario.setEmail(body.email());
            novoUsuario.setNome(body.name());

            this.usuarioRepositorio.save(novoUsuario);

            Optional<Loja> loja = this.lojaRepositorio.findByEmail(body.email());
            Optional<Comprador> comprador = this.compradorRepositorio.findByEmail(body.email());
            String tipoUsuario = "";
            String id = "";
            if (!loja.isEmpty()){
                tipoUsuario = "Loja";
                id = loja.get().getId();
                System.out.println("LOJA TESTE CADASTRADA");
            }
            if (!comprador.isEmpty()){
                tipoUsuario = "Comprador";
                id = comprador.get().getId();
            }

            String token = this.tokenServico.gerarToken(novoUsuario);
            return ResponseEntity.ok(new ResponseDTO(novoUsuario.getNome(), token,  tipoUsuario, id));
        }
        
        mensagemApi.setMensagem("Registro não pode ser concluído, email já cadastrado!");
        return new ResponseEntity<MensagemApi>(mensagemApi, HttpStatus.BAD_REQUEST);
    }
    
}
