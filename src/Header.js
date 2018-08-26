import React from 'react'
import PropTypes from 'prop-types'

class Header extends React.Component{
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

    render(){
        return (
            <div>
                <h1 style={{ color: this.state.themeColor }}>标题</h1>
            </div>
        );
    }
}

export default Header;