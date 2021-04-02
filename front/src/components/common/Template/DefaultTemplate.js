import React from 'react';
import HeaderContainer from "../../../containers/Header/HeaderContainer"

const DefaultTemplate = ({children}) => {

    return (
        <div className="default-template">
            <HeaderContainer />
            {children}
        </div>
    )
}

export default DefaultTemplate;