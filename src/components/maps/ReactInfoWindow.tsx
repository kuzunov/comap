import { InfoWindow } from "@react-google-maps/api";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";

export default function InfoWindowEx(props:any) {
  const infoWindowRef = React.createRef<google.maps.InfoWindow>();
  const contentElement = document.createElement(`div`);
  useEffect(() => {
    ReactDOM.render(React.Children.only(props.children), contentElement);
    if(infoWindowRef.current){
        infoWindowRef.current.setContent(contentElement);
    }
  }, [props.children]);
  return <InfoWindow ref={infoWindowRef} {...props} />;
}