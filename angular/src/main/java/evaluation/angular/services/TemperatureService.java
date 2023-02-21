package evaluation.angular.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import evaluation.angular.entities.Position;
import evaluation.angular.entities.Temperature;
import evaluation.angular.repositories.TemperatureRepository;

@Service
public class TemperatureService {

	private TemperatureRepository tempRepo;

	public TemperatureService(TemperatureRepository tempRepo) {
		this.tempRepo = tempRepo;
	}
	
	public List<Temperature> allTemps(){
		return this.tempRepo.findAll();
	}
	
	public Temperature getTempById(Long id) {
		return this.tempRepo.findById(id).get();
	}
	
	public Temperature addTemp(Temperature temperature) {
		return this.tempRepo.save(temperature);
	}
	
	public void deleteById(Long id) {
		this.tempRepo.deleteById(id);
	}
	
	public void delete(Temperature temperature) {
		this.tempRepo.delete(temperature);
	}
	
	public Temperature updateTemp(Long id, Temperature temperature) {
		temperature.setId(id);
		return this.tempRepo.save(temperature);
	}
	
	public Temperature updateCoord(Long id, Position position) {
		Temperature temp = getTempById(id);
		temp.setPosition(position);
		return this.tempRepo.save(temp);
	}
	
	public Temperature updateDate(Long id, LocalDateTime date) {
		Temperature temp = getTempById(id);
		temp.setTimestamp(date);;
		return this.tempRepo.save(temp);
	}
	
	
}
