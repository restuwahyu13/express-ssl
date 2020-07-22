require('dotenv').config();
const https = require("https");
const http = require('http');
const express = require('express');
const { resolve } = require('path')
const { readFileSync } = require("fs");
const logger = require('morgan');
const chalk = require('chalk');
const app = express();

app.use(logger('dev'));
app.set('views', 'views');
app.set('view engine', 'ejs');
app.set('x-powered-by', false);

app.get('/', (req, res) => {
	 res.render('index', {
	 	 desc: req.protocol === 'https'
	 	 ? `Express using SSL certificate for using ${req.protocol} protocol`
	 	 : `Express using SSL certificate for using ${req.protocol} protocol`
	 })
});

http.createServer(app).listen(process.env.PORT, () => console.log(chalk.white.bold('http server on port 3000')));

if(process.env.NODE_ENV === 'development') {
	const options = {
	  key: readFileSync(`${resolve(process.cwd(), 'ssl/key.pem')}`),
	  cert: readFileSync(`${resolve(process.cwd(), 'ssl/cert.pem')}`),
	};
	https.createServer(options, app).listen(3001, () => console.log(chalk.white.bold('https server on port 3001')));
}

console.log(chalk.white.bold(`NOTE: important this SSL for Development Mode not for Production Mode`));
console.log(chalk.white.bold(`NOTE: because this ssl certificate's signature was created manually`));
console.log(chalk.white.bold(`NOTE: SSL certificate is used to use authentication using Oauth or package like Passport for auth third part \n`));