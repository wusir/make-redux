import React from 'react'
import PropTypes from 'prop-types'
import {connect} from './react-redux'

class Header extends React.Component{
    static propTypes = {
        themeColor: PropTypes.string
      }

    render(){
        return (
            <div>
                <h1 style={{ color: this.props.themeColor }}>标题</h1>
            </div>
        );
    }
}

//将state转换为props传递给组件，这里的state是通过store.getState()获取的，代码全局性store，用于在
//组件间实现状态的复用
const mapStateToProps = (state) => {
    return {
        themeColor: state.themeColor
    };
}

export default connect(mapStateToProps)(Header);