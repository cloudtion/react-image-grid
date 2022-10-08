# React Image Grid

Simple grid photo gallery with lightbox written in React.  

## Usage

1. Clone the repository and navigate into cloned folder.

2. Copy the file **example.env** and name the copy **.env**

3. Open the **.env** file that you just made and set the value of `REACT_APP_UNSPLASH_ACCESS_KEY` to your Unsplash API access key. Then save and close the file.

4. Open a terminal in the current folder and run `npm install`.

5. When the install is finished, run `npm start` to start the local dev server.

6. Open your browser and navigate to http://localhost:3000 and you should see an image gallery load.

If you do not see anything, make sure that you set the environment variable `REACT_APP_UNSPLASH_ACCESS_KEY` to the correct value. (Note that you will have to stop the dev server and rerun `npm start` when you change the environment variable.)

## Building

Having done steps 1 ~ 4 of the "Usage" section above, run `npm run build`.

The static site files should be output in a newly created directory called "**build**".


### Note About the Dev Environment

To avoid unnecessary calls to the API, when in development mode, only the first page of results from the Unsplash API are being used.

i.e. If you search "cats", the API will be queried and the results shown, but as you scroll down the page, the same images will continue to be added to the grid gallery. Since the browser will cache the first API result, only the first set of images returned needed a call to the API. Make sure you don't have "Disable Cache" enabled in your browser's Dev Tools to make use of this.

To change this, change `REACT_APP_DEV_RECYCLE_API_QUERIES` in **.env** to `false`

## Warning

[Unsplash's API Guidelines](https://help.unsplash.com/en/articles/2511245-unsplash-api-guidelines) require that you keep your **Access Key** confidential, meaning that you'll need to use a proxy in production instead of accessing the Unsplash API directly in the end-user's browser.