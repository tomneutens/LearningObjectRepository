class LearningObjectMarkdownRenderer {
    learingObjectPrefix = '@learning-object';
    heading(text, level) {
        const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

        return `
                <h${level}>
                    <a name="${escapedText}" class="anchor" href="#${escapedText}">
                    <span class="header-link"></span>
                    </a>
                    ${text}
                </h${level}>`;
    };
    link(href, title, text) {
        console.log("rendering.............")
        if (!href.startsWith(this.learingObjectPrefix)) {
            return false; // Let marked process the link
        } else {
            // TODO: Process the learning object and render it as defined by the content type.
            return `<b><a href=${href}>Test: ${title} - ${text}</a></b>`
        }
    }

}

export default LearningObjectMarkdownRenderer