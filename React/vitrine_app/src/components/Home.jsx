import React, { useEffect, useState } from 'react';
import {getImagemProduto, listarProdutos} from "../api/ProdutoServico";
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './Navbar';
import ProductCard from './Product/ProductCard';
import ProductList from './Product/ProductList';
import { searchProduct } from './Product/searchProductService';


export default function Home() {
  const [produtos, setProdutos] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await listarProdutos();
        setProdutos(response.data); // Inicialmente, mostra todos os produtos
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  //Atualiza a lista de produtos com os produtos filtrados pela busca
  const handleSearch = () => {
    
    const results = searchProduct(produtos, searchText);
    setProdutos(results);
    };

  return (
    <div>
      {}
      <Navbar searchText={searchText} setSearchText={setSearchText} handleSearch={handleSearch} />
      <ProductList filteredProducts={produtos}/>
    </div>
  );
}






