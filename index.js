const app= require('./config/server');
const functions= require('./controllers/functions');
const routes= require('./app/routes/routes')(app);
const request= require('request');
const async= require('async');

app.listen(8000,function(req,res){
	console.log("server listening at port 8000 ");
});



