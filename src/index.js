import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './css/index.css';
import { App } from './components/App';
import * as serviceWorker from './serviceWorker';
import 'jquery/dist/jquery.js';
import 'popper.js/dist/umd/popper.js';
import 'bootstrap/dist/js/bootstrap.js';
import { AboutPage } from "./Pages/AboutPage";
import { ArticalsListView } from "./Pages/ArticalsListView";
import { ArticalPage } from "./Pages/ArticalPage";
import { NotFoundPage } from "./Pages/NotFoundPage";
import { BuyNow } from "./components/BuyNow";
import { NavBar } from "./NavBar";
import {MyOrder} from './components/MyOrder'

ReactDOM.render(
    <>
     <Router>
     <NavBar/> 
    <div className="container">
                <Switch>
                <Route path="/" component={App} exact />
                <Route path="/about" component={AboutPage} />
                <Route path="/cart-list" component={ArticalsListView} />
                <Route path="/artical/:name" component={ArticalPage} />
                <Route path="/buynow/:name" component={BuyNow} />
                <Route path="/view-myorder" component={MyOrder} />
                <Route component={NotFoundPage} />
                </Switch>
              </div>
              </Router>
    </>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
