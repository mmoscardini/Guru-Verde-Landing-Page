const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set ('port', (process.env.PORT || 5000));

//Set path to static files
app.use(express.static(__dirname + '/public'));

//Set path to view and view engine to ejs
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    response.render('pages/index');
});

app.listen(app.get('port'), ()=>{
    console.log ('Server started on port: ' + app.get('port'));
});