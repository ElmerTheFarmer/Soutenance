package evaluation.angular.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
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
	
	@GetMapping("/position-id")
	public Position getPosById(@RequestParam Long id){
		return posServ.getById(id);
		
	}
	
	@GetMapping("/positions-city")
	public List<Position> getPosByCity(@RequestParam String city){
		return posServ.getByCity(city);
		
	}
	
	@GetMapping("/position-city")
	public Position getOneByCity(@RequestParam String city){
		return posServ.getOneByCity(city);
		
	}
	
	@GetMapping("/positions-country")
	public List<Position> getPosByCountry(@RequestParam String country){
		return posServ.getByCountry(country);
		
	}
	
	@GetMapping("/position-country")
	public Position getOneByCountry(@RequestParam String country){
		return posServ.getOneByCountry(country);
		
	}
	
	@GetMapping("/findposition")
	public Position getPosByCityAndCountry(@RequestParam String city, @RequestParam String country){
		return posServ.getByCityAndCountry(city, country);
	}
	
	@GetMapping("/position-coord")
	public Position getPosByCoordinates(@RequestParam Float lat, @RequestParam Float lng){
		return posServ.getByCoordinates(lat, lng);
		
	}
	
	@PostMapping("/add-position")
	public Position addPosition(@RequestBody Position position) {
		return posServ.addPosition(position);
	}
	
	@PutMapping("/modify-position")
	public Position updatePosition(@RequestParam Long id, @RequestBody Position position) {
		return posServ.updatePosition(id, position);
	}
	
	@DeleteMapping("/delete")
	public void deleteById(@RequestParam Long id) {
		posServ.deleteById(id);
	}
	
	@DeleteMapping("/delete-pos")
	public void deletePosition(@RequestBody Position position) {
		posServ.delete(position);
	}

}
