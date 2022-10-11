import React, { useEffect, useState } from "react";
import InfoWindowEx from "./ReactInfoWindow";

export const Marker: React.FC<google.maps.MarkerOptions  
  & {
    indexInArray:number,
    changeMarkerPosition(i:number,p:google.maps.LatLngLiteral):void,
    removeMarker(i:number):void
  }>
   = (options) => {
    const [marker, setMarker] = React.useState<google.maps.Marker>();
    const {indexInArray,changeMarkerPosition,removeMarker} = options;
    
    useEffect(() => {
      if (!marker) {
        setMarker(new google.maps.Marker());
      }
  
      // remove marker from map on unmount
      return () => {
        if (marker) {
          marker.setMap(null);
        }
      };
    }, [marker]);
  
    useEffect(() => {
      if (marker) {
        marker.setOptions(options);
        marker.setClickable(true);
        marker.setDraggable(true);
        marker.addListener('dragend',() => {
          const newPosition = marker.getPosition();
          if(newPosition){
            const newPositionOptions = {
              lat: newPosition.lat(),
              lng: newPosition.lng()
            }
            changeMarkerPosition(indexInArray,newPositionOptions);
          }
        })
        marker.addListener('click', () => {
          marker.setMap(null);
          removeMarker(indexInArray);
        })
      }
    }, [marker, options]);
    
    return null;
  };