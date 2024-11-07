package Trabajo.TingesoNico.services;


import Trabajo.TingesoNico.entities.ClientEntity;
import Trabajo.TingesoNico.repositories.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class ClientService {

    @Autowired
    ClientRepository clientRepository;

    public ArrayList<ClientEntity> getClients(){
        return (ArrayList<ClientEntity>) clientRepository.findAll();
    }


    public ClientEntity saveClient(ClientEntity client) {
        if (clientRepository.findByRut(client.getRut()) != null) {
            throw new RuntimeException("There is already an user with that rut");
        }
        return clientRepository.save(client);
    }

    public Optional<ClientEntity> login(String rut, String name) {
        // Busca un cliente que coincida con el RUT y el nombre
        return clientRepository.findByRutAndName(rut, name);
    }

}
