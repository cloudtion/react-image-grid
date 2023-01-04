
import React from 'react';
import Logo from './react_img_grid_logo.svg';
import GithubLogo from './github-mark.svg';

export default function HomePageHeader() : React.ReactElement {

    return (
        <div id='homepage-header'>
            
            <div id='logo-holder'>
                <img src={Logo}/>
                <h1>React Image Grid</h1>
            </div>

            <span id='header-tagline'>
                Responsive image grid and lightbox.
            </span>

            <a id='github-link' href='https://github.com/cloudtion/react-image-grid'>
                <img src={GithubLogo}/> <span>View on GitHub</span>
            </a>

            <div id='check-it-out'>
                <span>Check it out.</span><br/>
                <div className='down-arrow'></div>
            </div>

        </div>
    )
}