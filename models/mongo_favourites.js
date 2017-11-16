var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://dev:password@ds151355.mlab.com:51355/favourites');

var Schema = mongoose.Schema;

var favouritesSchema = new Schema ({
    name_id: {
        type: String,
        unique: true
    },
    title: String,
    description: String,
    link: String
});

var favouritesModel = mongoose.model("favourite", favouritesSchema);

module.exports = {
    favourite: favouritesModel
};

