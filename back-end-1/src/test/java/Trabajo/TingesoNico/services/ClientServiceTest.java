package Trabajo.TingesoNico.services;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;
import Trabajo.TingesoNico.entities.ClientEntity;
import Trabajo.TingesoNico.repositories.ClientRepository;
import Trabajo.TingesoNico.services.ClientService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;


class ClientServiceTest {

    @Mock
    private ClientRepository clientRepository;

    @InjectMocks
    private ClientService clientService;
    private ClientEntity client;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        client = new ClientEntity();
        client.setRut("12.345.678-9");
        client.setName("Juan Perez");
        client.setSalary(500000);
        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
            Date birthdate = dateFormat.parse("01-01-1990");
            client.setBirthdate(birthdate);
        } catch (ParseException e) {
            e.printStackTrace();
        }

    }


    @Test
    void testGetClients() {
        //Test data configuration
        List<ClientEntity> clients = new ArrayList<>();
        clients.add(new ClientEntity(1, "12345678-9", "Nicolo", 500000, new Date()));
        clients.add(new ClientEntity(2, "98765432-1", "martin", 450000, new Date()));

        // Configure simulated repository behavior
        when(clientRepository.findAll()).thenReturn(clients);

        // call the method
        ArrayList<ClientEntity> result = clientService.getClients();

        // Verify results
        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals("12345678-9", result.get(0).getRut());
        assertEquals("98765432-1", result.get(1).getRut());

        // Verify that the repository was called once
        verify(clientRepository, times(1)).findAll();
    }

    @Test
    void testSaveClient_SuccessfulSave() {
        ClientEntity client = new ClientEntity(0, "12345678-9", "Nicolas Garcia", 500000, new Date());
        when(clientRepository.findByRut("12345678-9")).thenReturn(null);
        when(clientRepository.save(client)).thenReturn(client);

        ClientEntity savedClient = clientService.saveClient(client);
        assertNotNull(savedClient);
        assertEquals("12345678-9", savedClient.getRut());
    }

    @Test
    void testSaveClient_ClientAlreadyExists() {
        ClientEntity client = new ClientEntity(0, "12345678-9", "Nicolas Garcia", 500000, new Date());
        when(clientRepository.findByRut("12345678-9")).thenReturn(client);

        RuntimeException exception = assertThrows(RuntimeException.class, () -> clientService.saveClient(client));
        assertEquals("There is already an user with that rut", exception.getMessage());
    }


    @Test
    public void testLogin_Success() {
        when(clientRepository.findByRutAndName("12.345.678-9", "Juan Perez")).thenReturn(Optional.of(client));

        Optional<ClientEntity> result = clientService.login("12.345.678-9", "Juan Perez");

        assertTrue(result.isPresent(), "The client should be present");
        assertEquals(client, result.get(), "The provided client should be de expected");

        verify(clientRepository).findByRutAndName("12.345.678-9", "Juan Perez");
    }

    @Test
    public void testLogin_Failure() {

        when(clientRepository.findByRutAndName("12.345.678-9", "Incorrect name")).thenReturn(Optional.empty());

        Optional<ClientEntity> result = clientService.login("12.345.678-9", "Incorrect name");

        assertTrue(result.isEmpty(), "The client should not be present");

        verify(clientRepository).findByRutAndName("12.345.678-9", "Incorrect name");
    }

}

