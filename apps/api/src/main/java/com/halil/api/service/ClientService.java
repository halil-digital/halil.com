package com.halil.api.service;

import com.halil.api.model.Client;
import com.halil.api.repository.ClientRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientService {

    private final ClientRepository clientRepository;

    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    public Client createClient(Client client) {
        return clientRepository.save(client);
    }

    public void deleteClientById(Long id) {
        if (!clientRepository.existsById(id)) {
            throw new RuntimeException("Client with id " + id + " not found.");
        }
        clientRepository.deleteById(id);
    }

    public Client updateClient(Long id, Client updatedClient) {
        return clientRepository.findById(id).map(existingClient -> {
            existingClient.setName(updatedClient.getName());
            existingClient.setEmail(updatedClient.getEmail());
            existingClient.setPhone(updatedClient.getPhone());
            existingClient.setAddress(updatedClient.getAddress());
            return clientRepository.save(existingClient);
        }).orElseThrow(() -> new RuntimeException("Cannot found the client with this id : " + id));
    }
}
