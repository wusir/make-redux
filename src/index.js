import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

//ReactDOM.render(<App />, document.getElementById('root'));
//registerServiceWorker();

const appState = {
    header: {
        text: "标题",
        color: 'red',
    },
    content: {
        text: "内容",
        color: 'blue'
    }
}

function stateChange(state, action){
    switch(action.type){
        case 'UPDATE_HEADER_TEXT':
            state.header.text = action.text;
            break;
        case 'UPDATE_HEADER_COLOR':
            state.header.color = action.color;
            break;
        default:
            break;
    }
}

//用store的概念来封装state和action
function createStore(state, stateChange){
    var getState = () => state;

    var listeners = [];
    var subscribe = (renderState) => listeners.push(renderState);

    var dispatch = (action) => {
        stateChange(state, action);

        listeners.forEach((listener) =>{
            listener(state);
        });
    }

    return {
        getState,
        dispatch,
        subscribe,
    };
}

function renderApp(state){
    console.log('render App');
    renderHeader(state.header);
    renderContent(state.content);
}

function renderHeader(header){
    console.log('render Header');
    var headerElem = document.getElementById('header');
    headerElem.innerHTML = header.text;
    headerElem.style.color = header.color;
}

function renderContent(content){
    console.log('render Content');
    var contentElem = document.getElementById('content');
    contentElem.innerHTML = content.text;
    contentElem.style.color = content.color;
}

var store = createStore(appState, stateChange);
store.subscribe((state) => renderApp(state));

renderApp(store.getState());
store.dispatch({type: 'UPDATE_HEADER_TEXT', text: '修改后的标题'});
store.dispatch({type: 'UPDATE_HEADER_COLOR', color: 'green'});