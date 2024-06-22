import React, { useEffect, useState, useRef } from 'react';
import {getImagemProduto, getProduto, alterarProduto, updateImagem, deletarProduto} from "../../api/ProdutoServico";
import 'bootstrap/dist/css/bootstrap.min.css';
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegCheckCircle } from "react-icons/fa";

//Componente de cada item da Loja
export default function StoreItem({ idProduto }) {

    const fileRef = useRef();
    const [imagem, setImagem] = useState(null);
    const [product, setProduct] = useState({
        id: '',
        descricao: '',
        quantidade: '',
        valor: '',
        categoria: '',
        avaliacao: '',
        urlImagem: '',
        idLoja: ''
    });

    const onChange = (event) => {
        setProduct({...product, [event.target.name]: event.target.value});
        console.log(product);
    };

    // Manda as informações para alterar o produto
    const handleSubmit = async () => {
        try{
            const {data} = await alterarProduto(product);
            console.log(data);
            const formData = new FormData();
            formData.append('file', imagem);
            formData.append('id', data.id);
            const {data: urlImagem} = await updateImagem(formData)
            
            setImagem(undefined);
            fileRef.current.value = null //reseta o arquivo de imagem após alteração
        }catch(error){
            console.log(error)
        }
    };

    const handleDelete = () => {
        try{
            const response = deletarProduto(product.id);
            console.log(response.data);
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        
        const fetchProduct = async () => {
            try {
                //Carregando e atualizando informações do produto com base no id
                const response = await getProduto(idProduto);
                const productData = response.data;
                setProduct(productData);

                //Obter a imagem como um Blob:
                const imgResponse = await getImagemProduto(productData.urlImagem);

                // Criar uma URL Blob para a imagem
                const imageUrl = URL.createObjectURL(imgResponse);

                setImagem(imageUrl);
                console.log(imageUrl);
            } catch (error) {
            console.error(error);
            }
        };

        // Chamando a função para buscar o produto
        fetchProduct();
    }, [idProduto]);


    // Renderiza o componente
    return (
        <div className="card p-3 mb-2">
            <div className="border-0 rounded-0 d-flex wrap" style={{width: '100%'}}>
                <div style={{ width: '10%', height: '100px', overflow: 'hidden' }}>
                    <img src={imagem} alt="Imagem do produto" style={{ objectFit: 'contain', height: '100%', width: '100%' }}/>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className='align-self-start h-25 w-80'>
                        <div className="row">
                            <div className="col-md-4 d-flex flex-column">
                                <label>Description: </label>
                                <input type="text" placeholder={product.descricao} name='descricao' value={product.name} onChange={onChange} />

                                <label>Category: </label>
                                <input type="text" placeholder={product.categoria} name='categoria' value={product.name} onChange={onChange} />
                            </div>

                            <div className="col-md-2 d-flex flex-column">
                                <label>Price (R$): </label>
                                <input type="text" placeholder={product.valor} pattern="[0-9]+([.][0-9]+)?" name='valor' value={product.name} onChange={onChange} />
                                    
                                <label>Quantity: </label>
                                <input type="number" placeholder={product.quantidade} name='quantidade' value={product.name} onChange={onChange} />
                            </div>

                            <div className="col-md-3 d-flex flex-column">
                                <label>Rating:</label>
                                <p>{product.avaliacao==null ? "No review" : product.avaliacao}</p> 
                                
                                <label>Change Image: </label>
                                <input type="file" name="imagem" ref={fileRef}
                                        onChange={(event) => {
                                        setImagem(event.target.files[0]);
                                        }}
                                    />
                            </div>

                            <div className="col-md-3 d-flex flex-column p-2">
                                <button className='btn btn-success mb-3' type='submit'>Confirm Changes <FaRegCheckCircle size={25}/> </button>
                                <button className='btn btn-danger' onClick={handleDelete}>Delete Product <RiDeleteBin5Line size={25}/></button>
                            </div>
                        </div> 
                    </div>
                </form>
            
            </div>   
        </div>
    );
}








