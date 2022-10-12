
import { createApi } from 'unsplash-js';
import { InitParams } from 'unsplash-js/dist/helpers/request';

// Have to import fetch polyfill without types because it seems that @types/whatwg-fetch was incorrectly deprecated.
// https://github.com/Microsoft/TypeScript/issues/22380
const {fetch} : any = require('whatwg-fetch');

// If we're in a development environment, we'll keep using the first page of all requests.
// The first page of each request will be cached, so we we'll only be hitting the API once for each query.
const TEST_MODE = process.env.NODE_ENV === 'development' && process.env.REACT_APP_DEV_RECYCLE_API_QUERIES === 'true';

const ACCESS_KEY : string | undefined = process.env.REACT_APP_UNSPLASH_ACCESS_KEY ;

const unsplash = createApi({
    accessKey: ACCESS_KEY,
    fetch,
} as InitParams);

// Get images from the Unsplash API.
export async function getImages(perPage : number = 20, page : number = 1) : Promise<any[]> {
    
    const {response} = await unsplash.photos.list({
        page: TEST_MODE? 1 : page,
        perPage,
    });

    if( response ){

        return response.results;
    }

    return [];
}

// Search for images using the Unsplash API. 
export async function getSearchImages(query : string = '', perPage : number = 20, page : number = 1) : Promise<any[]> {
    
    const {response} = await unsplash.search.getPhotos({
        query,
        page: TEST_MODE? 1 : page,
        perPage,
    });

    if( response ){

        return response.results;
    }

    return [];
}