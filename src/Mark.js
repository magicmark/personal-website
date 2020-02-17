import * as React from 'react';
import styled from 'styled-components';
import Auth from './Auth';
import Link from './Link';
import CookieNotice from './CookieNotice';

const Container = styled.div`
    transform: skew(1.35deg);
`;

const Mark = () => (
    <div>
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
                    <Link href="https://github.com/sharkcore/tweenz">Tweenz</Link>
                </li>
                <li>
                    <Link href="https://github.com/magicmark/pre-commit-vscode">pre-commit-vscode</Link>
                </li>
                <li>
                    <Link href="https://github.com/magicmark/cf-merge">cf-merge</Link>
                </li>
            </ul>

            <h2>Recipes</h2>
            <ul>
                <li>
                    <Link href="https://github.com/magicmark/recipes/blob/master/recipes/bagels.md">Bagels</Link>
                </li>
                <li>
                    <Link href="https://github.com/magicmark/recipes/blob/master/recipes/cheesebread.md">Cheesebread</Link>
                </li>
                <li>
                    <Link href="https://github.com/magicmark/recipes/blob/master/recipes/tuna_pasta_bake.md">Tuna Pasta Bake</Link>
                </li>
            </ul>
            <Auth />
        </Container>
        <CookieNotice />
    </div>
);

export default Mark;
