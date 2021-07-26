import Processor from "../processor.js";
import { isValidHttpUrl } from '../../utils/utils.js'
import InvalidArgumentError from '../../utils/invalid_argument_error.js'
import DOMPurify from 'isomorphic-dompurify';
import Logger from "../../logger.js";

let logger = Logger.getLogger()
class PdfProcessor extends Processor {
    constructor() {
        super();
    }

    /**
     * 
     * @param {string} pdfUrl 
     * @param {object} args Optional arguments specific to the render function of the PdfProcessor
     * @returns 
     */
    render(pdfUrl, args = {}) {
        // if (!isValidHttpUrl(pdfUrl)) {
        //     throw new InvalidArgumentError();
        // } else {
        // TODO DOMPurify.sanatize deletes iframe, embed or object tags. => solve this
        // return DOMPurify.sanitize(`<object data="${pdfUrl}" width="100%" height="800px"></object>`);
        return `<embed src="${pdfUrl}" type="application/pdf" width="100%" height="800px"/>`
        // }
    }
}

export default PdfProcessor;