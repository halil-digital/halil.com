package com.halil.api.controller;

import com.halil.api.model.Client;
import com.halil.api.service.ClientService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clients")
public class ClientController {

    private final ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @GetMapping
    public ResponseEntity<?> getAllClients() {
        try {
            List<Client> clients = clientService.getAllClients();
            return ResponseEntity.ok(clients);
        } catch (Exception e) {
            ProblemDetail problemDetail = ProblemDetail.forStatus(HttpStatus.INTERNAL_SERVER_ERROR);
            problemDetail.setTitle("Error");
            problemDetail.setDetail(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(problemDetail);
        }
    }

    @PostMapping
    public ResponseEntity<?> createClient(@RequestBody Client client) {
        try {
            Client savedClient = clientService.createClient(client);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedClient);
        } catch (Exception e) {
            ProblemDetail problemDetail = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);
            problemDetail.setTitle("Error");
            problemDetail.setDetail(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(problemDetail);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteClient(@PathVariable Long id) {
        try {
            clientService.deleteClientById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            ProblemDetail problemDetail = ProblemDetail.forStatus(HttpStatus.NOT_FOUND);
            problemDetail.setTitle("Client not found");
            problemDetail.setDetail(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(problemDetail);
        }

    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateClient(@PathVariable Long id, @RequestBody Client updatedClient) {
        try {
            Client client = clientService.updateClient(id, updatedClient);
            return ResponseEntity.ok(client);
        } catch (Exception e) {
            ProblemDetail problemDetail = ProblemDetail.forStatus(HttpStatus.NOT_FOUND);
            problemDetail.setTitle("Erreur de mise à jour");
            problemDetail.setDetail(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(problemDetail);
        }
    }
}
