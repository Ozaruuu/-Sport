import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

export default function CartInfo({ cartItems }) {
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const calcularTotal = () => {
      let valorTotal = 0;

      cartItems.forEach(item => {
        valorTotal += item.produto.valor * item.quantidade;
      });

      setTotal(valorTotal);
    };

    calcularTotal();
  }, [cartItems]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="w-25 card card-body">
      <div>
        <h2>Valor Total</h2>
        <hr />
        <h4>{cartItems.length} produtos no carrinho</h4>
        <ul className="list-group mb-3">
          {cartItems.map((item, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              <span>{item.produto.descricao}</span>
              <span>{item.quantidade}  {formatCurrency(item.produto.valor)}</span>
            </li>
          ))}
        </ul>
        <h3>Total: {formatCurrency(total)}</h3>
      </div>
      <div className="bottom-0 end-0 p-3">
        <button className="btn btn-warning w-100 py-3" onClick={() => navigate('/confirm-payment')} disabled={cartItems.length === 0}>Confirmar Compra</button>
      </div>
    </div>
  );
}

