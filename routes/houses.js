const { House, validate } = require('../models/house'); 
const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid/v4');
const _ = require('lodash');
const authorize = require('../middleware/auth');
const admin = require('../middleware/admin');

/**
 * @endpoint < route 'houses/' 
 * @method POST
 * @body House information
 * @description Creates a new home with set information 
 */
router.post('/', 
    [authorize, admin],

    async (req, res) => {
        const { error } = validate(req.body); 
        if (error) return res.status(400).send(error.details[0].message);

        let params = req.body;

        // Create unique mls for the home to be added to the database
        params.mls = uuidv4().replace(/-/g, '');

        // Create date when listed
        params.dateListed = new Date().toISOString();
        
        const house = new House(params);
        

        try {
            const newhouse = await house.save();
        
            res.send(newhouse);
        } catch (error){
            return res.status(500).send(`Server Error: `, error);
        }
});

/**
 * @endpoint < route 'houses/' 
 * @method GET
 * @query Displays homes based on the query of the user
 *  Queries can be: MLS, City, State, Zipcode, Bedrooms, Bathrooms, or Square Feet
 * @description Retrieve homes based on the query specified by the user
 */
router.get('/', async (req, res) => {
    const queryData = req.query; 

    try{
        const searchHomes = await House.find(queryData);

        if (_.isEmpty(searchHomes)) return res.status(404).send(`The Home with the given ${Object.keys(queryData)}: ${queryData[Object.keys(queryData)]} was not found.`);

        res.send(searchHomes);
    } catch (error){
        return res.status(500).send(`Server Error: `, error);
    }
});

/**
 * @endpoint < route 'houses/:mls' 
 * @method PUT
 * @query mls number of the home to be updated
 * @body Updated information of the house to be updated
 * @description Updates the sections that the user specified to update
 */
router.put('/:mls', 
    [authorize, admin],

    async (req, res) => {
        const { error } = validate(req.body); 
        if (error) return res.status(400).send(error.details[0].message);

        const {mls} = req.params;
        const house = req.body;

        try {
            const findHouse = await House.findOne(req.params);

            if (_.isEmpty(findHouse)) return res.status(404).send(`The Home with the given MLS: ${mls} was not found.`);
            
            const updateHouse = await House.findOneAndUpdate(mls, house);

            _.forEach(house, (section, key) => {
                updateHouse[key] = section;
            })
        
            res.send(updateHouse);
        } catch (error){
            return res.status(500).send(`Server Error: `, error);
        }
});

/**
 * @endpoint < route 'houses/:id' 
 * @method DELETE
 * @query  mls number of the home to be updated
 * @description Removes home from the database as specified by the user
 */
router.delete('/:mls', 
    [authorize, admin],
    
    async (req, res) => {
        const {mls} = req.params;
        try {
            const deleteHouse = await House.findOneAndDelete(mls);

            if(!deleteHouse) return res.status(404).send('The House with the given MLS ID was not found.');

            res.send(deleteHouse);
        } catch (error){
            return res.status(500).send(`Server Error: `, error);
        }
});

module.exports = router;