package backend.controller;

import backend.model.Tarefa;
import backend.service.TarefaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/tarefas")
@CrossOrigin(origins = "http://localhost:3000")
public class TarefaController {

    private final TarefaService tarefaService;

    public TarefaController(TarefaService tarefaService) {
        this.tarefaService = tarefaService;
    }

    @GetMapping
    public List<Tarefa> getAll() {
        return tarefaService.getAll();
    }

    @PostMapping
    public ResponseEntity<Tarefa> criar(@RequestBody Tarefa tarefa) {
        return ResponseEntity.ok(tarefaService.save(tarefa));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> atualizarStatus(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        try {
            String novoStatusStr = payload.get("status");
            // Apenas delega para o service cuidar da lógica
            Tarefa tarefaAtualizada = tarefaService.atualizarStatus(id, novoStatusStr);
            return ResponseEntity.ok(tarefaAtualizada);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        try {
            tarefaService.delete(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}