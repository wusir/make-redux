import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
//registerServiceWorker();

function stateChange(state, action){

    if(!state){
        return {
            header: {
                text: "标题",
                color: 'red',
            },
            content: {
                text: "内容",
                color: 'blue'
            }
        };
    }

    switch(action.type){
        case 'UPDATE_HEADER_TEXT':
            return {
                ...state,
                header: {
                    ...state.header,
                    text: action.text,
                }
            };
        case 'UPDATE_HEADER_COLOR':
            return {
                ...state,
                header: {
                    ...state.header,
                    color: action.color,
                }
            };
        default:
            return state;
    }
}

//用store的概念来封装state和action
function createStore(reducer){
    let state = null

    var getState = () => state;

    var listeners = [];
    var subscribe = (renderState) => listeners.push(renderState);

    var dispatch = (action) => {
        state = reducer(state, action);

        listeners.forEach((listener) =>{
            listener();
        });
    }

    //初始化state，相当于{null, {}}
    dispatch({});

    return {
        getState,
        dispatch,
        subscribe,
    };
}

function renderApp(newState, oldState = {}){
    if(newState === oldState){
        return;
    }
    console.log('render App');
    renderHeader(newState.header, oldState.header);
    renderContent(newState.content, oldState.content);
}

function renderHeader(newHeader, oldHeader = {}){
    if(newHeader === oldHeader){
        return;
    }
    console.log('render Header');
    var headerElem = document.getElementById('header');
    headerElem.innerHTML = newHeader.text;
    headerElem.style.color = newHeader.color;
}

function renderContent(newContent, oldContent = {}){
    if(newContent === oldContent){
        return;
    }
    console.log('render Content');
    var contentElem = document.getElementById('content');
    contentElem.innerHTML = newContent.text;
    contentElem.style.color = newContent.color;
}

var store = createStore(stateChange);
var oldState = store.getState();
store.subscribe(() => {
    var newState = store.getState();
    renderApp(newState, oldState)
    oldState = newState;
});

//renderApp(store.getState());
//store.dispatch({type: 'UPDATE_HEADER_TEXT', text: '修改后的标题'});
//store.dispatch({type: 'UPDATE_HEADER_COLOR', color: 'green'});