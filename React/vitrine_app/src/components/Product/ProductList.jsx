import React, { useEffect, useState } from 'react';
import { getImagemProduto, listarProdutos } from "../../api/ProdutoServico";
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductCard from './ProductCard';

export default function ProductList({ filteredProducts }) {
                   
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    
    const fetchProducts = async () => {
        try {
            setProdutos(filteredProducts)
          } catch (error) {
          console.error(error);
        }
    };

    // Chamando a função para buscar os produtos pela api
    fetchProducts();
  }, []);

  // Estilo para a margem superior ajustável
  const estiloMargemTopo = {
    marginTop: '100px', // Você pode ajustar este valor conforme necessário
  };

  // Renderiza o componente
  return (
    <div className="container" style={estiloMargemTopo}>
        <div className="d-flex justify-content-center flex-wrap">
          {/* Mapeia os produtos e retorna um elemento */}
          {filteredProducts.map((produto) => (
            <ProductCard key={produto.id} idProduto={produto.id} />
          ))}
        </div>
    </div>
  );
}


























