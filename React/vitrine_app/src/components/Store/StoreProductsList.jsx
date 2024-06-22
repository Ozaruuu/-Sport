import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import StoreItem from './StoreItem';


export default function StoreProductsList({ storeProducts }) {
  return (
    <div className="card p-3 m-3 w-90 border-right border-warning d-flex flex-column">
      <h1>Estoque de produtos</h1>
      {storeProducts.map((item) => (
            <StoreItem idProduto={item.id}/>
          ))}
    </div>
  );
};







