import React from "react";

import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { ShoppingBagIcon } from "@heroicons/react/solid";
import * as API from "../../api/api";
import * as Cookies from "../../api/cookies";
import MapMarker from "./MapMarker";
mapboxgl.accessToken =
  "pk.eyJ1IjoicmVndHg1IiwiYSI6ImNrdmIzOTVwMDA3eG8ydXFuN3k2NXB1eWoifQ.4Xn3731h5161xl5XOfLXUw";

export default function MapGallery({ products = [] }) {
  const [modal, setModal] = React.useState(false);
  const [selectedProduct, setselectedProduct] = React.useState(products[0]);


  const handleModal = (e) => {
    setModal(e);
  };
  const handleProduct = (e) => {
    setselectedProduct(e);
  };
  const mapContainer = React.useRef(null);
  const map = React.useRef(null);
  const [lat, setLat] = React.useState(48.85877);
  const [lng, setLng] = React.useState(2.2069522);
  const [zoom, setZoom] = React.useState(9);
  const [productsViewport, setproductsViewport] = React.useState([]);
  const coordinatesGeocoder = function (query) {
    // Match anything which looks like
    // decimal degrees coordinate pair.
    const matches = query.match(/^[ ]*(?:Lat: )?(-?\d+\.?\d*)[, ]+(?:Lng: )?(-?\d+\.?\d*)[ ]*$/i);
    if (!matches) {
      return null;
    }

    function coordinateFeature(lng, lat) {
      return {
        center: [lng, lat],
        geometry: {
          type: "Point",
          coordinates: [lng, lat],
        },
        place_name: "Lat: " + lat + " Lng: " + lng,
        place_type: ["coordinate"],
        properties: {},
        type: "Feature",
      };
    }

    const coord1 = Number(matches[1]);
    const coord2 = Number(matches[2]);
    const geocodes = [];

    if (coord1 < -90 || coord1 > 90) {
      // must be lng, lat
      geocodes.push(coordinateFeature(coord1, coord2));
    }

    if (coord2 < -90 || coord2 > 90) {
      // must be lat, lng
      geocodes.push(coordinateFeature(coord2, coord1));
    }

    if (geocodes.length === 0) {
      // else could be either lng, lat or lat, lng
      geocodes.push(coordinateFeature(coord1, coord2));
      geocodes.push(coordinateFeature(coord2, coord1));
    }

    return geocodes;
  };

  React.useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    for (const marker of products) {
      // Create a DOM element for each marker.

      const el = document.createElement("div");
      const width = 40;
      const height = 40;
      el.className = "marker";
      el.style.backgroundImage = `url(${marker.image[0]})`;
      el.style.width = `${width}px`;
      el.style.height = `${height}px`;
      el.style.borderRadius = "50%";
      el.style.backgroundSize = "100%";
      el.dataset.id = marker._id;
      el.addEventListener("click", () => {
        handleProduct(marker);
        handleModal(true);
      });

      if (marker.geocoding.latitude) {
        new mapboxgl.Marker(el)
          .setLngLat([marker.geocoding.longitude.$numberDecimal, marker.geocoding.latitude.$numberDecimal])
          .addTo(map.current);
      }
    }

    map.current.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        localGeocoder: coordinatesGeocoder,
        zoom: 4,
        placeholder: "Try: -40, 170",
        mapboxgl: mapboxgl,
        reverseGeocode: true,
      })
    );

    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true,
      })
    );
    setproductsViewport(getVisibleMarkers());
  });

  function intersectRect(r1, r2) {
    return !(r2.left > r1.right || r2.right < r1.left || r2.top > r1.bottom || r2.bottom < r1.top);
  }

  function getVisibleMarkers() {
    var cc = map.current.getContainer();
    var els = cc.getElementsByClassName("marker");
    var ccRect = cc.getBoundingClientRect();
    var visibles = [];
    for (var i = 0; i < els.length; i++) {
      var el = els.item(i);
      var elRect = el.getBoundingClientRect();
      intersectRect(ccRect, elRect) && visibles.push(el.dataset.id);
    }
    let x = [];
    if (visibles.length > 0) {
      visibles.forEach((el) => {
        x.push(products.find((o) => o._id === el));
      });
    }
    return x;
  }

  React.useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setproductsViewport(getVisibleMarkers());
    });
  }, []);
  return (
    <>
      <MapMarker open={modal} setOpen={handleModal} selectedProduct={selectedProduct}></MapMarker>
      <div className="w-full h-full flex sm:flex-col md:flex-col lg:flex-row coldirection">
        <div className="mt-20 w-full h-full">
          {productsViewport?.map((product, index) => (
            <div key={product._id} className="py-6 sm:flex" key={index}>
              <div className="flex space-x-4 sm:min-w-0 sm:flex-1 sm:space-x-6 lg:space-x-8 max-w-md">
                <img
                  src={product.image[0]}
                  alt=""
                  className="flex-none w-20 h-20 rounded-md object-center object-cover sm:w-48 sm:h-48"
                />
                <div className="pt-1.5 min-w-0 flex-1 sm:pt-0">
                  <h3 className="text-sm font-medium text-gray-900">
                    <a href={`/Product/${product._id}`}>{product.title}</a>
                  </h3>
                  <p className="text-sm text-gray-500 truncate">
                    <span>{product.color}</span>{" "}
                    <span className="mx-1 text-gray-400" aria-hidden="true">
                      &middot;
                    </span>{" "}
                    <span>{product.size}</span>
                  </p>
                  <p className="mt-1 font-medium text-gray-900">{product.price} €</p>
                </div>
              </div>
              <div className="mt-6 space-y-4 sm:mt-0 sm:ml-6 sm:flex-none sm:w-40"></div>
            </div>
          ))}
        </div>

        <div className="w-full h-full">
          {/* {map.mapApiLoaded && <SearchBox map={map.mapInstance} mapApi={map.mapApi} />} */}
          <div ref={mapContainer} className="map-container" />
        </div>
      </div>
    </>
  );
}
