// @flow

import React, { useState } from 'react';
import styled from 'styled-components';
import useScript from './useScript';

const TopRight = styled.div`
    position: absolute;
    top: 12px;
    right: 12px;
`;

function Auth() {
    const [logInData, setLogInData] = useState({ isLoggedIn: false, name: null });
    const [loaded] = useScript('https://apis.google.com/js/platform.js');

    if (!loaded) {
        return <p>...</p>;
    }

    const onSignIn = googleUser => {
        const profile = googleUser.getBasicProfile();
        setLogInData({
            isLoggedIn: true,
            name: profile.getGivenName(),
        });
    };

    window.gapi.signin2.render('googleLogin', {
        scope: 'profile email',
        longtitle: false,
        onsuccess: onSignIn,
        onfailure: e => {
            console.log(e);
        },
    });

    const signOut = async () => {
        await window.gapi.auth2.getAuthInstance().signOut();
        setLogInData({ isLoggedIn: false, name: null });
    };

    const { isLoggedIn, name } = logInData;

    return (
        <TopRight>
            <div
                id="googleLogin"
                style={{
                    display: isLoggedIn ? 'none' : 'block',
                }}
            />
            {isLoggedIn && (
                <p>
                    Welcome, {name}! <button onClick={signOut}>Logout</button>
                </p>
            )}
        </TopRight>
    );
}

export default Auth;
