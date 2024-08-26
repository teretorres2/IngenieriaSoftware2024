<template>
  <b-container>
    <div class="row">
      <div class="col">
        <div 
          id="mapa" 
          class="map"
        >
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="form-group-inline">
          <label for="inpDireccion" class="form-label"
            >Ingrese una direccion o seleccione una en el mapa</label
          >
          <div class="row">
            <div class="col">
              <input
                type="text"
                id="inpDireccion"
                class="form-control"
                v-model="ubicacion.address"
                @change="actualizarMapa"
                placeholder="dirección"
              />
            </div>
            <div class="col">
              <input
                type="text"
                id="inpReferencia"
                class="form-control"
                v-model="ubicacion.referencia"
                placeholder="Referencia"
              />
            </div>
          </div>
        </div>
        <button
          class="btn btn-primary mt-2 justify-content-end"
          @click="confirm"
        >
          Confirmar
        </button>
      </div>
    </div>
  </b-container>
</template>

<script>
import { Loader } from "@googlemaps/js-api-loader";

var mapas = null;

const loader = new Loader({
  apiKey: "AIzaSyASkUApbaZgR3uWfHqUcLE9riKgVzFPQHA",
  version: "weekly",
});
export default {
  name: "MapaUbicacion",
  props: {
    ubicacionParam: Object,
  },
  data() {
    return {
      mapas: mapas,
      ubicacion: {
        lat: "",
        lng: "",
        address: "",
        referencia: "",
      },
    };
  },
  methods: {
    actualizarMapa: function () {
      var $_app = this;
      $_app.mapas.searchAddress($_app.ubicacion.address, function (result) {
        if (result.IsSuccess) {
          onMapClick(result.lat, result.lng),
            $_app.mapas.setCenter(result.lat, result.lng);
          $_app.ubicacion = result;
        }
      });
    },
    confirm: function () {
      this.$emit("locationready", this.ubicacion);
    },
  },
  mounted: function () {
    var $_app = this;
    $_app.ubicacion = $_app.ubicacionParam;
    
    loader.load().then(function () {
      $_app.mapas = new GoogleMapProvider(google); // eslint-disable-line
      $_app.mapas.iniMap("mapa", $mapDefaultSettings, null);
      if ($_app.ubicacion.address && $_app.ubicacion.address.length) {
        $_app.actualizarMapa();
      }
    });
  },
  watch: {
    mapas: function (newVal) {
      window.mapas = newVal;
    },
    address: function (newVal) {
      this.ubicacion.address = newVal;
    },
  },
};

function onMapClick(lat, long) {
  var mapas = window.mapas;
  mapas.removeMarkers();
  mapas.setCenter(lat, long);
  var $markerDefaultSettings = {
    // eslint-disable-line
    iconUrl: "",
    draggable: true,
    title: "",
    infoWindowHtml: "", //si esta definido, se dibuja un info window en el click del marcador
    onClick: null, //function (lat, lng) {},
    onDragStart: null, //function (lat, lng) {},
    onDragging: null, //function (lat, lng) {},
    onDragStop: onMapClick, //function (lat, lng) {}
  };

  mapas.searchPoint(lat, long, function (address) {
    var el = document.getElementById("inpDireccion");
    el.value = address;
    el.dispatchEvent(new Event("input"));
  });
  mapas.createMarker(lat, long, $markerDefaultSettings, onSuccessMarkerCreated);
}

function onSuccessMarkerCreated(marker) {
  console.log(marker);
}

var $mapDefaultSettings = {
  // eslint-disable-line
  mapType: 0,
  centerLat: -31.416651238629327,
  centerLng: -64.19285774230957,
  zoom: 15,
  onMapClick: onMapClick, //function (lat, lng) {},
};

