import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Event from './event';
import reportWebVitals from './reportWebVitals';
import Component2 from './twocomponents';
import Component5 from './sam5';
import Head1 from './head1';
import './event.css';
import Para from './event parameter';
import Condition from './condition';
import Ternary from './condition';
import Fruitslist from './list';
import App from './App';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <Head1 />
    <Component5 />
    <Component2 />
    <Event /><br/>
    <Para />
    <Condition />
    <Ternary />
    <Fruitslist />
      */}
    <App/>
    
     
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
