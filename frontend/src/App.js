import React, { useState, useEffect } from 'react';
import api from './services/api';
import './App.css';

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [tarefaSelecionada, setTarefaSelecionada] = useState(null);
  const [novoTitulo, setNovoTitulo] = useState('');

  useEffect(() => { listarTarefas(); }, []);

  const listarTarefas = async () => {
    const res = await api.get('');
    setTarefas(res.data);
  };

  const alterarStatus = async (id, novoStatus) => {
    await api.put(`/${id}/status`, { status: novoStatus });
    setTarefaSelecionada(null);
    listarTarefas();
  };

  const excluirTarefa = async (id) => {
    try {
      await api.delete(`/${id}`);
      setTarefaSelecionada(null);
      listarTarefas();
    } catch (err) {
      alert("Não é possível excluir tarefas em andamento!");
    }
  };

  const filtrarPorStatus = (status) => tarefas.filter(t => t.status === status);

  const [exibirModalCriar, setExibirModalCriar] = useState(false);
  const [novaTarefa, setNovaTarefa] = useState({ titulo: '', descricao: '' });

  const salvarNovaTarefa = async () => {
    if (!novaTarefa.titulo) {
      alert("O título é obrigatório!");
      return;
    }

    try {
      await api.post('', {
        titulo: novaTarefa.titulo,
        descricao: novaTarefa.descricao,
        status: 'PENDENTE'
      });

      setExibirModalCriar(false);
      setNovaTarefa({ titulo: '', descricao: '' });
      listarTarefas();
    } catch (err) {
      console.error("Erro ao criar tarefa", err);
    }
  };

  const [dropdownAberto, setDropdownAberto] = useState(false);

  return (
    <div className="app-container">
      <header>
        <h1>Gestão de Tarefas</h1>
        <p className="subtitle">Suas tarefas:</p>
      </header>

      <div className="kanban-board">
        <Column title="Pendentes" color="#E57373" tasks={filtrarPorStatus('PENDENTE')} onClick={setTarefaSelecionada} />
        <Column title="Em andamento" color="#FFF176" tasks={filtrarPorStatus('EM_ANDAMENTO')} onClick={setTarefaSelecionada} />
        <Column title="Concluídas" color="#4DB6AC" tasks={filtrarPorStatus('CONCLUIDA')} onClick={setTarefaSelecionada} />
      </div>

      <button className="btn-criar" onClick={() => setExibirModalCriar(true)}>Criar</button>

      {tarefaSelecionada && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-x" onClick={() => setTarefaSelecionada(null)}>X</button>
            <h2>{tarefaSelecionada.titulo}</h2>
            <p className="desc">{tarefaSelecionada.descricao || "Sem descrição disponível."}</p>

            <div className="modal-footer">
              <div className="status-container">
                <div className="dropdown">
                  <button
                    className={`btn-dropdown ${tarefaSelecionada.status.toLowerCase()}`}
                    onClick={() => setDropdownAberto(!dropdownAberto)}
                  >
                    {tarefaSelecionada.status.replace('_', ' ')} ▼
                  </button>

                  {dropdownAberto && (
                    <div className="dropdown-content">
                      <button onClick={() => { alterarStatus(tarefaSelecionada.id, 'PENDENTE'); setDropdownAberto(false); }}>
                        PENDENTE
                      </button>
                      <button onClick={() => { alterarStatus(tarefaSelecionada.id, 'EM_ANDAMENTO'); setDropdownAberto(false); }}>
                        EM ANDAMENTO
                      </button>
                      <button onClick={() => { alterarStatus(tarefaSelecionada.id, 'CONCLUIDA'); setDropdownAberto(false); }}>
                        CONCLUÍDA
                      </button>
                    </div>
                  )}
                </div>

                <button className="btn-excluir-modal" onClick={() => excluirTarefa(tarefaSelecionada.id)}>
                  Excluir
                </button>
              </div>

            </div>
            <div className="modal-dates">
              <span>Criada em: {new Date(tarefaSelecionada.dataCriacao).toLocaleDateString()}</span>
              <span>Concluída em: {tarefaSelecionada.dataConclusao ? new Date(tarefaSelecionada.dataConclusao).toLocaleDateString() : '--/--/----'}</span>
            </div>
          </div>
        </div>
      )}

      {exibirModalCriar && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-x" onClick={() => setExibirModalCriar(false)}>X</button>
            <h2>Nova Tarefa</h2>

            <div className="form-group">
              <input
                className="modal-input"
                placeholder="Título da tarefa"
                value={novaTarefa.titulo}
                onChange={(e) => setNovaTarefa({ ...novaTarefa, titulo: e.target.value })}
              />
              <textarea
                className="modal-textarea"
                placeholder="Descrição da tarefa"
                value={novaTarefa.descricao}
                onChange={(e) => setNovaTarefa({ ...novaTarefa, descricao: e.target.value })}
              />
            </div>

            <div className="modal-footer">
              <button className="btn-salvar" onClick={salvarNovaTarefa}>Salvar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const Column = ({ title, color, tasks, onClick }) => (
  <div className="column">
    <div className="column-header" style={{ backgroundColor: color }}>{title}</div>
    <div className="column-body">
      {tasks.map(t => (
        <div key={t.id} className="task-item" onClick={() => onClick(t)}>{t.titulo}</div>
      ))}
    </div>
  </div>
);

export default App;