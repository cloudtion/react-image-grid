
import ImageGrid from './ImageGrid';

import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";

declare global {
  interface Window {[key: string]: any; REACT_IMAGE_GRID_DATA: any; __GLOBAL_VAR__: any; }
}

// This method is used for the WordPress plugin.
function inject(){

  document.querySelectorAll('.react-image-grid-data').forEach(grid_script=>{

      const spl = grid_script.id.split('-');
      const id = parseInt(spl[spl.length-1]);// Grab numeric id from id string.

  
      const parent = grid_script.parentElement;
      const root_el = document.createElement('div');
      
      root_el.id = `react-image-grid-root-${id}`;
    
      parent?.appendChild(root_el);
    
      const root = ReactDOM.createRoot(root_el);
      
      root.render(
        <React.StrictMode>
          <ImageGrid images={JSON.parse(window[`REACT_IMAGE_GRID_DATA_${id}`])}/>
        </React.StrictMode>
      );
  });
}

window.addEventListener('load', inject);