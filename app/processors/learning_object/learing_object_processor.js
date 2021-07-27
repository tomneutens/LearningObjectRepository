import Processor from "../processor.js";
import ProcessingProxy from "../processing_proxy.js"

class LearningObjectProcessor extends Processor {
    constructor() {
        super();
        this.processingProxy = new ProcessingProxy();
    }

    /**
     * 
     * @param {string} learningObjectId 
     * @param {object} args Optional arguments 
     * @returns 
     */
    render(learningObjectId, args = {}) {
        //TODO: Get original learning object data and metadata from the database and pass to the processingproxy with the correct content type.
        console.log("render leerobject")
        return this.processingProxy.render("text/plain", "This will be a learningObject");
    }
}

export default LearningObjectProcessor;