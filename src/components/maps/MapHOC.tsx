import { Wrapper } from "@googlemaps/react-wrapper";
import React, { useEffect, useRef, useState } from "react";
import GoogleMap from "./GoogleMap";
import { GOOGLE_MAPS_API_KEY } from "../../evn.var.config";
import { Marker } from "./Marker";
import { Autocomplete, TextField } from "@mui/material";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import ErrorComponent from "../main/ErrorComponent";

type MapHOCProps = {
  center: google.maps.LatLngLiteral;
  markers: google.maps.MarkerOptions[];
  editable?: boolean;
  maxNumOfMarkers?: number;
  zoom?: number;
  style?: React.CSSProperties;
  updateMarkerArray?(markers: google.maps.MarkerOptions[]): void;
};

const MapHOC = ({
  center = { lng: 0, lat: 0 },
  markers,
  zoom = 15,
  style = { width: "500px", height: "300px" },
  editable,
  maxNumOfMarkers = 20,
  updateMarkerArray,
}: MapHOCProps) => {
  const [mapMarkers, setMarkers] =
    useState<google.maps.MarkerOptions[]>(markers);
  const [selected, setSelected] = useState<google.maps.LatLngLiteral>();
  const [error, setError] = useState<Error>();
  const {
    ready,
    value,
    setValue,
    suggestions: { data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const controlRef = useRef<HTMLDivElement>(null);
  const addMarker = (e: google.maps.MapMouseEvent) => {
    mapMarkers.length < maxNumOfMarkers
      ? setMarkers([
          ...mapMarkers,
          { position: { lat: e.latLng!.lat(), lng: e.latLng!.lng() } },
        ])
      : setError(new Error("Maximum number of markers. Remove some."));
  };

  useEffect(() => {
    setSelected(center);
  }, []);

  useEffect(() => {
    if (updateMarkerArray) updateMarkerArray(mapMarkers);
  }, [mapMarkers, updateMarkerArray]);

  const handleSelect = async (
    e: React.SyntheticEvent<Element, Event>,
    address: string | null
  ) => {
    if (address) {
      setValue(address, false);
      clearSuggestions();
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      setSelected({ lat, lng });
    }
  };

  const changeMarkerPosition = (
    index: number,
    newPosition: google.maps.LatLngLiteral
  ) => {
    if (newPosition !== mapMarkers[index].position) {
      const newMarkersArray = [...mapMarkers];
      newMarkersArray.splice(index, 1, {
        ...mapMarkers[index],
        position: newPosition,
      });
      setMarkers(newMarkersArray);
    }
  };

  const removeMarker = (index: number) => {
    if (editable) {
      const newMarkersArray = [...mapMarkers];
      newMarkersArray.splice(index, 1);
      setMarkers(newMarkersArray);
      setError(undefined);
    } else setError(new Error("You cannot edit this map"));
  };

  return (
    <Wrapper apiKey={GOOGLE_MAPS_API_KEY}>
      {error && <ErrorComponent error={error} />}
      <Autocomplete
        disabled={!ready}
        freeSolo
        inputValue={value}
        onChange={handleSelect}
        onInputChange={(e: any) => {
          setValue(e.target.value);
        }}
        options={data.map(({ place_id, description }) => description)}
        renderInput={(params) => (
          <TextField
            ref={controlRef}
            {...params}
            label="Search places"
            size="small"
            variant="filled"
            sx={{ maxWidth: "60%" }}
          />
        )}
      />
      <GoogleMap
        center={selected}
        zoom={zoom}
        style={style}
        onClick={editable ? addMarker : () => {}}
        controlRef={controlRef}
      >
        {mapMarkers.map((marker, index) => (
          <Marker
            key={index}
            {...marker}
            indexInArray={index}
            changeMarkerPosition={changeMarkerPosition}
            removeMarker={removeMarker}
          />
        ))}
      </GoogleMap>
    </Wrapper>
  );
};

export default MapHOC;
