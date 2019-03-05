import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import './index.css';
import App from './App';
import ContractDetail from './components/ContractDetail';
import CharacterDetail from './components/CharacterDetail';
import * as serviceWorker from './serviceWorker';

class Router extends Component {
    render() {  
        return ( 
            <BrowserRouter>
                <Switch>
                    <Route path='/contract/:id' component={ ContractDetail } />
                    <Route path='/character/:id' component={ CharacterDetail } />
                    <Route exact path='/' component={ App } />
                    <Redirect from='*' to='/' />
                </Switch>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<Router />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
