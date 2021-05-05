import React, { Component } from 'react'


class Modal extends Component {
    render(){
        return (
            <div className='modal'>
                <p>{this.props.message} | <span style={{color: 'red'}}>X</span></p>
            </div>
        )
    }
}


export default Modal;