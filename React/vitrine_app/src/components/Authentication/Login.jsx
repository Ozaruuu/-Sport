import React, { useState } from "react";
import { login } from "../../api/AuthServico";
import { useNavigate, Link } from "react-router-dom";
import './styles/Login.css'; // Importa o arquivo CSS de estilização

export default function Login() {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const [errorMessage, setErrorMessage] = useState('');

    const onChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleLogin = async (event) => {
        event.preventDefault(); // Evitar o comportamento padrão do formulário
        try {
            const { data } = await login(values);
            console.log(data);
            localStorage.setItem('id', data.id);
            localStorage.setItem('TipoUsuario', data.userType);
            navigate("/"); // Leva para página principal após o Login
        } catch (error) {
            console.log(error);
            setErrorMessage('Usuário ou senha incorretos. Por favor, tente novamente.');
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <form onSubmit={handleLogin} className="login-form">
                    <h3 className="text-center login-title">Fazer login</h3>
                    {errorMessage && <div className="alert alert-danger text-center">{errorMessage}</div>}
                    <div className="mb-3 input-wrapper">
                        <input type="email" name='email' value={values.email} onChange={onChange} placeholder="E-mail" className="form-control input" required />
                    </div>
                    <div className="mb-3 input-wrapper">
                        <input type="password" name='password' value={values.password} onChange={onChange} placeholder="Senha" className="form-control input" required />
                    </div>
                    <div className="d-grid button-wrapper">
                        <button type="submit" className="btn btn-primary btn-lg btn-custom submit-button">Continuar</button>
                    </div>
                    <div className="text-center mt-2 link-wrapper">
                    <Link to="/">Voltar</Link>
                    </div>
                    <div className="text-center mt-2 link-wrapper">
                        <span className="text-muted">Você ainda não tem conta?</span> <a href="/registrar-comprador" className="text-primary link">Criar conta</a>
                    </div>
                </form>
            </div>
        </div>
    );
}
