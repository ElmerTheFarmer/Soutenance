package evaluation.angular.controllers;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import evaluation.angular.entities.Position;
import evaluation.angular.entities.Temperature;
import evaluation.angular.services.TemperatureService;

@RestController
@RequestMapping("/temp")
@CrossOrigin("http://localhost:4200")
public class TemperatureApi {

	private TemperatureService tempServ;

	public TemperatureApi(TemperatureService tempServ) {
		this.tempServ = tempServ;
	}
	
	@GetMapping("/temperatures")
	public List<Temperature> allPos(){
		return tempServ.allTemps();
	}
	
	@GetMapping("/tempbyid/{id}")
	public Temperature getTempById(@PathVariable Long id){
		return tempServ.getTempById(id);
	}
	
	@PostMapping("/add-temp")
	public Temperature addTemperature(@RequestBody Temperature temperature) {
		return tempServ.addTemp(temperature);
	}
	
	@DeleteMapping("/deletebyid/{id}")
	public void deleteTempById(@PathVariable Long id) {
		tempServ.deleteById(id);
	}
	
	@DeleteMapping("/delete")
	public void deleteTemp(@RequestBody Temperature temperature) {
		tempServ.delete(temperature);
	}
	
	@PutMapping("/modify-temp/{id}")
	public Temperature updateTemp(@PathVariable Long id, @RequestBody Temperature temperature) {
		return tempServ.updateTemp(id, temperature);
	}
	
	@PatchMapping("/modify-coord/{id}")
	public Temperature updateCoords(@PathVariable Long id, @RequestBody Position position) {
		return tempServ.updateCoord(id, position);
	}
	
	@PatchMapping("/modify-date/{id}")
	public Temperature updateDate(@PathVariable Long id, @RequestBody LocalDateTime date) {
		return tempServ.updateDate(id, date);
	}
}
