package evaluation.angular.entities;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

//@Table(name = "temperatures")
@Entity
public class Temperature {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
    private Long id;
	
	@Column(name="temp")
	private Float temp;
	
	@Column(name="feels_like")
	private Float feels_like;
	
	@Column(name="temp_min")
	private Float temp_min;
	
	@Column(name="temp_max")
	private Float temp_max;
	
	@Column(name="pressure")
	private Integer pressure;
	
	@Column(name="humidity")
	private Integer humidity;
	
	@Column(name="timestamp")
	private LocalDateTime timestamp;
	
	@OneToOne
    @JoinColumn(name = "position_id", referencedColumnName = "id")
    private Position position;

	public Temperature() {
	}

	public Temperature(Float temp, Float feels_like, Float temp_min, Float temp_max, Integer pressure,
			Integer humidity, LocalDateTime timestamp, Position position) {
		this.temp = temp;
		this.feels_like = feels_like;
		this.temp_min = temp_min;
		this.temp_max = temp_max;
		this.pressure = pressure;
		this.humidity = humidity;
		this.timestamp = timestamp;
		this.position = position;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Float getTemp() {
		return temp;
	}

	public void setTemp(Float temp) {
		this.temp = temp;
	}

	public Float getFeels_like() {
		return feels_like;
	}

	public void setFeels_like(Float feels_like) {
		this.feels_like = feels_like;
	}

	public Float getTemp_min() {
		return temp_min;
	}

	public void setTemp_min(Float temp_min) {
		this.temp_min = temp_min;
	}

	public Float getTemp_max() {
		return temp_max;
	}

	public void setTemp_max(Float temp_max) {
		this.temp_max = temp_max;
	}

	public Integer getPressure() {
		return pressure;
	}

	public void setPressure(Integer pressure) {
		this.pressure = pressure;
	}

	public Integer getHumidity() {
		return humidity;
	}

	public void setHumidity(Integer humidity) {
		this.humidity = humidity;
	}

	public Position getPosition() {
		return position;
	}

	public void setPosition(Position position) {
		this.position = position;
	}

	public LocalDateTime getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(LocalDateTime timestamp) {
		this.timestamp = timestamp;
	}
	
	
	
}
