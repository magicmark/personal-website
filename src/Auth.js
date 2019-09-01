// @flow

import * as React from 'react';
import styled from 'styled-components';

const TopRight = styled.div`
    position: absolute;
    top: 12px;
    right: 12px;
`;

type Props = {||};
type State = {|
    isLoading: boolean,
    isLoggedIn: boolean,
|};

class Auth extends React.Component<Props, State> {
    state = {
        isLoading: true,
        isLoggedIn: false,
    };

    componentDidMount() {
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/platform.js';
        script.async = true;
        script.defer = true;
        script.onload = this.gapiLoaded;
        document.body.appendChild(script);
    }

    onSignIn = googleUser => {
        const profile = googleUser.getBasicProfile();
        this.setState({ name: profile.getGivenName() });
        this.setState({ isLoggedIn: true });
    };

    signOut = () => {
        window.gapi.auth2
            .getAuthInstance()
            .signOut()
            .then(() => {
                this.setState({ isLoggedIn: false });
            });
    };

    gapiLoaded = () => {
        this.setState({ isLoading: false }, () => {
            window.gapi.signin2.render('googleLogin', {
                scope: 'profile email',
                longtitle: false,
                onsuccess: this.onSignIn,
                onfailure: e => {
                    console.log(e);
                },
            });
        });
    };

    render() {
        const { isLoading, isLoggedIn, name } = this.state;
        const shouldShowLoginButton = !isLoading && !isLoggedIn;

        const getWelcomeText = () => (
            <p>
                Welcome, {name}! <button onClick={this.signOut}>Logout</button>
            </p>
        );

        return (
            <TopRight>
                <div
                    id="googleLogin"
                    style={{
                        display: shouldShowLoginButton ? 'block' : 'none',
                    }}
                />
                {isLoggedIn && getWelcomeText()}
            </TopRight>
        );
    }
}

export default Auth;
