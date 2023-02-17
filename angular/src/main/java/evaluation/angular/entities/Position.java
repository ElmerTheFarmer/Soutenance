package evaluation.angular.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Table(name = "worldcities")
@Entity
public class Position {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
    private Long id;
	
	@Column(name="city")
	private String city;
	
	@Column(name="city_ascii")
	private String city_ascii;
	
	@Column(name="lat")
	private Float lat;
	
	@Column(name="lng")
	private Float lng;
	
	@Column(name="country")
	private String country;
	
	@Column(name="iso2")
	private String iso2;

	public Position() {
	}

	public Position(String city, String city_ascii, Float lat, Float lng, String country, String iso2) {
		this.city = city;
		this.city_ascii = city_ascii;
		this.lat = lat;
		this.lng = lng;
		this.country = country;
		this.iso2 = iso2;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getCity_ascii() {
		return city_ascii;
	}

	public void setCity_ascii(String city_ascii) {
		this.city_ascii = city_ascii;
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

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getIso2() {
		return iso2;
	}

	public void setIso2(String iso2) {
		this.iso2 = iso2;
	}
	
}
