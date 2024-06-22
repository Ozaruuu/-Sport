import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

// Reponsável por desenhar o rating (estrelas) a partir de um valor (1 a 5)
const Avaliacao = ({ valor, tamanho }) => {
    const renderEstrelas = () => {
        const estrelas = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= valor) {
                estrelas.push(<FaStar key={i} className="text-warning" fontSize={tamanho}/>);
            } else if (i === Math.ceil(valor) && !Number.isInteger(valor)) {
                estrelas.push(<FaStarHalfAlt key={i} className="text-warning" fontSize={tamanho} />);
            } else {
                estrelas.push(<FaRegStar key={i} className="text-warning" fontSize={tamanho} />);
            }
        }
        return estrelas;
    };

    return (
        <div>
            {renderEstrelas()}
        </div>
    );
};

export default Avaliacao;