import React from 'react';
import '../../styles/uml_pane.scss';
import { connect } from 'react-redux';

function UMLContainer(props) {

    const { uml } = props;

    if(uml.loading){
        return (
            <div className="uml-panel-container">
                <p>Loading...</p>
            </div>
        )
    }

    else if(uml.error){

        return (
            <div className="uml-panel-container">
                <p>Error fetching UML</p>
            </div>
        )
    }
    else if (uml.uml){
        return (
            <div className="uml-panel-container">
    
                <p dangerouslySetInnerHTML={{__html: uml.uml}}></p>
    
            </div>
        )
    }

    else {
        return (
            <div className="uml-panel-container">
                
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    uml: state.uml
})
export default connect(mapStateToProps)(UMLContainer);
