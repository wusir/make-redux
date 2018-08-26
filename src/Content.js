import React from 'react'
import ThemeSwitch from './ThemeSwitch'
import {connect} from './react-redux'

class Content extends React.Component{
    render(){
        return (
            <div>
                <p style={{ color: this.props.themeColor }}>内容</p>
                <ThemeSwitch />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        themeColor: state.themeColor
    };
}

export default connect(mapStateToProps)(Content);