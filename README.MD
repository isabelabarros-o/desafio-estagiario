# 📌 Desafio Técnico – Estagiário Full Stack

## 🎯 Desafio
Este é um desafio técnico para **Estagiário de Desenvolvimento de Software Full Stack**.  
O objetivo é avaliar sua capacidade de trabalhar com **Spring Boot (Java ou Kotlin)**, **Angular ou React** e banco de dados relacional.  

Você deve desenvolver uma aplicação simples de **Gestão de Tarefas**, seguindo as regras descritas abaixo.  

---

## 🛠️ Tecnologias Obrigatórias
- **Backend**: Spring Boot (Java ou Kotlin)  
- **Frontend**: Angular ou React  
- **Banco de Dados**: MySQL, PostgreSQL ou H2 (em memória)  

---

## 📋 Requisitos do Sistema

### Estrutura da Tarefa
Cada tarefa deve conter os seguintes campos:
- **id** → gerado automaticamente  
- **titulo** → obrigatório, até 100 caracteres  
- **descricao** → opcional, até 255 caracteres  
- **status** → valores possíveis: `PENDENTE`, `EM_ANDAMENTO`, `CONCLUIDA`  
- **dataCriacao** → preenchida automaticamente no cadastro  
- **dataConclusao** → preenchida automaticamente quando status for `CONCLUIDA`  

---

### Funcionalidades do Backend
- `POST /tarefas` → cadastrar tarefa  
- `GET /tarefas` → listar todas as tarefas  
- `PUT /tarefas/{id}` → atualizar status ou informações da tarefa  
- `DELETE /tarefas/{id}` → excluir tarefa  

---

### Funcionalidades do Frontend
- Tela com listagem de todas as tarefas  
- Formulário para adicionar nova tarefa  
- Ação para editar/atualizar status da tarefa  
- Botão para excluir tarefa  

---

### Regras de Negócio
1. O **título é obrigatório** e não pode ultrapassar 100 caracteres.  
2. Quando a tarefa for marcada como **CONCLUIDA**, o campo `dataConclusao` deve ser preenchido com a data/hora atual.  
3. Não é permitido **excluir uma tarefa com status `EM_ANDAMENTO`**.  

---

## 📂 Estrutura do Projeto
A seguinte estrutura deve ser utilizada como guia para organização do código:

```
desafio-fullstack-estagio/
│── backend/        # Código do Spring Boot (Java ou Kotlin)
│   └── src/        # Pacotes e classes do backend
│
│── frontend/       # Código do Angular ou React
│   └── src/        # Componentes, páginas e serviços do frontend
│
│── docs/           # Documentação opcional (diagramas, scripts SQL, anotações)
│
│── README.md       # Descrição do desafio (este arquivo)
```

> ⚠️ Você deve adicionar ao seu projeto um **README próprio** dentro do repositório explicando como rodar sua solução (passos para iniciar backend, frontend e banco).  

---

## ✅ Critérios de Aceitação
- Projeto organizado em **backend, frontend e banco de dados**.  
- API funcionando e validando as regras de negócio.  
- Frontend consumindo a API.  
- Fluxo básico de cadastro → listagem → atualização → exclusão funcionando.  
- Instruções claras de como rodar a aplicação.  

---

## ❌ Critérios de Reprovação
- Projeto não roda ou não possui instruções de execução.  
- Regras de negócio não foram implementadas.  
- Frontend não consome a API (ex.: apenas mocks).  
- Código confuso ou sem organização mínima.  

---

## 🚀 Como Entregar
1. Faça um **fork** deste repositório.  
2. Implemente a solução no **seu fork**.  
3. Garanta que seu projeto contenha um **README próprio com instruções de execução** (como iniciar backend, frontend e banco de dados).  
4. Envie o **link do seu repositório** para avaliação.  

---

## 📌 Observações
- Não é necessário implementar autenticação (JWT, OAuth, etc).  
- Foque em clareza, organização e funcionamento.  

---

Boa sorte 🚀  
