import marked from 'marked'
import DOMPurify from 'isomorphic-dompurify';
import LearningObjectRenderer from './learing_object_renderer.js';
import ObjectConverter from '../../utils/object_converter.js';
import yaml from "js-yaml"
import Logger from '../../logger.js';

class MarkedProcessor {
    logger = Logger.getLogger();
    constructor(){
        // A bit stupid but marked does not work with an instance of a class only with plain object
        const renderer = new ObjectConverter().toJSON(new LearningObjectRenderer());
        marked.use({ renderer });
    }

    /**
     * 
     * @param {string} mdText Plain markdown string to be converted to html. May contain links to learning objects which results in recursive processing.
     * @returns The sanitized version of the generated html.
     */
    render(mdText){
        return DOMPurify.sanitize(marked(mdText));
    }

    /**
     * 
     * @param {string} mdTextWithYAMLMeta Markdown string with metadata. Compatible with jekyll (https://jekyllrb.com/docs/front-matter/)
     * @returns {object} {original input, metadata string, }
     */
    stripYAMLMetaData(mdTextWithYAMLMeta){
        let trimmedInput = mdTextWithYAMLMeta.trim();
        const metadataregex = /(?<=^---).+?(?=---)/s
        const mdregex =  /(?<=---.*---).+?$/s
        let metadataText = trimmedInput.match(metadataregex);
        let mdText = "";

        if (metadataText){
            // Yes, metadata
            metadataText = metadataText[0].trim();
            mdText = trimmedInput.match(mdregex);
            mdText = mdText ? mdText[0].trim() : "";
        }else{
            // No metadata
            metadataText = "";
            mdText = trimmedInput;
        }

        let metadata = {};
        try {
            metadata = yaml.load(metadataText);
        } catch (e) {
            this.logger.error(`Unable to convert metadata to YAML: ${e}`);
        }
        return {
            original: mdTextWithYAMLMeta,
            metadata: metadata,
            markdown: mdText
        }
    }
}

export default MarkedProcessor;