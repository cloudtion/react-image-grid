
import React, {useState, useRef} from "react";
import LoadingSpinner from "./LoadingSpinner";

interface LazyLoadImageProps {
    alt?: string,
    showLoadingSpinner? : boolean,
    className? : string,
    src: string,
    style?: React.CSSProperties,
    onClick?: React.MouseEventHandler<HTMLImageElement>,
    onLoad?: (img : EventTarget) => void,
};

export default function LazyLoadImage(props : LazyLoadImageProps) : React.ReactElement {

    const [imgLoaded, setImgLoaded] = useState<boolean>(false);
    
    const imgRef = useRef<HTMLImageElement | null>(null);

    function onImgLoad(img : EventTarget){
       
        setImgLoaded(true);

        if( props.onLoad ){

            props.onLoad(img);
        }
    }   

    const on_click_cb = props.onClick? props.onClick : undefined;

    return (
        <React.Fragment>
            <img 
                className={props.className}
                ref={imgRef}
                src={props.src}
                alt={props.alt}
                onClick={on_click_cb}
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
            <LoadingSpinner style={{opacity: (!imgLoaded&&props.showLoadingSpinner)? 1:0}}/>
            
        </React.Fragment>
    )
}