import InlineImageProcessor from "./inline_image_processor.js"
import DOMPurify from 'isomorphic-dompurify';

class BlockImageProcessor extends InlineImageProcessor{
    constructor(){
        super();
    }

    /**
     * 
     * @param {string} imageUrl 
     * @param {object} args Optional arguments specific to the render function of the BlockImageProcessor
     * @returns 
     */
    render(imageUrl, args = { altText: ""}){
        let inlineHtml = super.render(imageUrl, args);
        return DOMPurify.sanitize(`<div>${inlineHtml}</div>`);
    }
}

export default BlockImageProcessor;