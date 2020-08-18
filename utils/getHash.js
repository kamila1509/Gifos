const getHash = () => 
    location.hash.slice(location.hash.indexOf('/')+1) || '/';
    export default getHash;