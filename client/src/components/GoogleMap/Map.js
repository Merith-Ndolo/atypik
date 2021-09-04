import React from "react";
import "../../style/Map.css";
import {
  InfoWindow,
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import Geocode from "react-geocode";
import { GoogleData } from "../../data/GoogleData";
Geocode.setApiKey("AIzaSyAtAsOVenmjEzpg_JiXjMglbFjEt3rPLr0");

const Map = ({ post }) => {
  let valLng;
  let valLat;
  let place;
  let zoom;

  {
    GoogleData.map((item, key) => {
      if (item.name === post.departement) {
        if (post.lng && post.lat) {
          return (
            <div key={key}>
              {(valLat = post.lat)}
              {(valLng = post.lng)}
              {(place = post.titre)}
              {(zoom = 16)}
            </div>
          );
        } else {
          return (
            <div key={key}>
              {(valLat = item.lat)}
              {(valLng = item.lng)}
              {(place = post.departement)}
              {(zoom = 6)}
            </div>
          );
        }
      }
    });
  }

  const MapWithAMarker = withScriptjs(
    withGoogleMap((props) => (
      <GoogleMap
        defaultZoom={zoom}
        defaultCenter={{ lat: valLat, lng: valLng }}
      >
        <Marker position={{ lat: valLat, lng: valLng }}>
          <InfoWindow>
            <div>{place}</div>
          </InfoWindow>
        </Marker>
      </GoogleMap>
    ))
  );

  return (
    <>
      <h3>Google Map</h3>
      <MapWithAMarker
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAtAsOVenmjEzpg_JiXjMglbFjEt3rPLr0&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
      {post.lng && post.lat && (
        <div>
          <br />
          Latitude : {valLat} <br />
          <br />
          Longitude : {valLng}
        </div>
      )}
    </>
  );
};

export default Map;
