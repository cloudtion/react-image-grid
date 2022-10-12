
import { createApi } from 'unsplash-js';
import { fetch } from 'whatwg-fetch';

// If we're in a development environment, we'll keep using the first page of all requests.
// The first page of each request will be cached, so we we'll only be hitting the API once for each query.
const TEST_MODE = process.env.NODE_ENV === 'development' && process.env.REACT_APP_DEV_RECYCLE_API_QUERIES === 'true';

const ACCESS_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

const unsplash = createApi({
    accessKey: ACCESS_KEY,
    fetch, // Unsplash API needs a fetch polyfill when being used in the browser.
});


// Get images from the Unsplash API.
export async function getImages(perPage=20, page = 1){
    
    const {response} = await unsplash.photos.list({
        page: TEST_MODE? 1 : page,
        perPage,
    });

    return response.results;
}

// Search for images using the Unsplash API. 
export async function getSearchImages(query='', perPage=20, page = 1){
    
    const {response} = await unsplash.search.getPhotos({
        query,
        page: TEST_MODE? 1 : page,
        perPage,
    });

    return response.results;
}