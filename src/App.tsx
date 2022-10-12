
import React, {useEffect, useState, useRef} from "react";
import {useWindowScroll, useWindowSize} from "./hooks";
import * as Unsplash from "./UnsplashImages";

import ImageGrid from "./ImageGrid";
import Lightbox from "./Lightbox";
import Search from "./Search";


// Number of pixels remaining to be scrolled when we load additional images.
// If there are only [LOAD_MORE_THRESHOLD] pixels left to be scrolled, start loading next images.
const LOAD_MORE_THRESHOLD = 500; 

// The number of images to request from the Unsplash API at a time.
const FETCH_IMAGE_COUNT = 20;

export default function App() : React.ReactElement {
  
  const [windowWidth, windowHeight] = useWindowSize();
  const [,scrollY] = useWindowScroll();

  // Used to mark that an API request is in progress.
  const isLoadingRef = useRef<boolean>(false);
  
  // Used to flag when the page has been initially filled with pictures.
  const initialLoadedRef = useRef<boolean>(false);

  // Used to flag when the API returns the last results of a query.
  // This prevents scrolling after the last results from continuing to call the API.
  const allImagesLoadedRef = useRef<boolean>(false);

  const [lightboxImgInd, setLightboxImgInd] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  const [images, setImages] = useState<any[]>([]);

  async function getNextImages(next_page=null){
  
    const next_page_ind = next_page ?? (images.length/FETCH_IMAGE_COUNT)+1;

    if( searchQuery ){

      return await Unsplash.getSearchImages(searchQuery, FETCH_IMAGE_COUNT, next_page_ind);

    }else{

      return await Unsplash.getImages(FETCH_IMAGE_COUNT, next_page_ind);
    }
  }

  async function searchChanged(new_search_value : string){
    
    // Scroll to the top of the page so we don't start loading multiple pages of results when the search query first changes.
    window.scroll(0,scrollY*-1);
    
    setSearchQuery(new_search_value);

    setImages( await Unsplash.getSearchImages(new_search_value, FETCH_IMAGE_COUNT, 1) );

    // The page is going to need repopulated because we're clearing out all images. 
    initialLoadedRef.current = false;

    // We don't know this search query will have any results yet. 
    // Reset all images loaded to allow the request to go through.
    allImagesLoadedRef.current = false;
  }   

  function checkLoadImages(){
    
    // When the window is scrolled, we need to check whether we need to load more images or not.
    // If there is already an API call in progress (isLoadingRef), 
    // if the API has already indicated that we're at the end of the results (allImagesLoadedRef),
    // or if the window scroll threshold isn't yet met (LOAD_MORE_THRESHOLD), then we won't load more images.

    const HIT_SCROLL_THRESHOLD = scrollY + windowHeight > (document.body.offsetHeight-LOAD_MORE_THRESHOLD); 
    const PAGE_STILL_EMPTY = document.body.offsetHeight <= windowHeight;
    const need_more_images = !isLoadingRef.current && !allImagesLoadedRef.current && (HIT_SCROLL_THRESHOLD||PAGE_STILL_EMPTY);

    if( need_more_images ){
      
      isLoadingRef.current = true;

      getNextImages()
        .then(additional_images=>{
          
          if( additional_images.length < 1 ){
          
            allImagesLoadedRef.current = true;
          }

          setImages( [...images, ...additional_images] );

          isLoadingRef.current = false;
        })
        .catch(console.error);
    }

  }

  useEffect(()=>{
    
    // After each render, check if we need to load more images.
    checkLoadImages();
    
  });
  

  return (
    <div className={"App "+(windowHeight>windowWidth? "mobile":"")}>

      <Search onSearch={searchChanged}/>

      <ImageGrid 
        images={images}
        onImageClick={setLightboxImgInd}
      />

      {
        lightboxImgInd!==null?
          <Lightbox
            key={lightboxImgInd}
            image={images[lightboxImgInd]}
            onNext={()=> setLightboxImgInd((lightboxImgInd + 1) % images.length)}
            onPrev={() => setLightboxImgInd(lightboxImgInd - 1)}
            disablePrev={lightboxImgInd===0}
            onClose={()=> setLightboxImgInd(null)}
          />
          :
          null
      }

    </div>
  );
}