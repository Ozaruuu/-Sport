import React, { useRef, useState } from "react";
import { salvarProduto, updateImagem } from "../../api/ProdutoServico";

// Card de cadastro de novos produtos
export default function RegisterProduct({ idLoja, onProductRegistered }) {
    
    const fileRef = useRef();
    const [imagem, setImagem] = useState(undefined);
    const [imagemURL, setImagemURL] = useState(undefined);
    const [values, setValues] = useState({
        descricao: '',
        quantidade: '',
        valor: '',
        categoria: '',
        idLoja: '' 
    });

    // Automaticamente atualizar informações do produto ao mudar valores
    const onChange = (event) => {
        setValues({...values, [event.target.name]: event.target.value, idLoja: idLoja});
        console.log(values);
    };

    const handleNovoProduto = async (event) => {
        event.preventDefault();
        try {
            const { data } = await salvarProduto(values);
            const formData = new FormData();
            formData.append('file', imagem);
            formData.append('id', data.id);
            await updateImagem(formData);
            
            setImagem(undefined);
            setImagemURL(undefined);
            fileRef.current.value = null; // Reseta o arquivo de imagem após cadastro

            if (onProductRegistered) {
                onProductRegistered();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="card p-3 m-3 w-90">
            <h3>Cadastrar Produto:</h3>
            <form onSubmit={handleNovoProduto} className="d-flex flex-wrap p-3">
                <div className="d-inline-flex w-100 p-2 gap-4">
                    <div>
                        <input type="text" name='descricao' placeholder='Insira a descrição' value={values.descricao} onChange={onChange} required/>
                    </div>
                    <div>
                        <input type="number" name='quantidade' placeholder='Quantidade' value={values.quantidade} onChange={onChange} required/>
                    </div>
                </div>

                <div className="d-inline-flex w-100 p-2 gap-4">
                    <div>
                        <input type="text" name='valor' placeholder='Valor (R$)' value={values.valor} onChange={onChange} pattern="[0-9]+([.][0-9]+)?" required/>
                    </div>
                    <div>
                        <input type="text" name='categoria' placeholder='Categoria' value={values.categoria} onChange={onChange} required/>
                    </div>
                </div>

                <div className="w-100 p-2">
                    <input type="file" name='imagem' placeholder="Escolher Imagem" className="w-100" ref={fileRef} onChange={(event) => { setImagem(event.target.files[0]); setImagemURL(URL.createObjectURL(event.target.files[0])) }} />
                    {imagemURL && <img src={imagemURL} alt="Imagem selecionada" style={{maxWidth: '10%', height: 'auto', paddingTop: '5px'}} />}
                </div>
                <div className="p-2">
                    <button type="submit" className="btn btn-success">Realizar Cadastro</button>
                </div>
            </form>
        </div>
    );
}

