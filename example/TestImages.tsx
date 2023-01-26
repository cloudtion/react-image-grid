
const FILE_COUNT = 3;
const SINGLE_FILE_PAGE_COUNT = 5;
const IMAGE_COUNT = 20;

export async function getTestImages(page_ind : number) : Promise<any[]> {
    
    page_ind = page_ind - 1;

    const FILE_IND = Math.floor(page_ind/SINGLE_FILE_PAGE_COUNT) % FILE_COUNT;
    const FILE = (await import(`./assets/test_data/TEST_IMAGES_${FILE_IND+1}.json`)).default;
    const SLICE_IND = page_ind % SINGLE_FILE_PAGE_COUNT;

    const imgs = FILE.slice(SLICE_IND*IMAGE_COUNT, (SLICE_IND+1)*IMAGE_COUNT);

    return imgs;
}