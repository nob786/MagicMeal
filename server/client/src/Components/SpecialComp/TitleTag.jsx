import React, { Component } from 'react';
import '../SpecialComp/TitleTag.css'


class TitleTag extends Component {
    render(){
        return(
            <div className="TitleTag">
                <h1><span><button> {this.props.title}</button></span></h1>
            </div>
        );
    }
}


export default TitleTag;