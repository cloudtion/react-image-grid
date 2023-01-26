# React Image Grid

An image-grid/gallery for react with built-in lazy loading and lightbox.

  

## Install
  
`npm install --save-dev react-image-grid`

  

## Basic Usage
    import ImageGrid from 'react-image-grid';
    
    function App(props){
    
         const IMAGES = [
            {
                src: 'https://example.com/my-image-1.jpg',
                alt: 'Sample Alt Text 1',
            },
            {
                src: 'https://example.com/my-image-2.jpg',
                alt: 'Sample Alt Text 2',
            },
        ];
    
        return (
           <ImageGrid images={IMAGES}/>
        );
    }

## Props

| Name| Type | Description |
|--|--|--|
| **images** | array | Array of objects with any valid combination of properties described in the **Image Properties** section below. |
| **lazyLoad** | boolean | Sets the default lazyLoad property for images. This can be overriden on a per-image basis using the **lazyLoad** image property. Defaults to true. |
| **lightboxEnabled** | boolean | Whether or not to show an image in a pop-up lightbox when the image is clicked. Defaults to true.
| **onBottomVisible** | callback | Called when the bottom of the grid is visible. Supply a function that loads more images to dynamically add images as the user scrolls down the page.|
| **bottomTriggerThreshold**| number | The number of pixels before the bottom of the image grid is actually seen to call the **onBottomVisible** callback. Defaults to 350. |


  

## Image Properties

|Property Name| Type | Description | 
|--|--|--|
| **src** | string | The url pointing to the image. (Required)|
| **alt** | string | [Alt text for the image](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/alt) (Required)|
| **title** | string | Text to be displayed on image hover if `hoverTitle` is enabled. (Optional) |
| **showHoverTitle** | boolean | Whether or not to display the `title` on mouse hover. (Optional. Defaults to true.) |
| **lazyLoad** | boolean | Whether or not to wait for this image to appear on screen to load the image. (Optional. Defaults to false.) |