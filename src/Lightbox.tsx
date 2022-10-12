
import React, { useEffect } from 'react';
import { useWindowSize } from './hooks';

import LazyLoadImage from './LazyLoadImage';
import UploaderInfo from './UploaderInfo';

// Accepts Props:
// "image"        - Object   - An image returned from unsplash's API.
// "onPrev"       - Function - Callback for when the left arrow button is pressed.
// "onNext"       - Function - Callback for when the right arrow button is pressed.
// "disablePrev"  - bool     - Disables the left arrow.
// "onClose"      - Function - Callback for when the close button is pressed.
export default function Lightbox(props){

    const windowSize = useWindowSize();

    const {image} = props;
    
    const is_vertical = windowSize.width < windowSize.height;

    useEffect(()=>{

        // Don't let the user scroll the page while the lightbox is open.
        window.document.body.style.overflowY = 'hidden';

        // Closing lightbox, allow scrolling again.
        return ()=> window.document.body.style.overflowY = 'auto';

    }, []);

    return (
        <div className="lightbox" onClick={props.onClose}>

            <button 
                className="lightbox-close-button"
                onClick={props.onClose}
            >x</button>
        
            <div className="lightbox-center-wrapper">

                <div className="lightbox-img-wrapper">
                    <LazyLoadImage 
                        className="lightbox-img"
                        src={image.urls.full} 
                        alt={image.alt_description}
                        onClick={e=> e.stopPropagation()}  // Stop the click from bubbling up so a click on the image itself doesn't close the lightbox.
                        style={is_vertical? null:{height: '100%'}}
                        showLoadingSpinner={true}
                    />
                </div>

                <span className="lightbox-description">
                    { image.description }
                </span>

                <UploaderInfo user={image.user}/> 

                <div className="lightbox-arrows-wrapper">

                    <button 
                        className="lightbox-arrow lightbox-arrow-left" 
                        disabled={props.disablePrev}
                        onClick={e=>{ props.onPrev(); e.stopPropagation()}}
                    >{'<'}</button>
    
                    <button 
                        className="lightbox-arrow lightbox-arrow-right"
                        onClick={e=>{ props.onNext(); e.stopPropagation()}}
                    >{'>'}</button>
                </div>
            </div>
        </div>
    )
}