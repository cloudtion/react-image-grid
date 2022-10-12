import LazyLoadImage from "./LazyLoadImage";
import { useRef } from "react";
import { useWindowSize } from "./hooks";


// Accepts props:
// "colThreshold" - number - Divide the window width by this number and round it to calculate the number of columns that will be used.
// "minColCount"  - int    - Sets the minimum number of columns that will be used, overwriting the column count calculated by the column threshold.
export default function ImageGrid(props){

    const MINIMUM_COLUMN_COUNT = props.minColCount ?? 3;
    const COLUMN_THRESHOLD = props.colThreshold ?? 300;

    const windowSize = useWindowSize();

    const calculated_column_count = Math.round(windowSize.width/COLUMN_THRESHOLD);

    const column_count = calculated_column_count<MINIMUM_COLUMN_COUNT? MINIMUM_COLUMN_COUNT : calculated_column_count;
  
    const gridRef = useRef(null);

    const grid_width = gridRef.current? gridRef.current.offsetWidth : 0;

    const column_width = grid_width/column_count;

    const image_elements = props.images.map((img, ind)=>{

        return (
            <LazyLoadImage 
                key={ind} 
                src={img.urls.small} 
                alt={img.alt_description} 
                onClick={ ()=> props.onImageClick(ind) }
                showLoadingSpinner={false} // Since there are initially going to be many images loading initially, we don't want to clutter the page wth spinners
            />
        );
    });

    const columns = [];

    // We'll keep track of the heights of the pictures in each column in order to evenly distribute the pictures.
    // If the heights of each picture returned from the API were random, this may be unnecessary, but it will ensure that 
    // there isn't a chance of any column gradually growing larger than the others.
    let column_height_tallies = [];
    
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

        // This is how high the image will actually be in the grid as opposed to its full-resolution height.
        const image_scaled_height = ((img.height/img.width)*grid_width);

        // Add the height of the image to the column's tally.
        column_height_tallies[0].height += image_scaled_height;
    }

    const column_elements = columns.map((col_els_arr, ind)=>{

        return (
            <div key={ind} className="img-grid-col" style={{width: column_width}}>
                { col_els_arr }
            </div>
        )
    })

    return (
        <div 
            ref={gridRef}
            className="img-grid" 
        >
            { column_elements }
        </div>
    )
}