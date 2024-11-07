package Trabajo.TingesoNico.repositories;

import Trabajo.TingesoNico.entities.ClientEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface ClientRepository extends JpaRepository<ClientEntity, Long> {
    public ClientEntity findById(int id);
    ClientEntity findByRut(String rut);
    Optional<ClientEntity> findByRutAndName(String rut, String name);
}
