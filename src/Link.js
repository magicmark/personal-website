import * as React from 'react';

const Link = props => {
    const title = props.children ? props.children : props.href;
    return (
        <a href={props.href} target="_blank" rel="noopener noreferrer">
            {title}
        </a>
    );
};

export default Link;
