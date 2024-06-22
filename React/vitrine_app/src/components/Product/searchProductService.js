export const searchProduct = (products, searchText) => {
    if(searchText === '' || searchText == undefined){ //retorna os mesmos produtos caso a pesquisa for vazia
        return products;
    }

    return products.filter(product =>
        product.descricao.toLowerCase().includes(searchText.toLowerCase())
    );
  };