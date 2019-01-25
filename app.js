var express = require('express');
// criando rotas
var router = express.Router();
var fs = require('fs');
var porta = 3000;
var base64 = require('file-base64');
var bodyParser = require('body-parser');
var Pdf = require('./reports/Pdf'); // arquivo onde está a classe da geração do PDF
var pdf = new Pdf();

//criar um instancia para ter acessoe executar as funções do express
var app = express();
app.use(express.static('public'));

//permitir o recebimento de um objeto JSON 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//permitir o CORS
app.all('/*', function (req, res, next) {
	/* Allow access from any requesting client */
	res.setHeader('Access-Control-Allow-Origin', '*');

	/* Allow access for any of the following Http request types */
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');

	/* Set the Http request header */
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
	next();
});

// página inicial
app.route('/', function (req, res) {
	res.send('./public/index.html')
});

// método do relatório do tkn
app.post('/relatoriotkn', function (req, res) {

	/*
		request:
		    requisicao,
            validade,
            controle	

	*/

	let arquivo = pdf.gerarProtocoloTKNPDF(req.body)
	let caminho = __dirname + '/public/pdf/';

	setTimeout(() => {

		base64.encode(caminho + arquivo, function (err, base64String) {

			let retornojson = { pdf: 'data:application/pdf;base64,' + base64String };

			res.json(retornojson);
		});
		fs.unlinkSync(caminho + arquivo);
	}, 1000)
	
});

// iniciar o server
app.listen(porta, function () {
	console.log('Servidor iniciado e executando... Vá até o seu browser e digite http://localhost:3000');
});