package backend.service;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.stereotype.Service;
import backend.model.Tarefa;
import backend.model.StatusTarefa;
import backend.repository.TarefaRepository;

@Service
public class TarefaService {

    private final TarefaRepository tarefaRepository;

    public TarefaService(TarefaRepository tarefaRepository) {
        this.tarefaRepository = tarefaRepository;
    }

    public List<Tarefa> getAll() {
        return tarefaRepository.findAll();
    }

    public Tarefa save(Tarefa tarefa) {
        if (StatusTarefa.CONCLUIDA.equals(tarefa.getStatus())) {
            tarefa.setDataConclusao(LocalDateTime.now());
        }
        return tarefaRepository.save(tarefa);
    }

    public Tarefa update(Long id, Tarefa dadosAtualizados) {
        Tarefa tarefaExistente = tarefaRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Tarefa não encontrada com ID: " + id));

        if (dadosAtualizados.getTitulo() == null || dadosAtualizados.getTitulo().isBlank()) {
            throw new RuntimeException("O título é obrigatório.");
        }

        if (StatusTarefa.CONCLUIDA.equals(dadosAtualizados.getStatus()) && 
            !StatusTarefa.CONCLUIDA.equals(tarefaExistente.getStatus())) {
            tarefaExistente.setDataConclusao(LocalDateTime.now());
        }

        tarefaExistente.setTitulo(dadosAtualizados.getTitulo());
        tarefaExistente.setDescricao(dadosAtualizados.getDescricao());
        tarefaExistente.setStatus(dadosAtualizados.getStatus());

        return tarefaRepository.save(tarefaExistente);
    }

    public void delete(Long id) {
        Tarefa tarefa = tarefaRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Tarefa não encontrada"));

        if (StatusTarefa.EM_ANDAMENTO.equals(tarefa.getStatus())) {
            throw new RuntimeException("Não é permitido excluir uma tarefa com status EM_ANDAMENTO.");
        }

        tarefaRepository.deleteById(id);
    }
}