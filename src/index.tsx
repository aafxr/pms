import './css/reset.css'
import './css/index.css';


import React from 'react';
import {Provider} from "react-redux";
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import {store} from "./redux";
import App from './App';
import {AppContextProvider} from "./contexts/AppContextProvider";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <AppContextProvider>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </AppContextProvider>
    </Provider>
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register({
    onUpdate: () => window.location.reload()
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
