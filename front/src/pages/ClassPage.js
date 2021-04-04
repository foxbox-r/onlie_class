import React from 'react';
import ClassContainer from "../containers/Class/ClassContainer"
import DefaultTemplate from "../components/common/Template/DefaultTemplate"
import IsLoggedIn from "../components/common/IsLoggedin/IsLoggedin"

const ClassPage = () => {
    return (
        <>
            <DefaultTemplate>
              <IsLoggedIn />
                <ClassContainer />
            </DefaultTemplate>
        </>
    )
}

export default ClassPage;