// @flow

import * as React from 'react';
import styled from 'styled-components';
import Link from './Link';

const Container = styled.div`
    left: 12px;
    right: 12px;

    p {
        display: inline-block;
        margin-top: 3px;
    }
`;

type Props = {||};
type State = {|
    isVisible: boolean,
|};

const COOKIE_NOTICE_DISMISSED_LOCAL_STORAGE_KEY = 'isCookieNoticeDismissed';

class CookieNotice extends React.Component<Props, State> {
    state = { isVisible: true };

    componentDidMount() {
        const dismissed = window.localStorage.getItem(
            COOKIE_NOTICE_DISMISSED_LOCAL_STORAGE_KEY,
        );
        const isVisible = dismissed !== 'true';
        this.setState({ isVisible });
    }

    dismissClicked = () => {
        this.setState({ isVisible: false }, () => {
            window.localStorage.setItem(
                COOKIE_NOTICE_DISMISSED_LOCAL_STORAGE_KEY,
                'true',
            );
        });
    };

    render() {
        if (!this.state.isVisible) {
            return null;
        }

        return (
            <Container>
                <hr />
                <p>
                    This website uses cookies to provide a great user
                    experience. By continuing to browse the site, you are
                    agreeing to our use of cookies.{' '}
                    <Link href="https://en.wikipedia.org/wiki/Privacy_and_Electronic_Communications_Directive_2002">
                        Find out more
                    </Link>.
                </p>
                &nbsp;
                <button onClick={this.dismissClicked}>Dismiss</button>
            </Container>
        );
    }
}

export default CookieNotice;
