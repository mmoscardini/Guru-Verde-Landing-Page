const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

app.set ('port', (process.env.PORT || 5000));

//Set path to static files
app.use(express.static(__dirname + '/public'));

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

//Set path to view and view engine to ejs
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//Root get function
app.get('/', function(request, response,next) {
    response.render('pages/index');
});

//Post email enviado
app.post('/mailSent', (request, response, next)=>{
    var transport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: "mmoscardini02@gmail.com",
            pass: 'KRIPTOGRAFAR ESSA SENHA AQUI'
        }
    });
    
  

    let mailOptions = {
            from: request.body.email,
            to: 'matheus_moscardini@yahoo.com.br',
            subject: 'Novo Lead Guru Verde',
            text: request.body.name + ' ' + request.body.email +' ' + request.body.quantasPlantas
    };

    transport.sendMail(mailOptions, (err, info)=>{
        if(err) {
            console.log(err);
            response.send(err);                
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        console.log (mailOptions.from);
        response.send(mailOptions);  
    });
});

app.listen(app.get('port'), ()=>{
    console.log ('Server started on port: ' + app.get('port'));
});