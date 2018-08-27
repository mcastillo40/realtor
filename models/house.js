const mongoose = require('mongoose');
const Joi = require('joi');

const House = mongoose.model('House', new mongoose.Schema({ 
    mls: {
        type: String,
        unique: true,
        required: true
    },
    street1: {
        type: String,
        required: true,
        trim: true
    },
    street2: { 
        type: String,
        trim: true
    },
    city: { 
        type: String,
        trim: true, 
        required: true
    },
    state: { 
        type: String,
        trim: true, 
        minlength: 2,
        maxlength: 50,
        required: true
    },
    zip: { 
        type: String, 
        required: true,
        trim: true, 
        minlength: 0,
        maxlength: 7
    },
    neighborhood: { 
        type: String,
        trim: true, 
        minlength: 5,
        maxlength: 255
    },
    salesPrice: { 
        type: Number, 
        required: true,
        min: 0,
        max: 10000000
    },
    dateListed: { 
        type: Date, 
        default: null
    },
    bedrooms: { 
        type: Number, 
        min: 0,
        max: 25,
        required: true
    },
    photos: { 
        type: Buffer
    },
    bathrooms: { 
        type: Number, 
        min: 0,
        max: 25,
        required: true
    },
    garageSize: { 
        type: Number, 
        min: 0,
        max: 10000
    },
    sqrFt: { 
        type: Number, 
        min: 0,
        max: 100000,
        required: true
    },
    lotSize: { 
        type: Number, 
        min: 0,
        max: 100000
    },
    description: { 
        type: String,
        trim: true, 
        minlength: 5,
        maxlength: 1000
    }
}));

// Functiion used to validate that the information passed is valid for the database
function validateHouse(house) {
    const schema = {
        street1: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().min(2).max(50).required(),
        zip: Joi.string().min(0).max(7).required(),
        neighborhood: Joi.string().min(5).max(255),
        salesPrice: Joi.number().min(0).max(10000000).required(),
        bedrooms: Joi.number().min(0).max(25).required(),
        bathrooms: Joi.number().min(0).max(25).required(),
        garageSize: Joi.number().min(0).max(10000),
        sqrFt: Joi.number().min(0).max(10000).required(),
        lotSize: Joi.number().min(0).max(10000),
        description: Joi.string().min(5).max(1000), 
    };
  
    return Joi.validate(house, schema);
}

exports.validate = validateHouse;
exports.House = House; 