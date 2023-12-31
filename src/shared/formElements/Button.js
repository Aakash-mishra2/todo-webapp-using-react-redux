import React from 'react';
import { Link } from 'react-router-dom';

import './Button.css';

const Button = props => {
    if (props.href) {
        return (
            <a
                className={`button button--${props.size || 'default'} ${props.inverse && 'button--inverse'} ${props.danger && 'button--danger'} 
                         ${props.warning && 'button--warning'}`}
                href={props.href}
            >
                {props.children}
            </a>
        );
    }
    if (props.to) {
        return (
            <Link
                to={props.to}
                exact={props.exact}
                className={`button button--${props.size || 'default'} ${props.inverse && 'button--inverse'} ${props.danger && 'button--danger'} 
                         ${props.warning && 'button--warning'}`}
            >
                {props.children}
            </Link>
        );
    }
    return (
        <button
            className={`${props.className} button button--${props.size || 'default'} ${props.inverse && 'button--inverse'} ${props.danger && 'button--danger'} 
                         ${props.warning && 'button--warning'}`}
            type={props.type}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    );
};

export default Button;