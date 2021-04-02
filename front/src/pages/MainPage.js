import React from 'react';
import MainContainer from "../containers/Main/MainContainer"
import DefaultTemplate from "../components/common/Template/DefaultTemplate"

const MainPage = () => {

    return (
        <>
            <DefaultTemplate>
                <MainContainer />
            </DefaultTemplate>
        </>
    )
}

export default MainPage;