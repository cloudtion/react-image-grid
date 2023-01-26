
import React, {useEffect, useState, useRef} from "react";

import ImageGrid, { ImageGridImage } from "../src/ImageGrid";
import { getTestImages } from './TestImages';
import Logo from './assets/react_img_grid_logo.svg';
import GithubLogo from './assets/github_mark.svg';

// The number of images to request from th
const FETCH_IMAGE_COUNT = 20;

export default function App() : React.ReactElement {

  // Used to mark that an API request is in progress.
  const isLoadingRef = useRef<boolean>(false);

  // Used to flag when the API returns the last results of a query.
  // This prevents scrolling after the last results from continuing to call the API.
  const allImagesLoadedRef = useRef<boolean>(false);  

  const [images, setImages] = useState<ImageGridImage[]>([]);

  async function getNextImages(next_page=null){
  
    const next_page_ind = next_page ?? (images.length/FETCH_IMAGE_COUNT)+1;
    
    return await getTestImages(next_page_ind);
  }

  function loadMoreImages(){

    if( isLoadingRef.current === false ){
      
      isLoadingRef.current = true;

      getNextImages()
          .then(additional_images=>{
            
            if( additional_images.length < 1 ){
            
              allImagesLoadedRef.current = true;
            }
            
            const new_images = [...images, ...additional_images];

            setImages( new_images );

            isLoadingRef.current = false;
          })
          .catch(console.error);
    }
  }


  useEffect(()=>{

    loadMoreImages();
    
  }, []);


  return (
    <div className="App">

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

      <ImageGrid 
        images={images}
        onBottomVisible={loadMoreImages}
        bottomTriggerThreshold={500}
      />

    </div>
  );
}