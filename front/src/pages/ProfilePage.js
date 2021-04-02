import React from 'react';
import ProfileContainer from "../containers/Profile/ProfileContainer"
import DefaultTemplate from "../components/common/Template/DefaultTemplate"

const ProfilePage = () => {

    return (
        <DefaultTemplate>
            <ProfileContainer />
        </DefaultTemplate>
    )   
}

export default ProfilePage;