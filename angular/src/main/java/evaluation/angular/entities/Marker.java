package evaluation.angular.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Table(name = "markers")
@Entity
public class Marker {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@Column(name = "lat")
	private Float lat;

	@Column(name = "lng")
	private Float lng;
	
	@Column(name = "temp")
	private Float temp;
	
	@Column(name = "picture")
	private String picture;

	public Marker() {
	}

	public Marker(Float lat, Float lng, Float temp, String picture) {
		this.lat = lat;
		this.lng = lng;
		this.temp = temp;
		this.picture = picture;
	}

	public Marker(Float lat, Float lng, Float temp) {
		this.lat = lat;
		this.lng = lng;
		this.temp = temp;
	}

	public Marker(Float lat, Float lng) {
		this.lat = lat;
		this.lng = lng;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Float getLat() {
		return lat;
	}

	public void setLat(Float lat) {
		this.lat = lat;
	}

	public Float getLng() {
		return lng;
	}

	public void setLng(Float lng) {
		this.lng = lng;
	}

	public Float getTemp() {
		return temp;
	}

	public void setTemp(Float temp) {
		this.temp = temp;
	}

	public String getPicture() {
		return picture;
	}

	public void setPicture(String picture) {
		this.picture = picture;
	}

}
