import {API, API_KEY} from "./api.js";
const getTrending = async (type, limit = 20) => {
    const apiURL = `${API}/${type}?api_key=${API_KEY}&limit=${limit}&rating=g`;
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Fetch Error',error);
    };
};

const getSearch = async (type,limit = 20 ,searchText,pag) => {
    const apiURL = `${API}/${type}?api_key=${API_KEY}&q=${searchText}&limit=${limit}&offset=${pag}&rating=g&lang=en`
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Fetch Error',error);
    };
}
const getAutocomplete = async (tag) => {
    const apiURL = `${API}/search/tags?api_key=${API_KEY}&q=${tag}`
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Fetch Error',error);
    };
}

export default {
    getTrending,
    getSearch,
    getAutocomplete
}