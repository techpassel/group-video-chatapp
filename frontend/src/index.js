import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './fonts/HyliaSerifBeta-Regular.otf';
import './fonts/VeganStylePersonalUse-5Y58.ttf';
import { SocketContextProvider } from './contexts/SocketContext';
import { WebRTCContextProvider } from './contexts/WebRTCContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <SocketContextProvider>
    <WebRTCContextProvider>
      <App />
    </WebRTCContextProvider>
  </SocketContextProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
