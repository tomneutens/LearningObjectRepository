import mongoose from "mongoose"
import { v4 as uuidv4 } from 'uuid'

const Schema = mongoose;

const learningObjectSchema = new Schema({
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
        type: String,
        required: true,
        trim: true
    },
    language: {
        type: String,
        required: true,
        uppercase: true,
        trim: true,
        enum: ["AF", "AX", "AL", "DZ", "AS", "AD", "AO", "AI", "AQ", "AG", "AR", "AM", "AW", "AU", "AT", "AZ", "BS", "BH", "BD", "BB", "BY", "BE", "BZ", "BJ", "BM", "BT", "BO", "BQ", "BA", "BW", "BV", "BR", "IO", "BN", "BG", "BF", "BI", "KH", "CM", "CA", "CV", "KY", "CF", "TD", "CL", "CN", "CX", "CC", "CO", "KM", "CG", "CD", "CK", "CR", "CI", "HR", "CU", "CW", "CY", "CZ", "DK", "DJ", "DM", "DO", "EC", "EG", "SV", "GQ", "ER", "EE", "ET", "FK", "FO", "FJ", "FI", "FR", "GF", "PF", "TF", "GA", "GM", "GE", "DE", "GH", "GI", "GR", "GL", "GD", "GP", "GU", "GT", "GG", "GN", "GW", "GY", "HT", "HM", "VA", "HN", "HK", "HU", "IS", "IN", "ID", "IR", "IQ", "IE", "IM", "IL", "IT", "JM", "JP", "JE", "JO", "KZ", "KE", "KI", "KP", "KR", "KW", "KG", "LA", "LV", "LB", "LS", "LR", "LY", "LI", "LT", "LU", "MO", "MK", "MG", "MW", "MY", "MV", "ML", "MT", "MH", "MQ", "MR", "MU", "YT", "MX", "FM", "MD", "MC", "MN", "ME", "MS", "MA", "MZ", "MM", "NA", "NR", "NP", "NL", "NC", "NZ", "NI", "NE", "NG", "NU", "NF", "MP", "NO", "OM", "PK", "PW", "PS", "PA", "PG", "PY", "PE", "PH", "PN", "PL", "PT", "PR", "QA", "RE", "RO", "RU", "RW", "BL", "SH", "KN", "LC", "MF", "PM", "VC", "WS", "SM", "ST", "SA", "SN", "RS", "SC", "SL", "SG", "SX", "SK", "SI", "SB", "SO", "ZA", "GS", "SS", "ES", "LK", "SD", "SR", "SJ", "SZ", "SE", "CH", "SY", "TW", "TJ", "TZ", "TH", "TL", "TG", "TK", "TO", "TT", "TN", "TR", "TM", "TC", "TV", "UG", "UA", "AE", "GB", "US", "UM", "UY", "UZ", "VU", "VE", "VN", "VG", "VI", "WF", "EH", "YE", "ZM", "ZW"],
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
        ],
    copyright: String,
    licence: String,
    content_type: {
        required: true,
        type: String,
        enum: ["text/plain", "text/markdown", "text/html", "image/image"],  // TODO: add all allowed content types
    },
    available: Boolean,
    target_ages: [
        {
            type: Number,
            min:0,
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
        callback_url: {type: String},
        callback_schema: {type: Object}
    },
    content_location: {
        type: String,
        required: true
    }


}, {timestamps: {createdAt: 'created_at'}});

// Enforce unique index on combination of _id, version and language
learningObjectSchema.index({uuid: 1, version: 1, language: 1}, {unique: true});
// Check if content location is correct URL
learningObjectSchema.path('content_location').validate((val) => {
    urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
    return urlRegex.test(val);
});