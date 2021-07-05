import Processor from "../processor.js";
import processingProxy from "../processing_proxy.js"

class LearningObjectProcessor extends Processor{
    constructor(){
        super();
        this.processingProxy = new this.processingProxy();
    }

    /**
     * 
     * @param {string} learningObjectId 
     * @param {object} args Optional arguments 
     * @returns 
     */
    render(learningObjectId, args = {}){
        //TODO: Get original learning object data and metadata from the database and pass to the processingproxy with the correct content type.
        return this.processingProxy.process("text/plain", "");
    }
}

export default LearningObjectProcessor;