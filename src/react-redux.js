import React from 'react'
import PropTypes from 'prop-types'

export const connect = (mapStateToProps, mapDispatchToProps) => (WrapperComponent) =>{
    class Connect extends React.Component{
        static contextTypes = {
            store: PropTypes.object
        }
        constructor () {
            super()
            this.state = { allProps: {} }
        }

        componentWillMount () {
            const { store } = this.context
            this._updateProps()
            store.subscribe(() => this._updateProps())
        }
    
        _updateProps () {
            const { store } = this.context
            //额外传入 props，让获取数据更加灵活方便
            let stateProps = mapStateToProps
                ? mapStateToProps(store.getState(), this.props)
                : {} // 防止 mapStateToProps 没有传入
            let dispatchProps = mapDispatchToProps
                ? mapDispatchToProps(store.dispatch, this.props)
                : {} // 防止 mapDispatchToProps 没有传入
            this.setState({
                // 整合普通的 props 和从 state 生成的 props
                allProps: { 
                    ...stateProps,
                    ...dispatchProps,
                    ...this.props
                }
            })
        }

        render(){
            return (
                <WrapperComponent {...this.state.allProps}/>
            );
        }
    }

    return Connect;
}