import { Component } from '@angular/core';
import { Map, AnySourceImpl } from 'mapbox-gl';
import { MapService } from '../map.service';
import { CustomFeatureCollection, CustomGeoJson } from '../map';
import { environment } from 'src/environments/environment.development';
import { FeatureCollection } from 'geojson';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { Mark } from '../mark';
import { HttpClient } from '@angular/common/http';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.css'],
})
export class MapBoxComponent {
  map!: Map; // la carte
  style: string = 'mapbox://styles/mapbox/satellite-v9'; // style de la carte
  lat: number = 46.2276; // latitude à l'initialisation
  lng: number = 2.2137; // longitude à l'initialisation
  message: string = ''; // message à afficher sous le marqueur

  source: any; // source pour créer un marqueur (image)
  markers: CustomGeoJson[] = []; // liste des marqueurs

  iconId: string = '10d'; // icône représentant la météo
  sourceId: string = 'weather'; // nom par défaut de la source de données
  layerId: string = 'weather-layer'; // nom par défaut du layer

  place: any; // récupération des données météo par coordonnées par clic
  data: any // récupération des données météo par coordonnées par clic

  // état initial du bouton
  toggleButtonState: string = 'weather';
  // couleurs de marqueur disponibles
  colors = [
    'blue',
    'gray',
    'green',
    'orange',
    'pink',
    'purple',
    'red',
    'yellow',
  ];

  constructor(
    private http: HttpClient,
    private mapService: MapService,
    private weatherService: WeatherService) { }

  ngOnInit() {
    // zoom sur la localisation de l'utilisateur
    this.initializeMap();
    // récupération des marqueurs enregistrés en base de données
    this.loadMarkers();
  }

  // lorsque le bouton change d'état
  onToggleChange() {
    if (this.toggleButtonState == 'weather') {
      this.iconId = '10d';
      return;
    }

    const random_number = Math.floor(Math.random() * this.colors.length);
    this.iconId = this.colors[random_number];
  }

  loadMarkers(): void {
    // Appel du service pour faire une requête HTTP
    this.mapService.getMarkers().subscribe((data: Mark[]) => {
      for (let i = 0; i < data.length; i++) {
        const coordinates: [number, number] = [
          data[i].lng,
          data[i].lat,
        ]
        const newMarker = new CustomGeoJson(coordinates, {
          message: data[i].city_ascii + ' (' + data[i].country + ') ' + data[i].temp + '°C',
          image: data[i].picture,
        });
        newMarker.id = data[i].id;
        this.markers.push(newMarker);
        this.setMarkers;
        this.loadImage;
      }
      // Je ne sais pas si les deux lignes suivantes sont nécessaires mais le marker ne s'affiche pas
      // this.loadImage();
      //this.setMarkers();
    });
  }

  setMarkers(): void {
    // Mise à jour des données
    const features = new CustomFeatureCollection(this.markers);
    this.source.setData(features);
  }

