# 📝 Sistema de Gestão de Tarefas - Full Stack

Este projeto é uma aplicação completa de gerenciamento de tarefas (To-Do List), desenvolvida para o Desafio Técnico – Estagiário Full Stack. O projeto foi estruturado com um backend em **Spring Boot** e um frontend dinâmico em **React**.

## 🚀 Tecnologias Utilizadas

### **Backend**
* **Java 21** & **Spring Boot 3**
* **Spring Data JPA**: Para persistência de dados
* **H2 Database**: Banco de dados em memória para execução ágil
* **Hibernate**: Mapeamento objeto-relacional (ORM)

### **Frontend**
* **React**: Interface de usuário declarativa
* **Axios**: Cliente HTTP para comunicação com a API REST

---

## ⚙️ Regras de Negócio Implementadas

O sistema segue rigorosamente os requisitos técnicos solicitados:
* **Validação de Dados**: O título da tarefa é obrigatório (máximo de 100 caracteres).
* **Datas Automáticas**: 
    * A `dataCriacao` é preenchida automaticamente no momento da inserção.
    * A `dataConclusao` é registrada automaticamente quando o status é alterado para **CONCLUIDA**.
* **Segurança na Exclusão**: O sistema bloqueia a exclusão de tarefas que estejam com o status **EM_ANDAMENTO**.

---

## 🛠️ Como Executar o Projeto

### **1. Pré-requisitos**
* JDK 17 ou superior.
* Node.js (LTS).
* Maven.

### **2. Passo a Passo**

#### **Backend**
1. Navegue até a pasta `backend`.
2. Execute o servidor:
   ```bash
   ./mvnw spring-boot:run
   ´´´
3. O servidor estará disponível em `http://localhost:8080`.
4. Console do banco H2: `http://localhost:8080/h2-console`
   * **JDBC URL**: `jdbc:h2:file:~/banco_tarefas`
   * **Usuário**: `admin` | **Senha**: (vazio)
   -> O URL foi alterado do padrão para `jdbc:h2:file:~/banco_tarefas`, assim as tarefas são guardadas após a página ser recarregada!

#### **Frontend**

1. Navegue até a pasta `frontend`.
2. Instale as dependências:
   ```bash
   npm install
3. Inicie a aplicação:
    ```bash
    npm start
    ```

A interface abrirá automaticamente em http://localhost:3000.

📂 Estrutura de Arquivos


    ├── src/main/java/backend/ # Model, Service e Controller
    ├── frontend/              # Interface React.js
    └── README.md              # Documentação do projeto


👩‍💻 Autora

    Isabela Barros de Oliveira 