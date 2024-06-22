import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CartItem from './CartItem';

export default function CartProductList({ cartItems, updateCart }) {
    return (
        <div className="w-75 border-right border-warning d-flex flex-column">
            {cartItems.map((item) => (
                <CartItem
                    key={item.produto.id}
                    idProduto={item.produto.id}
                    quantidade={item.quantidade}
                    updateCart={updateCart}
                />
            ))}
        </div>
    );
}


















