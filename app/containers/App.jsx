import React, { Component } from 'react'

export default class App extends Component {

    constructor(props){
        super(props);
        window.localStorage.setItem('NODE_ENV',process.env.NODE_ENV);
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}
