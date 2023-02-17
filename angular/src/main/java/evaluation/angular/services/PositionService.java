package evaluation.angular.services;

import java.util.List;

import org.springframework.stereotype.Service;

import evaluation.angular.entities.Position;
import evaluation.angular.repositories.PositionRepository;
import jakarta.persistence.EntityNotFoundException;

@Service
public class PositionService {
	
	private PositionRepository posRepo;

	public PositionService(PositionRepository posRepo) {
		this.posRepo = posRepo;
	}
	
	public List<Position> getAll(){
		return this.posRepo.findAll();
	}
	
	public Position getById(Long id) {
		return this.posRepo.findById(id).get();
	}
	
	public List<Position> getByCity(String city) {
		return this.posRepo.findByCity(city);
	}
	public Position getOneByCity(String city) {
		return getByCity(city).get(0);
	}

	public List<Position> getByCountry(String country){
		return this.posRepo.findByCountry(country);
	}
	
	public Position getOneByCountry(String country) {
		return getByCountry(country).get(0);
	}
	
	public Position getByCityAndCountry(String city, String country) {
		List<Position> pays = getByCountry(country);
		for(Position p : pays) {
			if(p.getCity().equals(city)) {
				return p;
			}
		}
		throw new EntityNotFoundException("No entity found for city : " + city+" and pays : "+country);
		
	}
	
	public Position getByCoordinates(Float lat, Float lng) {
		List<Position> all = getAll();
		for(Position p : all) {
			if(p.getLat()==lat && p.getLng()==lng) {
				return p;
			}
		}
		throw new EntityNotFoundException("No entity found for coordinates lat : "+lat+" and long : "+lng);
	}
	
	public Position addPosition(Position position) {
		return this.posRepo.save(position);
	}
	
	public void deleteById(Long id) {
		this.posRepo.deleteById(id);
	}
	
	public void delete(Position position) {
		this.posRepo.delete(position);
	}
	
	public Position updatePosition(Long id, Position position) {
		position.setId(id);
		return this.posRepo.save(position);
	}
	
	
}
