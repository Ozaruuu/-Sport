import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { FaClipboardList } from 'react-icons/fa';
import './Navbar.css';  // Arquivo CSS adicional para estilos personalizados

import logoName from '../images/LogoName.png';

const Navbar = ({ searchText, setSearchText, handleSearch }) => {
    const navigate = useNavigate();
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleSearch();
    };

    const handleLogout = () => {
        localStorage.removeItem('id');
        localStorage.removeItem('TipoUsuario');
        navigate("/");
        window.location.reload()
    };

    const handleHomeButton = () => {
        navigate("/");
        window.location.reload();
    };

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const closeDropdown = () => {
        setDropdownVisible(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                closeDropdown();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const isLoggedIn = localStorage.getItem('TipoUsuario'); //Armazena se o usuario está Logado

    return (
        <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
            <div className="container-fluid">
                <div className="navbar-brand" style={{ cursor: 'pointer' }} onClick={handleHomeButton}>
                    <img src={logoName} alt="Logo" className="logo-img"/>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <form onSubmit={handleSubmit} className="d-flex search-form">
                        <input 
                            className="form-control me-2" 
                            type="text" 
                            value={searchText} 
                            placeholder="Pesquisar ..." 
                            aria-label="Search" 
                            onChange={handleSearchChange}
                        />
                        <button className="btn btn-search" type="submit">
                            <i className="bi bi-search"></i>
                        </button>
                    </form>
                </div>
                <div className="d-flex align-items-center ms-3 me-3">
                    <div ref={dropdownRef} className="dropdown">
                        <button className="btn icon-btn" type="button" aria-expanded={dropdownVisible} onClick={toggleDropdown}>
                            <i className="bi bi-person-circle"></i>
                        </button>
                        <ul className={`dropdown-menu ${dropdownVisible ? 'show' : ''}`} aria-labelledby="dropdownMenuButton">
                            { !isLoggedIn && (<li><a className="dropdown-item" href="#" onClick={() => navigate("/login")}>Login</a></li>) }
                            <li><a className="dropdown-item" href="#" onClick={() => navigate("/registrar-comprador")}>Criar Conta</a></li>
                            <li><a className="dropdown-item" href="#" onClick={() => navigate("/registrar-loja")}>Criar Conta Vendedor</a></li>
                            { isLoggedIn && (<li><a className="dropdown-item" href="#" onClick={() => handleLogout()}>Sair</a></li>) }
                            {/* "Só mostra o botão Sair caso esteja Logado" */ }
                        </ul>
                    </div>

                    { //Só mostra o botão de Carrinho se o usuário estiver logado como Comprador
                    localStorage.getItem('TipoUsuario') == 'Comprador' ? 
                    <button className="btn icon-btn ms-3" onClick={() => navigate("/cart")}>
                        <i className="bi bi-cart"></i>
                    </button> :
                    <span></span>}

{                   //Só mostra o botão de Estoque se o usuário estiver logado como Loja
                    localStorage.getItem('TipoUsuario') == 'Loja' ? 
                    <button className="btn icon-btn ms-3" onClick={() => navigate("/store")}>
                        <FaClipboardList size={24}/>
                    </button> :
                    <span></span>}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;




