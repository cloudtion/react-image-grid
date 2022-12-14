
# React Image Grid

An image-grid/gallery for react with built-in lazy loading and lightbox.

  
## Install

`npm install react-image-grid`

## Basic Usage
  
	var ImageGrid = import('react-image-grid');
	
	function App(props){
		
		const images = [
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
			<div>
				<ImageGrid images={images}/>
			</div>
		);
	}
  
## Props
| Prop | Type | Description |
|--|--|--|
|**images**|array|Array of objects with any valid combination of properties described in the **Image Properties** section below.|
|**lazyLoad**|bool|Sets the default lazyLoad property for images. This can be overriden on a per-image basis using the **lazyLoad** image property. |

  
## Image Properties
| Property Name | Type | Description  |
|--|--|--|
| **src** | string | The url pointing to the image. |
| **alt** | string |[Alt text for the image](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/alt) |
| **title** | string | Text to be displayed on image hover if `hoverTitle` enabled.|
| **showHoverTitle** | bool | Whether or not to display the `title` on mouse hover.|
| **lazyLoad** | bool | Whether or not to wait for this image to appear on screen to load the image.|
| **width**| number | Used to force a width for the specified image. If not specified will default to the containing column width.
| **height** | number | Used to force a height for the specified image. If not specified will be automatically set using the image's aspect ratio and width.
 
