
import React, { useEffect, useRef, useState } from "react";
import { useWindowScroll, useWindowSize } from "./hooks";
import LazyLoadImage from "./LazyLoadImage";
import Lightbox from "./Lightbox";
import './react_img_grid_style.scss';

// Default number of pixels remaining to be scrolled when we load additional images.
// If there are only [DEFAULT_BOTTOM_THRESHOLD] pixels left to be scrolled, start loading next images.
const DEFAULT_BOTTOM_THRESHOLD = 350; 

export interface ImageGridImage {
    src : string
    fullSizeSrc? : string, // A larger image src to be used in the lightbox. If not supplied, the regular src property will be used.
    alt : string,          // Alt text to be used on the image element.
    title? : string,       // Hover text to be used on the image element.
    description? : string, 
    height : number,
    width : number,
    author : ImageAuthor
}

export interface ImageAuthor {
    name : string,
    url? : string,
    profile_img_src? : string,
}

interface ImageGridProps {
    images : ImageGridImage[],
    onImageClick?: (clicked_index : number) => void,
    minColCount? : number,
    colThreshold? : number,
    onBottomVisible? : () => void,
    bottomTriggerThreshold? : number,
    lightboxEnabled? : boolean
}

interface ColumnHeightTally {
    col_ind: number, // Divide the window width by this number and round it to calculate the number of columns that will be used.
    height: number,  // Sets the minimum number of columns that will be used, overwriting the column count calculated by the column threshold.
}

interface ImageState {
    loaded : boolean,
    width : number,
    height : number,
}

interface ImageStateMap {
    [src: string]: ImageState
}

