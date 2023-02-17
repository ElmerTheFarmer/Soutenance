package evaluation.angular.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import evaluation.angular.entities.Position;

@Repository
public interface PositionRepository extends JpaRepository<Position, Long> {
	
	List<Position> findByCity(String city);
	List<Position> findByCountry(String country);
	
}
