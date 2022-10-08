
import {useState, useRef} from 'react';
import LoadingSpinner from './LoadingSpinner';


export default function LazyLoadImage(props){

    const [imgLoaded, setImgLoaded] = useState(false);
    
    const imgRef = useRef(null);

    function onImgLoad(img){
       
        setImgLoaded(true);

        if( props.onLoad ){

            props.onLoad(img);
        }
    }   

    return (
        <>
            <img 
                ref={imgRef}
                src={props.src}
                alt={props.alt}
                onClick={props.onClick}
                style={{
                    opacity: imgLoaded? 1 : 0, 
                    zIndex: 2,
                    ...props.style,
                }}
                onLoad={e=> onImgLoad(e.target)}
            />

            {
                // Using opacity here as opposed to removing the component because for some reason
                // Removing the component causes the spinner to briefly stop before being removed.
                // TODO: Look into the cause of this.
            }
            <LoadingSpinner style={{opacity: !imgLoaded&props.showLoadingSpinner? 1:0}}/>
            
        </>
    )
}