import mongoose from "mongoose"
import { v4 as uuidv4 } from 'uuid'

const Schema = mongoose;

const LearningObjectSchema = new Schema({
    _id: {      // UUID 
        type: String,
        default: uuidv4, // Use uuid as unique identifier
        unique: true
    },
    hruid: {    // Human readable unique id
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    title: {    // Title of the learning object
        type: String,
        required: true,
        trim: true,
    },
    description: {  //Description of the learning object
        type: String,
        required: true,
        trim: true,
    },
    keywords:   // Keywords = list of strings
        [{type: String}],
    educational_goals:
        [  // List of strings containing the identifiers of the educational goals
            {
                source: { type: String },    // Reference to a specific set of educational goals ex. onderwijs.api.vlaanderen.be/onderwijsdoelen
                id: {type: String}           // Unique identifier for the educational goals ex. 10.1.1
            }
        ]



});

