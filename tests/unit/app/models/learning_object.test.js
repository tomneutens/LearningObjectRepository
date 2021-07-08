import { afterEach, beforeAll, afterAll, expect, test } from '@jest/globals'
import { connect, closeDatabase, clearDatabase } from "../../../utils/db.js"
import LearningObject from "../../../../app/models/learning_object.js"

beforeAll(async () => await connect());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());


describe("Tests for the creation of learning objects", () => {
    test("Test if new learning object is created correctly", async () => {
        const loSpec = {
            hruid: "testobject1",
            language: "EN",
            title: "Test object 1 title",
            description: "This is a description of test object 1",
            keywords: ["a", "b", ",", "1"],
            copyright: "cc by",
            licence: "none",
            content_type: "text/plain",
            available: true,
            target_ages: [12, 13, 17],
            difficulty: 9,
            return_value: {
                callback_url: "",
                callback_schema: ""
            },
            content_location: "http://www.dwengo.org"
        };
        const lo = new LearningObject(loSpec);
        const loId = await lo.save();
        const fetchedLo = await LearningObject.findById(loId["_id"]).lean(); // Lean converts query result to pojo

        // Check if all the properties are correct
        expect(fetchedLo.version).toEqual(0);
        expect(fetchedLo.hruid).toEqual(loSpec.hruid);
        expect(fetchedLo.language).toEqual(loSpec.language.toLowerCase().trim());
        expect(fetchedLo.title).toEqual(loSpec.title.trim());
        expect(fetchedLo.description).toEqual(loSpec.description.trim());
        expect(fetchedLo.keywords).toEqual(loSpec.keywords);
        expect(fetchedLo.copyright).toEqual(loSpec.copyright);
        expect(fetchedLo.licence).toEqual(loSpec.licence);
        expect(fetchedLo.content_type).toEqual(loSpec.content_type);
        expect(fetchedLo.available).toEqual(loSpec.available);
        expect(fetchedLo.target_ages).toEqual(loSpec.target_ages);
        expect(fetchedLo.difficulty).toEqual(loSpec.difficulty);
        expect(fetchedLo.return_value.callback_url).toEqual(loSpec.return_value.callback_url);
        expect(fetchedLo.return_value.callback_schema).toEqual(loSpec.return_value.callback_schema);
        expect(fetchedLo.content_location).toEqual(loSpec.content_location);
    });

    test("Test if version number is incremented automatically after new save", async () => {
        let loSpec = {
            hruid: "testobject1",
            language: "EN",
            title: "Test object 1 title",
            description: "This is a description of test object 1",
            keywords: ["a", "b", ",", "1"],
            copyright: "cc by",
            licence: "none",
            content_type: "text/plain",
            available: true,
            target_ages: [12, 13, 17],
            difficulty: 9,
            return_value: {
                callback_url: "",
                callback_schema: ""
            },
            content_location: "http://www.dwengo.org"
        };
        const lo = new LearningObject(loSpec);
        let loId = await lo.save();
        loSpec["uuid"] = loId.uuid;
        loSpec["hruid"] = "testobject1-v2"
        const lo2 = new LearningObject(loSpec);
        let loId2 = await lo2.save(); // save a second time
        const fetchedLo = await LearningObject.findById(loId2["_id"]).lean(); // Lean converts query result to pojo

        // Check if all the properties are correct
        expect(fetchedLo.version).toEqual(1);
    });

    test("Test rounding of difficulty and target age", async () => {
        let loSpec = {
            hruid: "testobject1",
            language: "EN",
            title: "Test object 1 title",
            description: "This is a description of test object 1",
            keywords: ["a", "b", ",", "1"],
            copyright: "cc by",
            licence: "none",
            content_type: "text/plain",
            available: true,
            target_ages: [12.2, 13.8, 17],
            difficulty: 9.6,
            return_value: {
                callback_url: "",
                callback_schema: ""
            },
            content_location: "http://www.dwengo.org"
        };
        const lo = new LearningObject(loSpec);
        let loId = await lo.save();
        const fetchedLo = await LearningObject.findById(loId["_id"]).lean(); // Lean converts query result to pojo

        // Check if all the properties are correct
        expect(fetchedLo.target_ages).toEqual([12, 14, 17]);
        expect(fetchedLo.difficulty).toBe(10);
    });

    test("Test invalid language", async () => {
        let loSpec = {
            hruid: "testobject1",
            language: "NOLANG",
            title: "Test object 1 title",
            description: "This is a description of test object 1",
            keywords: ["a", "b", ",", "1"],
            copyright: "cc by",
            licence: "none",
            content_type: "text/plain",
            available: true,
            target_ages: [12.2, 13.8, 17],
            difficulty: 9.6,
            return_value: {
                callback_url: "",
                callback_schema: ""
            },
            content_location: "http://www.dwengo.org"
        };
        const lo = new LearningObject(loSpec);
        console.log("created new learning object");
        expect.assertions(1);
        try {
            await lo.save();
        } catch (e) {
            expect(e.message).toMatch("LearningObject validation failed");
        }
    });

    test("Test invalid data type", async () => {
        let loSpec = {
            hruid: "testobject1",
            language: "NOLANG",
            title: "Test object 1 title",
            description: "This is a description of test object 1",
            keywords: ["a", "b", ",", "1"],
            copyright: "cc by",
            licence: "none",
            content_type: "abcdefghijklmopqrstuvwxyz",
            available: true,
            target_ages: [12.2, 13.8, 17],
            difficulty: 9.6,
            return_value: {
                callback_url: "",
                callback_schema: ""
            },
            content_location: "http://www.dwengo.org"
        };
        const lo = new LearningObject(loSpec);
        console.log("created new learning object");
        expect.assertions(1);
        try {
            await lo.save();
        } catch (e) {
            expect(e.message).toMatch("LearningObject validation failed");
        }
    });


    // TODO: extensively extend the number of test cases for the LearningObject model.
})