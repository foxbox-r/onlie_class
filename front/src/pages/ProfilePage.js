import React from 'react';
import ProfileContainer from "../containers/Profile/ProfileContainer"
import DefaultTemplate from "../components/common/Template/DefaultTemplate"
import IsLoggedIn from "../components/common/IsLoggedin/IsLoggedin"

const ProfilePage = () => {

    return (
        <DefaultTemplate>
            <IsLoggedIn />
            <ProfileContainer />
        </DefaultTemplate>
    )   
}

export default ProfilePage;