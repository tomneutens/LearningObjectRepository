import { expect, test } from "@jest/globals"
import BlockImageProcessor from "../../../../../app/processors/image/block_image_processor.js"
import InvalidArgumentError from "../../../../../app/utils/invalid_argument_error.js";
import DOMPurify from 'isomorphic-dompurify';

test("Test if block image with correct input is rendered correctly.", () => {
    let proc = new BlockImageProcessor();
    let inputUrl = "https://dwengo.org/wp-content/uploads/2017/06/dwengo2.png";
    let inputAlt = "Dwengo logo";
    let expectedOutput = DOMPurify.sanitize(`<div>${DOMPurify.sanitize(`<img src="${inputUrl}" alt="${inputAlt}">`)}</div>`);
    expect(proc.render(inputUrl, {altText: inputAlt})).toBe(expectedOutput);
});

test("Test if block image with correct input is rendered correctly without alt text.", () => {
    let proc = new BlockImageProcessor();
    let inputUrl = "https://dwengo.org/wp-content/uploads/2017/06/dwengo2.png";
    let expectedOutput = DOMPurify.sanitize(`<div>${DOMPurify.sanitize(`<img src="${inputUrl}" alt="">`)}</div>`);
    expect(proc.render(inputUrl)).toBe(expectedOutput);
});

test("Test if block image render with invalid url throws error", () => {
    let proc = new BlockImageProcessor();
    let inputUrl = "https/dwengo.org/wp-content/uploads/2017/06/dwengo2.png";
    let inputAlt = "Dwengo logo";
    expect(() => {
        proc.render(inputUrl, {altText: inputAlt})
    }).toThrow(InvalidArgumentError)
});

test("Test if block image render with empty url throws error", () => {
    let proc = new BlockImageProcessor();
    let inputUrl = "";
    let inputAlt = "Dwengo logo";
    expect(() => {
        proc.render(inputUrl, {altText: inputAlt})
    }).toThrow(InvalidArgumentError)
});


test("Test if block image render with undefined url throws error", () => {
    let proc = new BlockImageProcessor();
    let inputUrl = undefined;
    let inputAlt = "Dwengo logo";
    expect(() => {
        proc.render(inputUrl, {altText: inputAlt})
    }).toThrow(InvalidArgumentError)
});


test("Test if block image render with undefined alt becomes empty string", () => {
    let proc = new BlockImageProcessor();
    let inputUrl = "https://dwengo.org/wp-content/uploads/2017/06/dwengo2.png";
    let inputAlt = undefined;
    let expectedOutput = DOMPurify.sanitize(`<div>${DOMPurify.sanitize(`<img src="${inputUrl}" alt="">`)}</div>`);
    expect(proc.render(inputUrl, {altText: inputAlt})).toBe(expectedOutput);
});

test("Test if dirty input is sanitized", () => {
    let proc = new BlockImageProcessor();
    let inputUrl = 'https://dwengo.org';
    let inputAlt = 'Dwengo logo"  onerror=alert(1)';
    let expectedOutput = DOMPurify.sanitize(`<div>${DOMPurify.sanitize(`<img src="${inputUrl}" alt="${inputAlt}">`)}</div>`);
    expect(proc.render(inputUrl, {altText: inputAlt})).toBe(expectedOutput);
});