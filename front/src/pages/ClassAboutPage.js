import React from 'react';
import ClassAboutContainer from "../containers/ClassAbout/ClassAboutContainer"
import DefaultTemplate from "../components/common/Template/DefaultTemplate"
import IsLoggedIn from "../components/common/IsLoggedin/IsLoggedin"

const ClassAboutPage = ({match}) => {

    const {classId} = match.params;

    return (
        <DefaultTemplate>
              <IsLoggedIn />
              <ClassAboutContainer
                ClassId = {classId}
              />
        </DefaultTemplate>
    )
}

export default ClassAboutPage;