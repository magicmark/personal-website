import * as React from 'react';
import styled from 'styled-components';
// import Auth from './Auth';
import Recipes from './Recipes';
import Link from './Link';
import CookieNotice from './CookieNotice';

const Container = styled.div`
    transform: skew(1.35deg);
    flex-grow: 1;
`;

const WebringContainer = styled.div`
    padding: 12px 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Main = styled.div`
    min-height: 100vh;
    padding: 0 12px;
    display: flex;
    flex-direction: column;
`;

const Mark = () => (
    <Main>
        <Container>
            <header>
                <h1>Mark Larah</h1>
                <aside>
                    <i>Developer of fine artisanal software</i>
                </aside>
            </header>

            <h2>48656C6C6F20546865726521</h2>
            <p>
                I am a{' '}
                <span role="img" aria-label="uk">
                    🇬🇧
                </span>{' '}
                Software Engineer currently working on web infrastructure at{' '}
                <Link href="https://www.yelp.com">Yelp</Link>{' '}
                <span role="img" aria-label="usa">
                    🇺🇸
                </span>
                .
            </p>
    
            <p>If you like reading about JavaScript, GraphQL or software engineering in general, you may enjoy <Link href="https://blog.larah.me/">my blog!</Link></p>

            <h2>More Info</h2>
            <ul>
                <li>
                    <Link href="https://blog.larah.me" />
                </li>
                <li>
                    <Link href="https://uk.linkedin.com/in/marklarah" />
                </li>
                <li>
                    <Link href="https://twitter.com/mark_larah" />
                </li>
                <li>
                    <Link href="https://github.com/magicmark" />
                </li>
            </ul>

            <h2>Projects</h2>
            <ul>
                <li>
                    <Link href="https://composerize.com/">Composerize</Link>
                </li>
                <li>
                    <Link href="https://techwriting.styles.wiki/">techwriting.styles.wiki</Link>
                </li>
                <li>
                    <Link href="https://github.com/Yelp/dataloader-codegen">dataloader-codegen</Link>
                </li>
                <li>
                    <Link href="https://github.com/magicmark/pre-commit-vscode">pre-commit-vscode</Link>
                </li>
                <li>
                    <Link href="https://apollo-visualizer.vercel.app/">Apollo Error Handling Visualizer</Link>
                </li>
                <li>
                    <Link href="https://github.com/sharkcore/tweenz">Tweenz</Link>
                </li>
            </ul>

            <Recipes />
            {/* <Auth /> */}
        </Container>
        <WebringContainer>
            <sharkcore-webring />
        </WebringContainer>
        <CookieNotice />
    </Main>
);

export default Mark;
