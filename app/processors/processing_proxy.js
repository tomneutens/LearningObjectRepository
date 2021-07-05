import BlockImageProcessor from "./image/block_image_processor.js";
import InlineImageProcessor from "./image/inline_image_processor.js";
import MarkdownProcessor from "./markdown/markdown_processor.js";
import TextProcessor from "./text/text_processor.js";
import { ProcessorContentType } from "./content_type.js"


class ProcessingProxy {
    constructor(){
        this.processors = {        }
        this.processors[ProcessorContentType.IMAGE_INLINE] = new InlineImageProcessor();
        this.processors[ProcessorContentType.IMAGE_BLOCK] = new BlockImageProcessor();
        this.processors[ProcessorContentType.TEXT_MARKDOWN] = new MarkdownProcessor();
        this.processors[ProcessorContentType.TEXT_PLAIN] = new TextProcessor();
    }

    /**
     * 
     * @param {ProcessorContentType} contentType 
     * @param {string} inputString 
     * @param {object} args 
     */
    render(contentType, inputString, args = {}){
        return this.processors[contentType].render(inputString, args);
    }
}

export default ProcessingProxy;