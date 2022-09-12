import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { device } from "./styling/devices";
import Map from "./Map";
import "./App.css";

const InfoPanel = styled.div`
  font-family: "Quattrocento", serif;
  position: absolute;
  top: 2rem;
  left: 2rem;
  right: 2rem;
  background: white;
  z-index: 1;
  display: flex;
  padding: 1rem;
  border-radius: 0.2rem;
`;

const C4MSInfo = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const App = () => {
  return (
    <div>
      <InfoPanel style={{}}>
        <C4MSInfo>
          <span>Ein Projekt von</span>
          <img
            src="https://codeformuenster.org/img/cfm_logo.png"
            style={{ height: "2rem" }}
          ></img>
        </C4MSInfo>
        <div style={{ flexGrow: 3 }}>Legende...</div>
      </InfoPanel>
      <Map />
    </div>
  );
};

export default App;
