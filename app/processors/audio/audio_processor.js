import Processor from "../processor.js";
import { isValidHttpUrl } from '../../utils/utils.js'
import InvalidArgumentError from '../../utils/invalid_argument_error.js'
import DOMPurify from 'isomorphic-dompurify';

class AudioProcessor extends Processor {
    constructor() {
        super();
    }

    /**
     * 
     * @param {string} audioUrl 
     * @param {object} args Optional arguments specific to the render function of the AudioProcessor
     * @returns 
     */
    render(audioUrl, args = {}) {
        // if (!isValidHttpUrl(audioUrl)) {
        //     throw new InvalidArgumentError();
        // } else {
        return DOMPurify.sanitize(`<audio controls>
                <source src="${audioUrl}" type="audio/mpeg">
                Your browser does not support the audio element.
                </audio>`);
        // }
    }
}

export default AudioProcessor;