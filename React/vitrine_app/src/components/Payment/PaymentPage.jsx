import React, { useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from '../Navbar';
import { searchProduct } from '../Product/searchProductService';
import { useNavigate } from 'react-router-dom';
import { listarProdutosDoCarrinho } from '../../api/CarrinhoServico';
import PaymentInfo from './PaymentInfo';
import PurchaseInfo from './PurchaseInfo';


export default function StorePage() {
  const [produtos, setProdutos] = useState([]);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  const idComprador = localStorage.getItem('id');
  
  useEffect(() => {
    const fetchProducts = async () => {
        try {
            const response = await listarProdutosDoCarrinho(idComprador);
            setProdutos(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    fetchProducts();
}, [idComprador]);

  const handleSearch = () => {
    navigate('/', { state: { searchText } });
  };

    
  return (
    <div style={{ marginTop: '100px' }}>
      <Navbar searchText={searchText} setSearchText={setSearchText} handleSearch={handleSearch}  />
      <div className='w-100, d-flex'>
        <PurchaseInfo />
        <div className='vr mx-3'></div>
        <PaymentInfo />
      </div>
      
    </div>
  );
}


