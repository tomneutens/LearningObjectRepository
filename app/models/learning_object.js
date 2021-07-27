import mongoose from "mongoose"
import { v4 as uuidv4 } from 'uuid'
import Logger from "../logger.js"

const Schema = mongoose;

const learningObjectSchema = new mongoose.Schema({
    uuid: {      // UUID (different from the automatically generated _id)
        type: String,
        required: true,
        default: uuidv4, // Use automatically generated uuid as identifier (unique in combination with version and language)
    },
    hruid: {    // Human readable unique id, can be any string chosen by the user -> generates error if chosen id exists. Should be different for each version of the same document.
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    version: {
        type: Number,
        //required: true,
        trim: true
    },
    language: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        enum: ["aa", "ab", "af", "ak", "sq", "am", "ar", "an", "hy", "as", "av", "ae", "ay", "az", "ba", "bm", "eu", "be", "bn", "bh", "bi", "bs", "br", "bg", "my", "ca", "ch", "ce", "zh", "cu", "cv", "kw", "co", "cr", "cs", "da", "dv", "nl", "dz", "en", "eo", "et", "ee", "fo", "fj", "fi", "fr", "fy", "ff", "ka", "de", "gd", "ga", "gl", "gv", "el", "gn", "gu", "ht", "ha", "he", "hz", "hi", "ho", "hr", "hu", "ig", "is", "io", "ii", "iu", "ie", "ia", "id", "ik", "it", "jv", "ja", "kl", "kn", "ks", "kr", "kk", "km", "ki", "rw", "ky", "kv", "kg", "ko", "kj", "ku", "lo", "la", "lv", "li", "ln", "lt", "lb", "lu", "lg", "mk", "mh", "ml", "mi", "mr", "ms", "mg", "mt", "mn", "na", "nv", "nr", "nd", "ng", "ne", "nn", "nb", "no", "ny", "oc", "oj", "or", "om", "os", "pa", "fa", "pi", "pl", "pt", "ps", "qu", "rm", "ro", "rn", "ru", "sg", "sa", "si", "sk", "sl", "se", "sm", "sn", "sd", "so", "st", "es", "sc", "sr", "ss", "su", "sw", "sv", "ty", "ta", "tt", "te", "tg", "tl", "th", "bo", "ti", "to", "tn", "ts", "tk", "tr", "tw", "ug", "uk", "ur", "uz", "ve", "vi", "vo", "cy", "wa", "wo", "xh", "yi", "yo", "za", "zu"],
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
        [{ type: String }],
    educational_goals:
        [  // List of strings containing the identifiers of the educational goals
            {
                source: { type: String },    // Reference to a specific set of educational goals ex. onderwijs.api.vlaanderen.be/onderwijsdoelen
                id: { type: String }           // Unique identifier for the educational goals ex. 10.1.1
            }
        ],
    copyright: String,
    licence: String,
    content_type: {
        required: true,
        type: String,
        enum: ["text/plain", "text/markdown", "text/html", "image/image", "application/pdf", "audio/mpeg"],  // TODO: add all allowed content types
    },
    available: {
        type: Boolean,
        default: true,
    },
    target_ages: [
        {
            type: Number,
            min: 0,
            max: 150,
            get: v => Math.round(v),
            set: v => Math.round(v)
        }
    ],
    difficulty: {
        type: Number,
        min: 0,
        max: 10,
        get: v => Math.round(v),
        set: v => Math.round(v)
    },
    return_value: {
        callback_url: { type: String },
        callback_schema: { type: Object }
    },
    content_location: {
        type: String,
        required: true
    }


}, { timestamps: { createdAt: 'created_at' } });

// Enforce unique index on combination of _id, version and language
learningObjectSchema.index({ uuid: 1, version: 1, language: 1 }, { unique: true });
// Check if content location is correct URL
learningObjectSchema.path('content_location').validate((val) => {
    let urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
    return urlRegex.test(val); q
});

// Check if language exists
/*learningObjectSchema.path('language').validate((val) => {
    let languages = ["aa", "ab", "af", "ak", "sq", "am", "ar", "an", "hy", "as", "av", "ae", "ay", "az", "ba", "bm", "eu", "be", "bn", "bh", "bi", "bs", "br", "bg", "my", "ca", "ch", "ce", "zh", "cu", "cv", "kw", "co", "cr", "cs", "da", "dv", "nl", "dz", "en", "eo", "et", "ee", "fo", "fj", "fi", "fr", "fy", "ff", "ka", "de", "gd", "ga", "gl", "gv", "el", "gn", "gu", "ht", "ha", "he", "hz", "hi", "ho", "hr", "hu", "ig", "is", "io", "ii", "iu", "ie", "ia", "id", "ik", "it", "jv", "ja", "kl", "kn", "ks", "kr", "kk", "km", "ki", "rw", "ky", "kv", "kg", "ko", "kj", "ku", "lo", "la", "lv", "li", "ln", "lt", "lb", "lu", "lg", "mk", "mh", "ml", "mi", "mr", "ms", "mg", "mt", "mn", "na", "nv", "nr", "nd", "ng", "ne", "nn", "nb", "no", "ny", "oc", "oj", "or", "om", "os", "pa", "fa", "pi", "pl", "pt", "ps", "qu", "rm", "ro", "rn", "ru", "sg", "sa", "si", "sk", "sl", "se", "sm", "sn", "sd", "so", "st", "es", "sc", "sr", "ss", "su", "sw", "sv", "ty", "ta", "tt", "te", "tg", "tl", "th", "bo", "ti", "to", "tn", "ts", "tk", "tr", "tw", "ug", "uk", "ur", "uz", "ve", "vi", "vo", "cy", "wa", "wo", "xh", "yi", "yo", "za", "zu"];
    console.log("----------------val: " + JSON.stringify(val));
    return languages.includes(val.toLowerCase())
});*/

// Enforce new version on save
learningObjectSchema.pre('save', function (next) {
    if (this.language) {
        this.language = this.language.toUpperCase();
    }
    this.constructor.findOne({ uuid: this.uuid }).sort('-version').exec((err, prevVersion) => {
        if (err) new Logger().error(err);
        // If no document with the specified uuid, set version to 0 else increment version
        if (!prevVersion) {
            this.version = 0;
        } else {
            this.version = prevVersion.version + 1;
        }
        next();
    });
});

const LearningObject = mongoose.model('LearningObject', learningObjectSchema);

export default LearningObject