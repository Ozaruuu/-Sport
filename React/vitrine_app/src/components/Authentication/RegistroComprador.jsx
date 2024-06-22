import React, { useState } from "react";
import { register } from "../../api/AuthServico";
import { salvarComprador } from "../../api/CompradorServico";
import { useNavigate, Link } from "react-router-dom";
import "./styles/RegistroComprador.css"; // Importa o arquivo CSS de estilização

export default function RegistroComprador() {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        nome: '',
        endereco: '',
        telefone: '',
        cpf: '',
        email: '',
        password: '',
    });

    const [errorMessage, setErrorMessage] = useState('');

    const onChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            const newUserValues = { ...values };
            delete newUserValues.nome;

            const { data, status } = await register(newUserValues);

            if (status >= 200 && status < 300) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('name', data.name);

                const { data: compradorData } = await salvarComprador(values);
                localStorage.setItem('id', compradorData.id);
                localStorage.setItem('TipoUsuario', 'Comprador');

                navigate("/");
            } else if (status === 409) { // Código de status HTTP 409 para conflito, que pode indicar que o email já está cadastrado
                setErrorMessage("Esse email já possui cadastro");
            } else {
                console.error("Erro ao registrar usuário:", data.message);
                setErrorMessage("Erro ao registrar usuário");
            }
        } catch (error) {
            console.log(error);
            setErrorMessage("Erro ao registrar usuário");
        }
    };

    return (
        <div className="registro-comprador-container">
            <form onSubmit={handleRegister} className="registro-comprador-form">
                <div className="campos">
                <h2>Criar conta</h2>
                    <input type="text" name='nome' placeholder="Nome" value={values.nome} onChange={onChange} required />
                    <input type="text" name='endereco' placeholder="Endereço de entrega" value={values.endereco} onChange={onChange} required />
                    <input type="text" name='telefone' placeholder="Telefone" value={values.telefone} onChange={onChange} required />
                    <input type="text" name='cpf' placeholder="CPF" value={values.cpf} onChange={onChange} required />
                    <input type="text" name='email' placeholder="Email" value={values.email} onChange={onChange} required />
                    <input type="password" name='password' placeholder="Senha" value={values.password} onChange={onChange} required />
                </div>
                {errorMessage && <div className="error-message" style={{ color: 'red' }}>{errorMessage}</div>}
                <div className="botoes">
                    <Link to="/">Voltar</Link>
                    <button type="submit">Cadastrar Conta</button>
                </div>
            </form>
        </div>
    );
}
