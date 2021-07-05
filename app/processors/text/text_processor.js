import DOMPurify from 'isomorphic-dompurify'
import Processor from "../processor.js"

class TextProcessor extends Processor{
    constructor(){
        super();
    }

    /**
     * 
     * @param {string} plain text 
     * @param {object} args Optional arguments 
     * @returns 
     */
    render(text, args = {}){
        // Sanitize plain text to prevent xss.
        return DOMPurify.sanitize(text);
    }
}

export default TextProcessor;