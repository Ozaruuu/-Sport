import React, { useState } from "react";
import { register } from "../../api/AuthServico";
import { salvarLoja } from "../../api/LojaServico";
import { useNavigate, Link } from "react-router-dom";
import './styles/RegistroLoja.css'; // Importa o arquivo CSS de estilização

export default function RegistroLoja() {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        nome: '',
        endereco: '',
        email: '',
        cnpj: '',
        cpf: '',
        avaliacao: 0
    });

    const [userValues, setUserValues] = useState({
        email: '',
        password: '',
    });

    const [errorMessage, setErrorMessage] = useState('');

    const onChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
        setUserValues({ ...userValues, [event.target.name]: event.target.value });
    };

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            const newUserValues = { ...userValues, name: values.nome };
            setUserValues(newUserValues);

            const { data: registerData, status: registerStatus } = await register(newUserValues);

            if (registerStatus >= 200 && registerStatus < 300) {
                const { data: lojaData, status: lojaStatus } = await salvarLoja(values);
                if (lojaStatus >= 200 && lojaStatus < 300) {
                    localStorage.setItem('id', lojaData.id);
                    localStorage.setItem('TipoUsuario', 'Loja');
                    navigate("/"); // Redireciona para a página inicial
                } else {
                    console.error("Erro ao salvar loja:", lojaData.message);
                    setErrorMessage('Erro ao salvar loja');
                }
            } else {
                console.error("Erro ao registrar usuário:", registerData.message);
                if (registerData.message === 'Email already exists') {
                    setErrorMessage('Já existe uma conta com esse email');
                }
            }
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data.message === 'Email already exists') {
                setErrorMessage('Já existe uma conta com esse email');
            } else {
                setErrorMessage('Já existe uma conta com esse email');
            }
        }
    };

    return (
        <div className="registroLoja">
            <div className="container">
                <form onSubmit={handleRegister} className="form text-center ">
                    <h2>Criar conta vendedor</h2>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <div className="formGroup">
                        <input type="text" id="nome" name='nome' value={values.nome} onChange={onChange} placeholder="Nome" required />
                    </div>
                    <div className="formGroup">
                        <input type="text" id="endereco" name='endereco' value={values.endereco} onChange={onChange} placeholder="Endereço" required />
                    </div>
                    <div className="formGroup">
                        <input type="text" id="cnpj" name='cnpj' value={values.cnpj} onChange={onChange} placeholder="CNPJ" required />
                    </div>
                    <div className="formGroup">
                        <input type="text" id="cpf" name='cpf' value={values.cpf} onChange={onChange} placeholder="CPF" required />
                    </div>
                    <div className="formGroup">
                        <input type="text" id="email" name='email' value={userValues.email} onChange={onChange} placeholder="Email" required />
                    </div>
                    <div className="formGroup">
                        <input type="password" id="password" name='password' value={userValues.password} onChange={onChange} placeholder="Senha" required />
                    </div>
                    <div className="formGroup">
                        <button type="submit" className="button">Cadastrar Conta</button>
                    </div>
                    <div className="text-center mt-2 link-wrapper">
                    <Link to="/">Voltar</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
