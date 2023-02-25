package evaluation.angular.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import evaluation.angular.entities.Marker;
import evaluation.angular.services.MarkerService;

@RestController
@RequestMapping("/mark")
@CrossOrigin("http://localhost:4200")
public class MarkerApi {

	private MarkerService markerService;

	public MarkerApi(MarkerService markerService) {
		this.markerService = markerService;
	}
	
	@GetMapping("/all")
	public List<Marker> allMarkers(){
		return markerService.allMarkers();
	}
	
	@PostMapping("/add")
	public Marker addMarker(@RequestBody Marker marker){
		return markerService.addMarker(marker);
	}
}
