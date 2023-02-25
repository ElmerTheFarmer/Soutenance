package evaluation.angular.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import evaluation.angular.entities.Marker;

public interface MarkerRepository extends JpaRepository<Marker, Long>{

}