  private initializeMap(): void {
    // Demande de localisation de l'utilisateur
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        // La fonction flyTo permet de se rendre à une destination
        // avec un effet de dézoom suivi d'un zoom
        this.map.flyTo({
          center: [this.lng, this.lat],
        });
      });
    }
    // création de la carte
    this.buildMap();
  }

  buildMap() {
    // instance d'une carte
    this.map = new Map({
      // stocké dans le fichier environments/environment.development.ts
      accessToken: environment.mapbox.accessToken,
      container: 'map', // référence à la div dans le document HTML
      style: this.style,
      zoom: 13,
      center: [this.lng, this.lat],
    });

    // attente du chargement de la carte avant
    // d'effectuer quoi que ce soit
    this.map.on('load', () => {
      this.createSource();
      this.createLayer();
      // pour chaque clic sur la carte
      this.map.on('click', (event) => {
        // récupération des coordonées du clic
        const coordinates: [number, number] = [
          event.lngLat.lng,
          event.lngLat.lat,
        ];

        // création d'un nouveau marqueur Mark
        var mark: Mark = {
          temp: 0,
          lng: coordinates[0],
          lat: coordinates[1],
          picture: '',
          country: '',
          city_ascii: ''
        }

        // récupération de la météo à cette localisation
        this.weatherService.getWeatherFromCoords(coordinates[1], coordinates[0]).subscribe({
          next: (data) => {
            const {
              // feels_like: feelsLike,
              // humidity,
              // pressure,
              temp,
              // temp_max: tempMax,
              // temp_min: tempMin,
            } = data.main;

            mark.city_ascii = data.name;
            mark.temp = (temp - 273.15);
            mark.picture = data.weather[0].icon;
            mark.country = data.sys.country;
          },
          complete: () => {
            console.log('Marqueur créé : ');
            console.log(mark);
            // Enregistrement du marqueur en bdd
            console.log('Tentative d enregistrement du marqueur en bdd...');
            this.mapService.addMark(mark).subscribe(response =>
              console.log(response));
          }
        });

        // création d'un nouveau marqueur CustomGeoJson
        const newMarker = new CustomGeoJson(coordinates, {
          message: mark.city_ascii + ' (' + mark.country + ') ' + mark.temp + '°C',
          image: mark.picture,
        });
        newMarker.id = mark.id;
        this.markers.push(newMarker);

        // Chargement de l'image du marqueur
        this.loadImage();
        // Ajout du marqueur sur la carte
        this.setMarkers();

        // // Méthode de Jacques
        // // ajout du marqueur en base de données
        // this.mapService.createMarker(newMarker).subscribe((data) => {
        //   this.markers.push(data);
        //   // Chargement de l'image du marqueur
        //   this.loadImage();
        //   // Ajout du marqueur sur la carte
        //   this.setMarkers();
        // });


      });
    });

  }

  createLayer() {
    // ajout d'une couche permettant d'afficher le marqueur (l'image) sur la carte
    console.log('Creating layer', this.layerId);
    this.map.addLayer({
      id: this.layerId,
      type: 'symbol',
      source: this.sourceId, // référence à la source de données
      layout: {
        'icon-image': '{image}',
        'text-field': '{message}',
        'text-size': 12,
        'text-offset': [0, 2.5],
        'icon-offset': [-1, -2.5],
      },
      paint: {
        'text-color': '#f16624',
        'text-halo-color': '#fff',
        'text-halo-width': 2,
      },
    });
  }

  createSource() {
    // création des données nécessaires au placement de l'image
    const feature = new CustomFeatureCollection([]);

    // création d'une source permettant par la suite le placement de l'image
    this.map.addSource(this.sourceId, {
      type: 'geojson',
      data: feature as FeatureCollection,
    });

    this.source = this.map.getSource(this.sourceId);
    // même idée que les lignes précédentes
    // sauf que le contenu est décortiqué
    /*
    this.map.addSource('src' + geoJson.id, {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {
              message: this.message,
            },
            geometry: {
              type: 'Point',
              coordinates: [this.lng, this.lat],
            },
          },
        ],
      },
    });
    */
  }

  loadImage() {
    let url: string = `http://openweathermap.org/img/wn/${this.iconId}@2x.png`;

    if (this.toggleButtonState == 'classical') {
      url = `assets/marker-icons/mapbox-marker-icon-20px-${this.iconId}.png`;
    }

    // Vérification si l'image est déjà chargée ou non
    if (this.map.hasImage(this.iconId)) return;

    // téléchargement de l'image
    this.map.loadImage(
      // `assets/marker-icons/mapbox-marker-icon-20px-${color}.png`,
      url,
      (error, image) => {
        if (error) throw error;

        this.map.addImage(this.iconId, image!);
      }
    );
  }

  // suppression du marqueur de la base de données et de la carte
  removeMarker(marker: CustomGeoJson) {
    this.mapService.removeMarker(marker.id).subscribe(() => {
      this.markers = this.markers.filter(
        (m: CustomGeoJson) => m.id !== marker.id
      );
      this.setMarkers();
    });
  }

  // déplacement vers un marqueur
  flyTo(data: CustomGeoJson) {
    this.map.flyTo({
      center: data.geometry.coordinates,
    });
  }
}
