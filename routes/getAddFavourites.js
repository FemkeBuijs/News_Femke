var express = require('express');
var router = express.Router();
var favourites = require('../models/mongo_favourites');
var _ = require('lodash');


//to fetch the results based on the title
router.get('/', function(req, res, next){
    favourites.favourite.find({}, function(err, data){
        res.json(data);
    })
});

//to create a new favourite
router.post('/', function(req, res, next){
            favourites.favourite.create({
                name_id: req.body.name_id,
                title: req.body.title,
                description: req.body.description,
                link: req.body.link
            }, function(err, data){
                if(!err){
                    res.status(200);
                    res.json({
                        status: 'All good'
                    })
                }
            });
});

module.exports = router;