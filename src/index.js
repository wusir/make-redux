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

function dispatch(action){
    switch(action.type){
        case 'UPDATE_HEADER_TEXT':
            appState.header.text = action.text;
            break;
        case 'UPDATE_HEADER_COLOR':
            appState.header.color = action.color;
            break;
        default:
            break;
    }
}

function renderApp(state){
    console.log('renderContent');
    renderHeader(state.header);
    renderContent(state.content);
}

function renderHeader(header){
    var headerElem = document.getElementById('header');
    headerElem.innerHTML = header.text;
    headerElem.style.color = header.color;
}

function renderContent(content){
    var contentElem = document.getElementById('content');
    contentElem.innerHTML = content.text;
    contentElem.style.color = content.color;
}

renderApp(appState);
dispatch({type: 'UPDATE_HEADER_TEXT', text: '修改后的标题'});
dispatch({type: 'UPDATE_HEADER_COLOR', color: 'green'});
renderApp(appState);