package evaluation.angular.services;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import evaluation.angular.entities.Marker;
import evaluation.angular.entities.Temperature;
import evaluation.angular.repositories.MarkerRepository;

@Service
public class MarkerService {

	private MarkerRepository markerRepository;

	public MarkerService(MarkerRepository markerRepository) {
		this.markerRepository = markerRepository;
	}

	public List<Marker> allMarkers() {
		return markerRepository.findAll();
	}
	
	public Marker addMarker(Marker marker) {
		return markerRepository.save(marker);
	}
}
