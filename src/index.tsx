import React from 'react';
import {BrowserRouter as Router,} from "react-router-dom";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {AppProvider} from "./context/AppContext";
import {QueryProvider} from "./QueryClientProvider/QueryClientProvider";

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <AppProvider>
                <QueryProvider>
                <App/>
                </QueryProvider>
            </AppProvider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
