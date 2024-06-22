# Vitrine Virtual

Projeto da disciplina Gerência de Projeto

Alunos:

Arthur Salviano Ferreira

Fernando de Paiva Almeida Ferreira 

Lucas Manoel Freire Monteiro Cabral

  Este é um projeto de E-commerce feito com Spring Boot, React e MySQL.

# Requisitos
- Java 17
- Maven
- MySQL
- Node
  
# Instruções 

## Configurar conexão do banco de dados
  O banco utilizado no projeto é o MySQL, certifique-se de já ter instalado e criado um usuário, após isso, você pode navegar até o arquivo 'application.properties' no caminho
'E-commerce App\Vitrine Virtual\target\classes" e mudar o usuário e senha do arquivo manualmente,
 OU 
 crie váriaveis de ambiente com nome "SPRING_DATASOURCE_USERNAME" e "SPRING_DATASOURCE_PASSWORD" que representem, respectivamente, o usuário e senha do banco de dados MySQL.

 Feito isso, crie uma base de dados com o nome "vitrine_database" no seu banco (só precisa ser feito uma vez):
   ```
CREATE DATABASE vitrine_database;
   ```
  
## Instalar dependências node
O arquivo requirements.txt na pasta do React contém todas as dependências do projeto node, após descompactar o arquivo zip, navegue para o
diretorio onde está o package.json ("E-commerce App\React\vitrine_app") e execute a seguinte linha de comando:

### Windows:
  Abra o Windows Power Shell no diretório especificado e execute o comando:
  ```
  Get-Content requirements.txt | ForEach-Object { npm install $_ }
  ```

### Linux:
  ```
  cat requirements.txt | xargs npm install
  ```

Esse comando irá instalar as dependências listadas no arquivo "requirements.txt" ou se preferir, utilize o comando: 
  ```
  npm install "nome da dependencia"
  ```
para instalar as dependências manualmente.

## Instalar dependências e executar springboot
No diretório raiz do projeto "E-commerce App\Vitrine Virtual" (onde está o pom.xml), execute:
  ```
  mvn clean install
  ```
Após isso, execute o projeto com:
  ```
  mvn spring-boot:run
  ```

## Executar o Node

Após a instalação das dependências, será necessário executar o Node.

Navegue até o diretório do projeto Node "React\vitrine_app" e use o comando:
  ```
  npm start
  ```

Após isso, a página inicial da Vitrine Virtual abrirá no seu browser padrão. Também é possível ver a página inicial ao acessar "http://localhost:3000/"
  


