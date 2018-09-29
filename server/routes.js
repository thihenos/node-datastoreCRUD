'use strict';

module.exports = function (app) {

		//getting the file which has all the routes to save any materials
		let material = require('./routes/material');
		
		app.get('/material/new',material.new);
		app.get('/material',material.findAll);
		app.get('/material/:id',material.find);
		app.post('/material',material.create);
		app.post('/material/:id',material.update);
		app.delete('/material/:id',material.destroy, material.findAll);

		
		/* If the user tries to access any address of the app which not exists in routes.js file, 
		 * it will be send to the show page, which will return all data saved
		 */
		app.route('/*').get(function (req, res) {
	    	res.redirect('/material');
	  	});

};