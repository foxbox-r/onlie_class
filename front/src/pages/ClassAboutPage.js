import React from 'react';
import ClassAboutContainer from "../containers/ClassAbout/ClassAboutContainer"
import DefaultTemplate from "../components/common/Template/DefaultTemplate"

const ClassAboutPage = ({match}) => {

    const {classId} = match.params;

    return (
        <DefaultTemplate>
              <ClassAboutContainer
                ClassId = {classId}
              />
        </DefaultTemplate>
    )
}

export default ClassAboutPage;