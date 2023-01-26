
import React, { useEffect } from "react";
import { useWindowSize } from "./hooks";

import LazyLoadImage from "./LazyLoadImage";
import AuthorInfo from "./AuthorInfo";
import { ImageGridImage, ImageAuthor } from "./ImageGrid";


interface LightboxProps {
    image: ImageGridImage,  
    onClose: () => void,    // Callback for when the close button is pressed.
    onNext: () => void,     // Callback for when the right arrow button is pressed.
    onPrev: () => void,     // Callback for when the left arrow button is pressed.
    disablePrev? : boolean,// Disables the left arrow.
};

export default function Lightbox(props : LightboxProps) : React.ReactElement {

    const [windowWidth, windowHeight] = useWindowSize();
    
    const is_vertical = windowWidth < windowHeight;

    useEffect(()=>{

        // Don't let the user scroll the page while the lightbox is open.
        window.document.body.style.overflowY = 'hidden';

        // Closing lightbox, allow scrolling again.
        return ()=>{
        
            window.document.body.style.overflowY = 'auto';
        };

    }, []);

    
    const {image} = props;
    const {author} = image;

    const onClick : React.MouseEventHandler<HTMLImageElement> = (event : React.MouseEvent<HTMLElement>) : void =>{

        event.stopPropagation();
    };      

    return (
        <div className="img-grid-lightbox" onClick={props.onClose}>

            <button 
                className="lightbox-close-button"
                onClick={props.onClose}
            >x</button>
        
            <div className="lightbox-center-wrapper">

                <div className="lightbox-img-wrapper">
                    <LazyLoadImage 
                        className="lightbox-img"
                        src={image.src} 
                        alt={image.alt}
                        onClick={ onClick }  // Stop the click from bubbling up so a click on the image itself doesn't close the lightbox.
                        style={is_vertical? undefined: ({height: '100%'} as React.CSSProperties)}
                        showLoadingSpinner={true}
                    />
                </div>

                <span className="lightbox-description">
                    { image.description }
                </span>

                {
                    author?
                        <AuthorInfo author={author}/> 
                        :
                        null
                }
                
                <div className="lightbox-arrows-wrapper">

                    <button 
                        className="lightbox-arrow lightbox-arrow-left" 
                        disabled={props.disablePrev}
                        onClick={e=>{ props.onPrev(); e.stopPropagation()}}
                    >{"<"}</button>
    
                    <button 
                        className="lightbox-arrow lightbox-arrow-right"
                        onClick={e=>{ props.onNext(); e.stopPropagation()}}
                    >{">"}</button>
                </div>
            </div>
        </div>
    )
}