import React from 'react'
import PropTypes from 'prop-types'
import {connect} from './react-redux'

class ThemeSwitch extends React.Component{

    handleSwitchColor (color){
        if (this.props.onSwitchColor) {
            this.props.onSwitchColor(color)
        }
    }

    render(){
        return (
            <div>
                <button style={{ color: this.props.themeColor }}
                    onClick={this.handleSwitchColor.bind(this, 'red')}>
                    红色
                </button>
                <button style={{ color: this.props.themeColor }}
                    onClick={this.handleSwitchColor.bind(this, 'blue')}>
                    蓝色
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        themeColor: state.themeColor
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSwitchColor: (color) => {
            dispatch({ type: 'CHANGE_THEME', themeColor: color })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ThemeSwitch);