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

    public Tarefa atualizarStatus(Long id, String novoStatusStr) {
        Tarefa tarefa = tarefaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tarefa não encontrada com ID: " + id));

        try {
            StatusTarefa novoStatus = StatusTarefa.valueOf(novoStatusStr.toUpperCase());

            if (StatusTarefa.CONCLUIDA.equals(novoStatus)) {
                tarefa.setDataConclusao(LocalDateTime.now());
            } else {
                tarefa.setDataConclusao(null);
            }

            tarefa.setStatus(novoStatus);

            return tarefaRepository.save(tarefa);

        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Status '" + novoStatusStr + "' é inválido.");
        }
    }

    public Tarefa findById(Long id) {
        return tarefaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tarefa não encontrada com ID: " + id));
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