import "babel-polyfill";
import './main.css';
import './style.css';


import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import AppReducers from './reducers';
import WelcomeApp from './components/WelcomeApp';
import ChildApp from './components/ChildApp';
import ChildIncomeApp from './components/ChildIncomeApp';
import AssistanceApp from './components/AssistanceApp';
import CompleteApp from './components/CompleteApp';
import DisclosureApp from './components/DisclosureApp';
import AdultApp from './components/AdultApp'
import LeftSide from './components/LeftSide';
import RightSide from './components/RightSide';
import * as core from './lib/core';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import request from 'superagent';

const loggerMiddleware = createLogger()


const store = createStore(
  combineReducers({
    ...AppReducers,
    routing: routerReducer}), 
    applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
    ));

const history = syncHistoryWithStore(browserHistory, store);

const d = (action) => {
    store.dispatch(action);
}

const submitApp = () => {
    const s = store.getState();
 
    let alldone = true;
    
    if (s.previousStep == 'ASK_COMPLETE_DONE' && s.getNextStep == false) {
        Object.keys(s.progress).forEach(k => {
            alldone = alldone && s.progress[k];
        });
        
        //time to save..
        if (alldone) {
           core.saveApplication(s);
        }
    }   
}

let submitListener = store.subscribe(submitApp);

//still need to figure out how to handle finished app step...
//maybe include a way to handle infinite loops..
const main = () => {
    const s = store.getState();
    
    if (!s.getNextStep) return;
    
    console.log('handling next step');
    d(core.resetGetNextStep());
    
    const previousStep = s.previousStep;
    console.log('prevstep: ' + previousStep);
    
    if (core.toNextSection(previousStep, s)) {
        console.log('transition to next section');
        let nextSection = core.getNextSection(previousStep, s);
        d(core.markComplete(previousStep));
        if (nextSection == 'complete') {
            d(core.markAllComplete());
        }
        browserHistory.push(core.getNextSection(previousStep, s));
        return;
    }
    
    //stepsMap always contain a list 
    let sm = s.stepsMap;
    if (sm.length == 0) {
        d(core.refreshSteps(previousStep, s));
        d(core.getNextStep());
        //end, let the next cycle handle it
        return;
    }
    
    let nextStep = sm[0];
    console.log('nextstep found is');
    console.log(nextStep);
    
    d(core.setPreviousStep(nextStep));
    d(core.popStep());
    core.sendMessages(nextStep, s).forEach(action => {
        d(action);
    });
    d(core.sendForm(nextStep, s));
}

let stepsMapUnsubscribe = store.subscribe(main);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={DisclosureApp}>
      </Route>
      <Route path="/welcome" component={WelcomeApp}>
      </Route>
      <Route path="/child" component={ChildApp}>
      </Route>
      <Route path="/childincome" component={ChildIncomeApp}>
      </Route>
      <Route path="/adult" component={AdultApp}>
      </Route>
      <Route path="/assistance" component={AssistanceApp}>
      </Route>
      <Route path="/complete" component={CompleteApp}>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/welcome" component={LeftSide}>
      </Route>
      <Route path="/child" component={LeftSide}>
      </Route>
      <Route path="/childincome" component={LeftSide}>
      </Route>
      <Route path="/adult" component={LeftSide}>
      </Route>
      <Route path="/assistance" component={LeftSide}>
      </Route>
      <Route path="/complete" component={LeftSide}>
      </Route>
    </Router>   
  </Provider>,
  document.getElementById('side-left')
)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/welcome" component={RightSide}>
      </Route>
      <Route path="/child" component={RightSide}>
      </Route>
      <Route path="/childincome" component={RightSide}>
      </Route>
      <Route path="/adult" component={RightSide}>
      </Route>
      <Route path="/assistance" component={RightSide}>
      </Route>
      <Route path="/complete" component={RightSide}>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('side-right')
)