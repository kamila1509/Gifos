import {API_KEY} from "./api.js";

const postGif = async (file) => {
    const apiURL = `https://upload.giphy.com/v1/gifs?api_key=${API_KEY}`;
    try {
        const OtherParam = {
            method: "POST",
            body: file
        }
        const response = await fetch(apiURL,OtherParam);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log('Fetch Error',error);
    };
};

export default {
    postGif
}