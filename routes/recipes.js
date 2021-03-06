'use strict';

var recipesObject = require('../model/recipes.json');
var utils = require('../model/utils');

exports.getRecipes = function(req, res) {
	var mood = req.query.mood;
	var time = req.query.time;
	var expertise = req.query.expertise;

	if (!mood) {
		return res.status(400).send('Query Param Mood must be defined');
	}

	if (!time) {
		return res.status(400).send('Query Param Time must be defined');
	}

	if (!expertise) {
		return res.status(400).send('Query Param Expertise must be defined');
	}

	var timeInt = parseInt(time);
	var expertiseInt = parseInt(expertise);

	var possibleOptions = [];
	for (var i = 0; i < recipesObject.recipes.length; i++) {
		var currentRecipe = recipesObject.recipes[i];
		for (var j = 0; j < currentRecipe.moods.length; j++) {
			if (mood === currentRecipe.moods[j] && timeInt === currentRecipe.time && expertiseInt === currentRecipe.expertise) {
				possibleOptions.push(currentRecipe);
			}
		}
	}

	res.json(possibleOptions[utils.getRandomInt(0, possibleOptions.length - 1)]);

};

exports.getRandomRecipe = function(mood, time, expertise) {
	var possibleOptions = [];
	for (var i = 0; i < recipesObject.recipes.length; i++) {
		var currentRecipe = recipesObject.recipes[i];
		for (var j = 0; j < currentRecipe.moods.length; j++) {
			if (mood === currentRecipe.moods[j] && time === currentRecipe.time && expertise === currentRecipe.expertise) {
				possibleOptions.push(currentRecipe);
			}
		}
	}
	return possibleOptions[utils.getRandomInt(0, possibleOptions.length - 1)];

};

