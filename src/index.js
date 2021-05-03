import React from 'react';
import ReactDOM from 'react-dom';
import { firebaseApp, FieldValue } from './lib/firebase';
import App from './App';
import './styles/app.css';
import FirebaseContext from './context/FirebaseContext';


ReactDOM.render(
  <React.StrictMode>
  <FirebaseContext.Provider value={{firebaseApp, FieldValue}}>
    <App />
  </FirebaseContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


