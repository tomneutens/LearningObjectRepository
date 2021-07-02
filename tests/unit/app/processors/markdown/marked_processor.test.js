import { expect, test } from "@jest/globals"
import MarkedProcessor from "../../../../../app/processors/markdown/marked_processor.js"


test("Test if metadata en markdown are correctly split into distinct parts.", () => {
    let proc = new MarkedProcessor();
    let input = "---\nlayout: post\ntitle: Blogging Like a Hacker\n---\n\n[Duck Duck Go](https://duckduckgo.com)"
    let metadata = {layout: "post", title: "Blogging Like a Hacker"};
    let markdown = "[Duck Duck Go](https://duckduckgo.com)";
    let procFile = proc.stripYAMLMetaData(input);
    expect(procFile.original).toBe(input);
    expect(procFile.metadata).toEqual(expect.objectContaining(metadata));
    expect(procFile.markdown).toBe(markdown.trim());
});

test("Test markdown processing without metadata.", () => {
    let proc = new MarkedProcessor();
    let input = "[Duck Duck Go](https://duckduckgo.com)"
    let procFile = proc.stripYAMLMetaData(input);
    expect(procFile.original).toBe(input);
    expect(procFile.metadata).toEqual(expect.objectContaining({}));
    expect(procFile.markdown).toBe(input.trim());
});

test("Test markdown processing without markdown content.", () => {
    let proc = new MarkedProcessor();
    let input = "---\nlayout: post\ntitle: Blogging Like a Hacker\n---"
    let metadata = {layout: "post", title: "Blogging Like a Hacker"};
    let procFile = proc.stripYAMLMetaData(input);
    expect(procFile.original).toBe(input);
    expect(procFile.metadata).toEqual(expect.objectContaining(metadata));
    expect(procFile.markdown).toBe("");
});

test("Test markdown processing with empty string.", () => {
    let proc = new MarkedProcessor();
    let input = ""
    let procFile = proc.stripYAMLMetaData(input);
    expect(procFile.original).toBe(input);
    expect(procFile.metadata).toEqual(expect.objectContaining({}));
    expect(procFile.markdown).toBe(input.trim());
});

test("Test random string without dashes.", () => {
    let proc = new MarkedProcessor();
    let input = "sdqkfjmqifjemifjmqdjsfmljmfljmsld mlk jsqmlqi fjemqej miqemij mqleifjmqiefj mqijmi fjqmej fmqijef meijqmeij fieqmi emqif ";
    let procFile = proc.stripYAMLMetaData(input);
    expect(procFile.original).toBe(input);
    expect(procFile.metadata).toEqual(expect.objectContaining({}));
    expect(procFile.markdown).toBe(input.trim());
});

test("Test random string with dashes.", () => {
    let proc = new MarkedProcessor();
    let input = "sdqkfjmq---ifjemifjmq---djsfmljmfljmsld mlk jsqmlqi fjemqej miqemij m---qleifjmqiefj mqijmi fjqmej ---fmqijef meijqmeij fieqmi emqif ";
    let procFile = proc.stripYAMLMetaData(input);
    expect(procFile.original).toBe(input);
    expect(procFile.metadata).toEqual(expect.objectContaining({}));
    expect(procFile.markdown).toBe(input.trim());
});

test("Test if metadata en markdown are correctly split into distinct parts if leadin and tailing whitespace.", () => {
    let proc = new MarkedProcessor();
    let input = "   ---\nlayout: post\ntitle: Blogging Like a Hacker\n---  \n\n[Duck Duck Go](https://duckduckgo.com)  "
    let metadata = {layout: "post", title: "Blogging Like a Hacker"};
    let markdown = "[Duck Duck Go](https://duckduckgo.com)";
    let procFile = proc.stripYAMLMetaData(input);
    expect(procFile.original).toBe(input);
    expect(procFile.metadata).toEqual(expect.objectContaining(metadata));
    expect(procFile.markdown).toBe(markdown.trim());
});
