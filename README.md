# Node Report API

This is a small api developed in NodeJS to generate a PDF report. A client application will request the report and it will send a json string in base64 format, thrus the Client can display or download pdf file.

=============================

To generate pdf, the PdfKit nodeJs's lib has been used

## Instructions:

execute in root directory: npm start

The object to request must be this format:

  
obj = {
             requisicao : 24/01/2019 - 15:20:40,
             validade : 24/02/2019,
             controle : 12345645678998877777
        }

Example:

This case, to especific **method** 

  gerarArquivo(objeto) {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post("http://localhost:3000/relatoriotkn",objeto, options)
      .toPromise()
      .then(res => res.json());
  
  }

In the Future, will be implemented other methods, thus the object could have differents parameters. 
