var express = require('express'),
session = require('express-session');
path = require('path'),
flash = require('connect-flash'),
bodyParser = require('body-parser'),
cons = require('consolidate'),
dust = require('dustjs-helpers'),
dustlinkedin = require('dustjs-linkedin')
cookieParser = require('cookie-parser');
app = express();

var server = require('http').createServer(app);


/* Assing Dust Engine to .dust Files, and the files will be converted to HTML for the browser,
 * this is a view engine for nodejs
 */
app.engine('dust',cons.dust);


/* Parse Cookie header and populate req.cookies with an object keyed by the cookie names. 
 * Optionally you may enable signed cookie support by passing a secret string, which assigns req.secret so it may be used by other middleware.
 */
app.use(cookieParser('MyK3y'));

/* 
 *Body Parser Middleware that can transform all elements inside <body></body> tags which have NAME atribute into a JSON
 *and we can access all data via req.body
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

/* 
 * Creating session, using express session. it's secret have to be the same of cookieParser in 24 line
 * params:
 	- Secret: kind of a key, that will use to secure the session
 	- resave: Forces the serrion to be save back to the session store
 	- saveUninitialized: Forces session, when is new and not modified to be save
 	- MaxAge: Duration of the session
 *and we can access all data via req.body
 */
app.use(session({secret:'MyK3y',saveUninitialized:true,resave:true,cookie: {maxAge: 3600000}}));

/*
 * Setting node dust as view engine, to process all dust files
 * Set Default Ext .dust
 */ 
app.set('view engine', 'dust','dustjs-linkedin');

/*
 * Setting node the view folder, responsable to render the HTML's files
 */
app.set('views',__dirname + '/views');

/*
 * Setting public as static folder for using CSS
 */
app.use(express.static(path.join(__dirname,'public')));

// Starting Server on PORT 8080
app.listen(process.env.PORT || 8080, function(){
	console.log('Server Started On Port 3000');
});

/*
 * I prefer to isolate all get and post request in a file especif file
 * in that way, it makes the code much more cleaner
 */
 require('./server/routes')(app);
