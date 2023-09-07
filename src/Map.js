import React, { useState, useEffect } from "react";
import DeckGL from "@deck.gl/react";
import { GeoJsonLayer } from "@deck.gl/layers";
import { StaticMap } from "react-map-gl";

// Initial viewport settings
const initialViewState = {
  longitude: 7.62,
  latitude: 51.96,
  zoom: 12,
  pitch: 0,
  bearing: 0
};

const linienFarben = {
  "1": [185, 206, 0],
  "2": [0, 135, 216],
  "4": [146, 197, 110],
  "5": [294, 217, 0],
  "6": [117, 34, 130],
  "7": [0, 117, 142],
  "8": [172, 110, 171],
  "9": [170, 120, 35],
  "10": [227, 4, 19],
  "11": [239, 124, 0],
  "12": [69, 113, 175],
  "13": [78, 150, 53],
  "14": [131, 208, 245],
  "15": [0, 117, 60],
  "17": [234, 91, 13],
  "22": [156, 15, 5],
  "33": [245, 181, 210],
  "34": [245, 181, 210]
};
const Map = () => {
  useEffect(() => {
    var connection = new WebSocket("wss://websocket.busradar.conterra.de/prod");

    // When the connection is open, send some data to the server
    connection.onopen = () => {
      console.log("Connection to WebSocket established");
    };

    // Log errors
    connection.onerror = error => {
      console.log("WebSocket Error ", error);
    };

    // Log messages from the server
    connection.onmessage = e => {
      const data = JSON.parse(e.data);
      _processNewehicles(data);
    };
    return () => connection.close();
  }, []);

  const [pointLayer, setPointLayer] = useState(new GeoJsonLayer());

  const [hoverEvent, setHoverEvent] = useState();

  const [vehicles, setVehicles] = useState();

  const _processNewehicles = data => {
    console.log(data);
    data.features.forEach(bus => {
      // remove vehicles with REMOVE operation
      if (bus.properties.operation === "REMOVE") {
        setVehicles(
          vehicles.filter(
            oldBus =>
              oldBus.properties.fahrtbezeichner !=
              bus.properties.fahrtbezeichner
          )
        );
        return;
      }
    });

    // add new vehicles

    // update vehicles

    // set point layer

    setPointLayer(
      new GeoJsonLayer({
        id: "geojson-layer",
        data: data,
        pickable: true,
        stroked: false,
        filled: true,
        getFillColor: d => linienFarben[d.properties.linientext],
        pointRadiusScale: 5,
        pointRadiusMinPixels: 5,
        onHover: info =>
          setHoverEvent({
            hoveredObject: info.object,
            pointerX: info.x,
            pointerY: info.y
          })
      })
    );
  };

  const _renderTooltip = () => {
    const { hoveredObject, pointerX, pointerY } = hoverEvent || {};
    return (
      hoveredObject && (
        <div
          style={{
            position: "absolute",
            backgroundColor: "white",
            padding: "1rem",
            borderRadius: "1rem",
            marginLeft: "1rem",
            fontFamily: "Hepta Slab",
            zIndex: 1,
            pointerEvents: "none",
            left: pointerX,
            top: pointerY
          }}
        >
          {hoveredObject.properties.linientext} ‣{" "}
          {hoveredObject.properties.richtungstext}
        </div>
      )
    );
  };

  return (
    <DeckGL
      initialViewState={initialViewState}
      controller={true}
      layers={[pointLayer]}
    >
      <StaticMap />
      {hoverEvent && _renderTooltip.bind(this)}
      {/* {_renderTooltip()} */}
    </DeckGL>
  );
};

export default Map;
