package evaluation.angular.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import evaluation.angular.entities.Temperature;

@Repository
public interface TemperatureRepository extends JpaRepository<Temperature, Long>{

}
