import { expect, test } from "@jest/globals"
import DOMPurify from 'isomorphic-dompurify';
import ProcessingProxy from "../../../app/processors/processing_proxy.js"
import { ProcessorContentType } from "../../../app/processors/content_type.js"

test("Test processing of text/plain", () => {
    let proxy = new ProcessingProxy();
    let input = "Just plain text."
    let output = DOMPurify.sanitize(input);
    expect(proxy.render(ProcessorContentType.TEXT_PLAIN, input)).toBe(output);

});

test("Test processing of text/markdown", () => {
    let proxy = new ProcessingProxy();
    let input = "[Duck Duck Go](https://duckduckgo.com)"
    let output = DOMPurify.sanitize('<p><a href="https://duckduckgo.com">Duck Duck Go</a></p>');
    expect(proxy.render(ProcessorContentType.TEXT_MARKDOWN, input).trim()).toBe(output.trim());
});

test("Test processing of image/image", () => {
    let proxy = new ProcessingProxy();
    let input = "https://dwengo.org/wp-content/uploads/2017/06/dwengo2.png";
    let output = DOMPurify.sanitize(`<img src="${input}" alt="">`);
    expect(proxy.render(ProcessorContentType.IMAGE_INLINE, input)).toBe(output);
});

//TODO: Test processing of complex content = md/html/lia with references to other learning objects