function GoogleMapProvider(google) {
  var map;
  var markers = [];
  var geocoder;
  var directionsService;
  var directionsDisplay;

  var searchReturn = {
    IsSuccess: false,
    lat: "",
    lng: "",
    address: "",
  };

  this.iniMap = iniMap;
  this.searchAddress = searchAddress;
  this.searchPoint = searchPoint;
  this.createMarker = createMarker;
  this.setCenter = setCenter;
  this.setZoom = setZoom;
  this.removeMarker = removeMarker;
  this.removeMarkers = removeMarkers;
  this.createCircle = createCircle;
  this.createPolyLine = createPolyLine;
  this.calculateDistance = calculateDistance;

  //INICIALIZAR MAPA
  function iniMap(controlId, options, callback) {
    var centerLat = -31.416651238629327;
    var centerLng = -64.19285774230957;
    var zoom = 13;
    var mapTypeId = 0;
    var center;

    //CENTRO
    if (
      options != undefined &&
      typeof options.centerLat !== "undefined" &&
      options.centerLat != null &&
      typeof options.centerLng !== "undefined" &&
      options.centerLng != null
    ) {
      center = new google.maps.LatLng(options.centerLat, options.centerLng);
    } else {
      center = new google.maps.LatLng(centerLat, centerLng);
    }

    //ZOOM
    if (
      options != undefined &&
      typeof options.zoom !== "undefined" &&
      options.zoom != null
    ) {
      zoom = options.zoom;
    }

    //MAP TYPE
    if (
      options != undefined &&
      typeof options.mapType !== "undefined" &&
      options.mapType != null
    ) {
      if (options.mapType == 0) mapTypeId = google.maps.MapTypeId.ROADMAP;
      else mapTypeId = google.maps.MapTypeId.SATELLITE;
    }

    //OPCIONES
    var mapOptions = {
      zoom: zoom,
      center: center,
      streetViewControl: false,
      mapTypeId: mapTypeId,
    };

    //INICIAR MAPA
    map = new google.maps.Map(document.getElementById(controlId), mapOptions);

    //MAP EVENT CLICK
    if (options != undefined && options.onMapClick instanceof Function) {
      map.addListener("click", function (e) {
        options.onMapClick(e.latLng.lat(), e.latLng.lng());
      });
    }

    //COMPROBAR MAPA
    if (map == null || map == undefined) {
      alert("Se necesita acceso a internet para poder utilizar el mapa");
      return;
    } else {
      if (callback)
        setTimeout(function () {
          callback();
        }, 1000);
    }
  }

  //BUSCAR POR DIRECCION
  function searchAddress(address, callback) {
    if (geocoder) {
      if (callback) {
        searchReturn.IsSuccess = false;
        searchReturn.lat = null;
        searchReturn.lng = null;
        searchReturn.address = "";

        geocoder.geocode({ address: address }, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            var latlng = results[0].geometry.location;
            searchReturn.IsSuccess = true;
            searchReturn.lat = latlng.lat();
            searchReturn.lng = latlng.lng();
            searchReturn.address = results[0].formatted_address;
          }
          callback(searchReturn);
        });
      }
    } else {
      geocoder = new google.maps.Geocoder();
      searchAddress(address, callback);
    }
  }

  //BUSCAR POR PUNTO
  function searchPoint(lat, lng, callback) {
    if (geocoder) {
      geocoder.geocode(
        {
          latLng: new google.maps.LatLng(lat, lng),
        },
        function (results, status) {
          var address = "";
          if (status == google.maps.GeocoderStatus.OK)
            address = results[0].formatted_address;

          if (callback) callback(address);
        }
      );
    } else {
      geocoder = new google.maps.Geocoder();
      searchPoint(lat, lng, callback);
    }
  }

  //CREAR UN MARCADOR
  function createMarker(lat, lng, options, callback) {
    var markerOpcions = {
      position: new google.maps.LatLng(lat, lng),
      map: map,
    };

    //ICON
    if (
      options != undefined &&
      typeof options.iconUrl !== "undefined" &&
      options.iconUrl != null &&
      options.iconUrl != ""
    ) {
      markerOpcions.icon = options.iconUrl;
    }

    //DRAGGABLE
    markerOpcions.draggable = false;
    if (
      options != undefined &&
      typeof options.draggable !== "undefined" &&
      options.draggable != null
    ) {
      markerOpcions.draggable = options.draggable;
    }

    //TITLE
    if (
      options != undefined &&
      typeof options.title !== "undefined" &&
      options.title != null &&
      options.title != ""
    ) {
      markerOpcions.title = options.title;
    }

    var marker = new google.maps.Marker(markerOpcions);
    markers.push(marker);

    //EVENTOS
    if (
      options != undefined &&
      (options.onClick instanceof Function || options.infoWindowHtml != "")
    ) {
      if (options.infoWindowHtml != "") {
        var infowindow = new google.maps.InfoWindow({
          content: options.infoWindowHtml,
        });
      }

      google.maps.event.addListener(marker, "click", function () {
        if (options.onClick instanceof Function)
          options.onClick(this.position.lat(), this.position.lng());

        if (infowindow != undefined && infowindow != null)
          infowindow.open(map, marker);
      });
    }
    if (options != undefined && options.onDragStart instanceof Function) {
      google.maps.event.addListener(marker, "dragstart", function () {
        options.onDragStart(this.position.lat(), this.position.lng());
      });
    }
    if (options != undefined && options.onDragging instanceof Function) {
      google.maps.event.addListener(marker, "drag", function () {
        options.onDragging(this.position.lat(), this.position.lng());
      });
    }
    if (options != undefined && options.onDragStop instanceof Function) {
      google.maps.event.addListener(marker, "dragend", function () {
        options.onDragStop(this.position.lat(), this.position.lng());
      });
    }

    if (callback) callback(marker);
  }

  //CENTRAR MAPA
  function setCenter(lat, lng) {
    var center = new google.maps.LatLng(lat, lng);
    map.setCenter(center);
  }

  //ZOOM
  function setZoom(zoom) {
    map.setZoom(zoom);
  }

  //ELIMINAR UN MARCADOR
  function removeMarker(marker) {
    marker.setMap(null);

    //falta ver como se elimina del array
  }

  //ELIMINAR TODOS LOS MARCADORES
  function removeMarkers() {
    for (var i = 0; i < markers.length; i++) markers[i].setMap(null);
    markers = [];
  }

  //CREA UN CIRCULO
  function createCircle(lat, lng, km, lineColor) {
    var circleRadius = km;

    var circlePoints = Array();

    var d = circleRadius / 6378.8; // radians

    var lat1 = (3.141592 / 180) * lat; // radians
    var lng1 = (3.141592 / 180) * lng; // radians

    for (var a = 0; a < 361; a++) {
      var tc = (3.141592 / 180) * a;
      var y = Math.asin(
        Math.sin(lat1) * Math.cos(d) +
          Math.cos(lat1) * Math.sin(d) * Math.cos(tc)
      );
      var dlng = Math.atan2(
        Math.sin(tc) * Math.sin(d) * Math.cos(lat1),
        Math.cos(d) - Math.sin(lat1) * Math.sin(y)
      );
      var x = ((lng1 - dlng + 3.141592) % (2 * 3.141592)) - 3.141592; // MOD function
      var point = new google.maps.LatLng(
        parseFloat(y * (180 / 3.141592)),
        parseFloat(x * (180 / 3.141592))
      );
      circlePoints.push(point);
    }

    if (
      typeof lineColor === "undefined" ||
      lineColor == null ||
      lineColor == ""
    )
      lineColor = "#FE9A2E";

    var circle = new google.maps.Polygon({
      paths: circlePoints,
      strokeColor: lineColor,
      strokeOpacity: 1,
      strokeWeight: 2,
      fillColor: "#transparent",
      fillOpacity: 0.03,
    });

    circle.setMap(map);
  }

  //CREA UN POLYLINE
  function createPolyLine(jsonPoints, lineColor) {
    if (
      typeof lineColor === "undefined" ||
      lineColor == null ||
      lineColor == ""
    )
      lineColor = "#006600";

    var polyline = new google.maps.Polyline({
      path: jsonPoints,
      geodesic: true,
      strokeColor: lineColor,
      strokeOpacity: 0.8,
      strokeWeight: 3,
    });

    polyline.setMap(map);
  }

  //CALCULA DISTANCIA ENTRE DOS PUNTOS
  function calculateDistance(
    startLat,
    starLng,
    endLat,
    endLng,
    showRoute,
    callback
  ) {
    directionsService = new google.maps.DirectionsService();

    var start = new google.maps.LatLng(startLat, starLng);
    var end = new google.maps.LatLng(endLat, endLng);

    var request = {
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode.WALKING,
    };

    directionsService.route(request, function (result, status) {
      var distance = "";
      if (status == google.maps.DirectionsStatus.OK) {
        if (showRoute) {
          if (directionsDisplay != null) {
            directionsDisplay.setMap(null);
            directionsDisplay = null;
          }
          directionsDisplay = new google.maps.DirectionsRenderer();
          directionsDisplay.setMap(map);
          directionsDisplay.setOptions({ suppressMarkers: true });
          directionsDisplay.setDirections(result);
        }
        distance = Math.round(result.routes[0].legs[0].distance.value);
      }

      if (callback) callback(distance);
    });
  }
}
</script>

<style scoped>
.map {
  height: 400px;
}
</style>