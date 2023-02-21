package evaluation.angular.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import evaluation.angular.entities.Position;
import evaluation.angular.services.PositionService;


@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:4200")
public class PositionApi {
	
	private PositionService posServ;

	public PositionApi(PositionService posServ) {
		this.posServ = posServ;
	}
	
	@GetMapping("/positions")
	public List<Position> allPos(){
		return posServ.getAll();
		
	}
	
	@GetMapping("/countries")
	public List<Position> allCountries(){
		return posServ.getCountries();
		
	}
	
	@GetMapping("/position/{id}")
	public Position getPosById(@PathVariable Long id){
		return posServ.getById(id);
		
	}
	
	@GetMapping("/positions-city/{city}")
	public List<Position> getPosByCity(@PathVariable String city){
		return posServ.getByCity(city);
		
	}
	
	@GetMapping("/position-city/{city}")
	public Position getOneByCity(@PathVariable String city){
		return posServ.getOneByCity(city);
		
	}
	
	@GetMapping("/positions-country/{country}")
	public List<Position> getPosByCountry(@PathVariable String country){
		return posServ.getByCountry(country);
		
	}
	
	@GetMapping("/position-country/{country}")
	public Position getOneByCountry(@PathVariable String country){
		return posServ.getOneByCountry(country);
		
	}
	
	@GetMapping("/findposition/{country}/{city}")
	public Position getPosByCityAndCountry(@PathVariable String city, @PathVariable String country){
		return posServ.getByCityAndCountry(city, country);
	}
	
	@GetMapping("/position-coord/{lat}/{lng}")
	public Position getPosByCoordinates(@PathVariable Float lat, @PathVariable Float lng){
		return posServ.getByCoordinates(lat, lng);
		
	}
	
	@PostMapping("/add-position")
	public Position addPosition(@RequestBody Position position) {
		return posServ.addPosition(position);
	}
	
	@PutMapping("/modify-position/{id}")
	public Position updatePosition(@PathVariable Long id, @RequestBody Position position) {
		return posServ.updatePosition(id, position);
	}
	
	@DeleteMapping("/delete/{id}")
	public void deleteById(@PathVariable Long id) {
		posServ.deleteById(id);
	}
	
	@DeleteMapping("/delete-pos")
	public void deletePosition(@RequestBody Position position) {
		posServ.delete(position);
	}

}
