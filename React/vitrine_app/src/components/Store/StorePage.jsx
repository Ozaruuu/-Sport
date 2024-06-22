import React, { useEffect, useState } from 'react';
import { getStoreProducts } from "../../api/ProdutoServico";
import { getLoja } from '../../api/LojaServico';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';
import StoreProductsList from './StoreProductsList';
import RegisterProduct from './RegisterProduct';
import Avaliacao from '../Rating/Avaliacao';

// Página para gestão de estoque da loja (cadastrar, alterar e excluir produtos)
export default function StorePage() {
  const [store, setStore] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      let response = await getStoreProducts(localStorage.getItem('id')); // Carrega todos os produtos da Loja
      setProducts(response.data);
      console.log(response.data);
      response = await getLoja(localStorage.getItem('id')); // Carrega informações da Loja
      setStore(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = () => {
    navigate('/', { state: { searchText } });
  };

  return (
    <div>
      <Navbar searchText={searchText} setSearchText={setSearchText} handleSearch={handleSearch} />
      <h1 className='p-3'>Gestão de Estoque</h1>
      <h2 className='px-3'>Nome: {store.nome}</h2>
      <h2 className='px-3 d-flex inline-flex gap-3'>Avaliação: {store.avaliacao == null ? "Sem avaliação" : <Avaliacao valor={store.avaliacao} />}</h2>
      <RegisterProduct idLoja={store.id} onProductRegistered={fetchProducts} />
      <StoreProductsList storeProducts={products} />
    </div>
  );
}







