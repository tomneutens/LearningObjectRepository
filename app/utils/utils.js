

/**
 * 
 * @param {string} urlString 
 * @returns {boolean} true if valid url.
 */
let isValidHttpUrl = function(urlString){
    let url;
    try {
        url = new URL(urlString);
    }catch(e){
        return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
}


export { isValidHttpUrl }

