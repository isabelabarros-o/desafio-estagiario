import React, { useState, useEffect } from 'react';
import api from './services/api';

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [novoTitulo, setNovoTitulo] = useState('');
  const [novaDescricao, setNovaDescricao] = useState('');

  useEffect(() => {
    listarTarefas();
  }, []);

  const listarTarefas = async () => {
    const response = await api.get('');
    setTarefas(response.data);
  };

  const adicionarTarefa = async (e) => {
    e.preventDefault();
    if (!novoTitulo) return alert("Título é obrigatório!");
    
    await api.post('', { titulo: novoTitulo, descricao: novaDescricao, status: 'PENDENTE' });
    setNovoTitulo('');
    setNovaDescricao('');
    listarTarefas();
  };

  const excluirTarefa = async (id) => {
    try {
      await api.delete(`/${id}`);
      listarTarefas();
    } catch (error) {
      alert(error.response?.data || "Erro ao excluir tarefa");
    }
  };

  const alterarStatus = async (tarefa, novoStatus) => {
    await api.put(`/${tarefa.id}`, { ...tarefa, status: novoStatus });
    listarTarefas();
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial' }}>
      <h1>Gestão de Tarefas</h1>

      {/* Formulário */}
      <form onSubmit={adicionarTarefa} style={{ marginBottom: '20px' }}>
        <input placeholder="Título" value={novoTitulo} onChange={e => setNovoTitulo(e.target.value)} />
        <input placeholder="Descrição" value={novaDescricao} onChange={e => setNovaDescricao(e.target.value)} />
        <button type="submit">Adicionar</button>
      </form>

      {/* Listagem */}
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Título</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {tarefas.map(t => (
            <tr key={t.id}>
              <td>{t.titulo}</td>
              <td>{t.status}</td>
              <td>
                <select value={t.status} onChange={(e) => alterarStatus(t, e.target.value)}>
                  <option value="PENDENTE">PENDENTE</option>
                  <option value="EM_ANDAMENTO">EM_ANDAMENTO</option>
                  <option value="CONCLUIDA">CONCLUIDA</option>
                </select>
                <button onClick={() => excluirTarefa(t.id)} style={{ marginLeft: '10px', color: 'red' }}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;