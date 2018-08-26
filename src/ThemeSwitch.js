import React from 'react'
import PropTypes from 'prop-types'

class ThemeSwitch extends React.Component{

    static contextTypes ={
        store: PropTypes.object
    }

    constructor(){
        super()
        this.state = {themeColor: ''}
    }

    componentWillMount() {
      const {store} = this.context;
      store.subscribe(() => this.updateThemeColor());
      this.updateThemeColor();
    }
    
    updateThemeColor() {
        const {store} = this.context;
        const state = store.getState();
        this.setState({themeColor: state.themeColor});
    }

    handleRedClick(){
        const {store} = this.context;
        store.dispatch({type: 'CHANGE_THEME', themeColor: 'red'});
    }

    handleBlueClick = ()=>{
        const {store} = this.context;
        store.dispatch({type: 'CHANGE_THEME', themeColor: 'blue'});
    }

    render(){
        return (
            <div>
                <button style={{ color: this.state.themeColor }}
                    onClick={this.handleRedClick.bind(this)}>
                    红色
                </button>
                <button style={{ color: this.state.themeColor }}
                    onClick={this.handleBlueClick}>
                    蓝色
                </button>
            </div>
        );
    }
}

export default ThemeSwitch;