const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');

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
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        host: 'smtp.gmail.com',
        auth: {
            type: 'OAuth2',
            user: process.env.USER,
            clientId: process.env.CLIENTID,
            clientSecret: process.env.CLIENTSECRET,
            refreshToken: process.env.REFRESHTOKEN
            /*

            type: 'OAuth2',
            user: 'mmoscardini02@gmail.com',
            clientId: '1068201702160-5o5hv126rvlqjg2e74btf9qrs8eu0bpa.apps.googleusercontent.com',
            clientSecret: 'NTTev0uVr1zT6Gwp4tbfGBbF',
            refreshToken: '1/3UfkVmm6PkAAMDXMyR19lXDXXGGA939HF8rHSyzJZqE3-V_CP79tX21LKCcFgDK6'

            xoauth2: xoauth2.createXOAuth2Generator({
                user: 'mmoscardini02@gmail.com',
                clientId: '1068201702160-5o5hv126rvlqjg2e74btf9qrs8eu0bpa.apps.googleusercontent.com',
                clientSecret: 'NTTev0uVr1zT6Gwp4tbfGBbF',
                refreshToken: '1/3UfkVmm6PkAAMDXMyR19lXDXXGGA939HF8rHSyzJZqE3-V_CP79tX21LKCcFgDK6',
                accessToken: 'ya29.Glu5BKV7RpiS-veVxDA90jhtHgHhTAEIL42kwA66VSm4-dAH8udtluD3wFOvMijyZg22600FdFMpwgAZVgNG-UD1uEjoTE-uO8rHPCAFKFPTDkNE8ro1iACWGhHD'
           })*/
        }
    });
    
  

    let mailOptions = {
            from: request.body.email,
            to: 'matheus_moscardini@yahoo.com.br',
            subject: 'Novo Lead Guru Verde',
            text: 'Nome: ' + request.body.nome + '|| Email: ' + request.body.email +'|| Quantas plantas: ' + request.body.quantasPlantas
    };

    transporter.sendMail(mailOptions, (err, info)=>{
        if(err) {
            console.log(err);
            response.send(err);                
        }
        console.log('Message sent: ' + info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: ' + nodemailer.getTestMessageUrl(info));
        //console.log (mailOptions.from);
        response.send(mailOptions);  
    });
});

app.listen(app.get('port'), ()=>{
    console.log ('Server started on port: ' + app.get('port'));
});