function ColumnBottom(props : {threshold : number, onVisible? : () => void}) : React.ReactElement {
    
    const [, scrollY] = useWindowScroll();
    const triggered = useRef<boolean>(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(()=>{

        if( bottomRef.current ){

            if( scrollY + props.threshold + window.innerHeight > bottomRef.current.offsetTop ){

                // Check to make sure that we only call "onVisible" once each time it comes into view.
                if( !triggered.current ){
                    
                    props.onVisible && props.onVisible();
                    triggered.current = true;
                }

            }else{

                // This bottom has left the view. We're ready to call "onVisible" next time we see it again.
                triggered.current = false;
            }
        }

    }, [scrollY])

    return (
        <div ref={bottomRef} className="column-bottom"></div>
    )
}

export default function ImageGrid(props : ImageGridProps) : React.ReactElement {
    
    const lightboxEnabled = props.lightboxEnabled?? true;

    const [imgState, _setImgState] = useState<ImageStateMap>({});
    const imgStateRef = useRef<ImageStateMap>({});
    
    const [lightboxImgInd, setLightboxImgInd] = useState<number | null>(null);

    const bottomTriggerReady = useRef<boolean>(false);
    const bottom_threshold = props.bottomTriggerThreshold?? DEFAULT_BOTTOM_THRESHOLD;

    const [, scrollY] = useWindowScroll();
    const [windowWidth, windowHeight] = useWindowSize();

    const lastTriggeredScrollYRef = useRef<number>(-1);

    const MINIMUM_COLUMN_COUNT = props.minColCount ?? 3;
    const COLUMN_THRESHOLD = props.colThreshold ?? 300;

    const [parentWidth, setParentWidth] = useState(0);

    const calculated_column_count = Math.round(parentWidth/COLUMN_THRESHOLD);

    const column_count = calculated_column_count<MINIMUM_COLUMN_COUNT? MINIMUM_COLUMN_COUNT : calculated_column_count;
  
    const gridRef = useRef<HTMLDivElement>(null);

    const grid_width = gridRef.current? gridRef.current.offsetWidth : 0;

    const column_width = grid_width/column_count;

    const image_elements : React.ReactElement[] = props.images.map((img, ind)=>(
        <LazyLoadImage
            key={ind}
            src={img.src}
            onLoad={imgLoaded}
            alt={img.alt}
            onClick={()=> imageClicked(ind)}
            showLoadingSpinner={false} // Since there are initially going to be many images loading initially, we don't want to clutter the page wth spinners
        />
    ));

    const columns : React.ReactElement[][] = [];

    // We'll keep track of the heights of the pictures in each column in order to evenly distribute the pictures.
    // If the heights of each picture returned from the API were random, this may be unnecessary, but it will ensure that 
    // there isn't a chance of any column gradually growing larger than the others.
    let column_height_tallies : ColumnHeightTally[] = [];
    
    for(let i=0;i<column_count;i++){

        columns.push([]);
        column_height_tallies.push({col_ind: i, height: 0});
    }

    for(let i=0;i<image_elements.length;i++){

        // Sort the column tallies so that the first element in the array will point us to the column we need to add the next image to.
        column_height_tallies = column_height_tallies.sort((a,b)=> a.height<b.height? -1:1);
        

        // We add the image to the column that was the shortest.
        columns[column_height_tallies[0].col_ind].push(image_elements[i]);

        const img = props.images[i];

        const imgS = imgState[img.src];

        // This is how high the image will actually be in the grid as opposed to its full-resolution height.
        const image_scaled_height = imgS? ((imgS.height/imgS.width)*grid_width) : 0; 
        
        // Add the height of the image to the column's tally.
        column_height_tallies[0].height += image_scaled_height;
    }

    const [shortest_column] = column_height_tallies.sort((a,b)=> a.height<b.height? -1:1);
    const shortest_column_ind = shortest_column.col_ind;

    const column_elements : React.ReactElement[] = columns.map((col_els_arr, ind)=>(
        <div key={ind} className="img-grid-col" style={{width: column_width}}>
            { col_els_arr }
            {   // If we're checking for the bottom of the grid for lazy loading, we only need to track the bottom of the shortest column. 
                ind===shortest_column_ind?
                    <ColumnBottom threshold={bottom_threshold} onVisible={bottomVisible}/>
                    :
                    null
            }
        </div>
    ));

    function imageClicked(imageInd : number){

        props.onImageClick && props.onImageClick(imageInd);

        if( lightboxEnabled ){

            setLightboxImgInd(imageInd);
        }
    }

    function setImgState(newState : ImageStateMap){

        imgStateRef.current = newState;
        _setImgState(newState);
    }

    function bottomVisible(){

        if( bottomTriggerReady.current && scrollY !== lastTriggeredScrollYRef.current ){

            props.onBottomVisible && props.onBottomVisible();
            lastTriggeredScrollYRef.current = scrollY;
        }
    }

    function imgLoaded(e : any){

        const src : string = `${e.target.src}`;

        if( !imgStateRef.current[src] ){
            
            setImgState({
                ...imgStateRef.current,
                [src]: {
                    loaded : true,
                    width: e.target.naturalWidth,
                    height: e.target.naturalHeight,
                }
            });
        }
        
        // Check to see if all images are loaded.
        // If they are then we can enable checking the bottom of the column callback trigger.
        bottomTriggerReady.current = !props.images.some(img=> !imgState[img.src] && img.src!==src);
    }

    useEffect(()=>{

        if( gridRef.current && gridRef.current.parentElement ){

            setParentWidth(gridRef.current.parentElement.offsetWidth);
        }

    }, []);

    useEffect(()=>{
        
    }, [props.images]);

    const current_img = lightboxImgInd!==null? props.images[lightboxImgInd] : null;

    const lightbox_img = current_img?? null;

    return (
        <>
            <div 
                ref={gridRef}
                className={"img-grid "+(windowHeight>windowWidth? "img-grid-mobile":"")} 
            >
                { column_elements }
            </div>

            
            {
                lightboxImgInd!==null && lightbox_img!==null?
                <Lightbox
                    key={lightboxImgInd}
                    image={lightbox_img}
                    onNext={()=> setLightboxImgInd((lightboxImgInd + 1) % props.images.length)}
                    onPrev={() => setLightboxImgInd(lightboxImgInd - 1)}
                    disablePrev={lightboxImgInd===0}
                    onClose={()=> setLightboxImgInd(null)}
                />
                :
                null
            }
        </>
    )
}