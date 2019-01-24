
class Pdf {

    gerarPDF(req) {

        var path;
        var PDFDocument = require('pdfkit');

        var fs = require('fs');

        var doc = new PDFDocument({size: 'A4' });

        // criar o arquivo pdf
        doc.pipe(fs.createWriteStream('public/pdf/output.pdf'));

      
        //////// início Cabeçalho  //////////////

        doc.font('fonts/timesbd.ttf')
            .text("                             Protocolo de Requisição - TOKEN CNS", {
               align: 'left',
               
            }).dash(3,{space:3})


        doc.image('public/imagens/caixa-fake.png', 70, 50, {
                fit: [150, 50],
                align: 'left',

            })  // logo
            .moveDown() 
            .moveDown()
            .moveDown()

         //////// fim Cabeçalho  //////////////


          //////// início Corpo  //////////////

        doc.moveDown()
        doc.moveDown()
        doc.font('fonts/timesbd.ttf')
            .fontSize(11)
            .text("Sua requisição do TOKEN CNS foi gerada com sucesso!")


        let paragrafo_um = 'Compareça a qualquer agência CAIXA e apresente seu documento de identificação pessoal para que a geração de' +
            'seu TOKEN CNS seja autorizada.'
        doc.moveDown()
        doc.moveDown()

        doc.font('fonts/times.ttf')
            .fontSize(11)
            .text(paragrafo_um), {

                columns: 3,
                columnGap: 15,
                height: 100,
                width: 465,
                align: 'justify'
            }


        let paragrafo_dois = 'A partir daí, é só retornar ao site da CAIXA e gravar o TOKEN CNS na mídia de maior conveniência para você.'
        'Requisição gravada em:'
        doc.moveDown()
        doc.font('fonts/times.ttf')
            .fontSize(11)
            .text(paragrafo_dois), {

                columns: 3,
                columnGap: 15,
                height: 100,
                width: 465,
                align: 'justify'
            }



        let paragrafo_tres = 'Requisição gravada em: '
        doc.moveDown()
        doc.font('fonts/times.ttf')
            .fontSize(11)
            .text(paragrafo_tres, {continued: true})
            .font('fonts/timesbd.ttf').text(req.requisicao)
             
        let paragrafo_quatro = 'Validade: '
        doc.moveDown()
        doc.font('fonts/times.ttf')
            .fontSize(11)
            .text(paragrafo_quatro , {continued: true})
            .font('fonts/timesbd.ttf').text(req.validade)

        let paragrafo_cinco = 'Número de controle: '
        doc.moveDown()
        doc.font('fonts/times.ttf')
            .fontSize(11)
            .text(paragrafo_cinco , {continued: true})
            .font('fonts/timesbd.ttf').text(req.controle)


        let paragrafo_seis = 'Guarde a sua senha de emissão em um lugar seguro, pois será utilizada na geração do seu ' +
            'TOKEN CNS. O extravio da senha de emissão inviabiliza a continuidade na geração, sendo necessária a realização de novo' +
            'processo de requisição.'
        doc.moveDown()
        doc.moveDown()
        doc.font('fonts/timesbd.ttf').text("IMPORTANTE: ",{  
            continued: true
        }) .fontSize(11)
            .font('fonts/times.ttf')
            .fontSize(11)
            .text(paragrafo_seis), {

                columns: 3,
                columnGap: 15,
                height: 100,
                width: 465,
                align: 'justify'
            }

          //////// fim Corpo  //////////////    

         //////// início rodapé  //////////////

        let rodape = 'Informações Adicionais:'
        doc.font('fonts/times.ttf')
            .text(rodape, (doc.page.width / 2) * 0.82, doc.page.height - 100, {
                lineBreak: false,
                align: 'center',


            });

        let rodape_dois = 'Central de Teleserviços CAIXA - 3004-1104 (capitais e regiões metropolitanas)'
        doc.font('fonts/times.ttf')
            .text(rodape_dois, (doc.page.width / 2) * 0.42, doc.page.height - 86, {
                lineBreak: false,
                align: 'center',


            });

        let rodape_tres = 'e 0800 7260104 (demais localidades).'
        doc.font('fonts/times.ttf')
            .text(rodape_tres, (doc.page.width / 2) * 0.71, doc.page.height - 72, {
                lineBreak: false,
                align: 'center',
            });

         //////// fim rodapé  //////////////        

        //Finalize PDF file 
        doc.end()

    }


}

module.exports = Pdf;

