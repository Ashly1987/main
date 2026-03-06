import React from 'react';
import '../styles.css';

export default function Header() {
    return (
        <div className="header">
            <img src="/main_logo.png" alt="buttflix" className="logo" />
            <h2 className="app-subtitle">
                Its time for popcorn! Find your favorite movies here.</h2>
        </div>
    );
}