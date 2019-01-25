
class Pdf {

    gerarProtocoloTKNPDF(req) {

       
        let date = new Date();
        let data_atual =  ("00" + date.getUTCDate()).slice(-2)+("00" + date.getUTCMonth()+1).slice(-2)+date.getUTCFullYear()+("00" + date.getHours()).slice(-2)+("00"+date.getMinutes()).slice(-2)+("00"+date.getSeconds()).slice(-2);
        let largura_pg = 465 // 468
        let fontebd = 'fonts/timesbd.ttf';
        let fonte = 'fonts/times.ttf';
        let PDFDocument = require('pdfkit');
        let arquivo = 'output'+data_atual+'.pdf'
        let fs = require('fs');
        let doc = new PDFDocument({size:"A4" });

        

        // criar o arquivo pdf
        doc.pipe(fs.createWriteStream('public/pdf/'+arquivo));


        //////// início Cabeçalho  //////////////

        doc.font(fontebd)
            .text("                             Protocolo de Requisição - TOKEN CNS", {
                align: 'left',

            }).dash(3, { space: 3 })


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
        doc.font(fontebd)
            .fontSize(11)
            .text("Sua requisição do TOKEN CNS foi gerada com sucesso!")


        let paragrafo_um = 'a qualquer agência CAIXA e apresente seu documento de identificação pessoal para que a geração de seu TOKEN CNS seja autorizada.'
        doc.moveDown()
        doc.moveDown()
        doc.font(fonte).text("Compareça " , {
            continued: true,
            //width: largura_pg,
            align: 'justify',
            
        }).fontSize(11)
            .font(fonte)
            .fontSize(11)
            .text(paragrafo_um), {
                //width: largura_pg,
                align: 'justify'
            }

        let paragrafo_dois = 'daí, é só retornar ao site da CAIXA e gravar o TOKEN CNS na mídia de maior conveniência para você.'
        doc.moveDown()
        doc.font(fonte).text("A partir ", {
            continued: true,
            //width: largura_pg,
            align: 'justify'
        }).fontSize(11)
            .font(fonte)
            .fontSize(11)
            .text(paragrafo_dois), {
                //width: largura_pg,
                align: 'justify'
            }


        let paragrafo_tres = 'Requisição gravada em: '
        doc.moveDown()
        doc.font(fonte)
            .fontSize(11)
            .text(paragrafo_tres, { continued: true })
            .font(fontebd).text(req.requisicao)

        let paragrafo_quatro = 'Validade: '
        doc.moveDown()
        doc.font(fonte)
            .fontSize(11)
            .text(paragrafo_quatro, { continued: true })
            .font(fontebd).text(req.validade)

        let paragrafo_cinco = 'Número de controle: '
        doc.moveDown()
        doc.font(fonte)
            .fontSize(11)
            .text(paragrafo_cinco, { continued: true })
            .font(fontebd).text(req.controle)


        let paragrafo_seis = 'Guarde a sua senha de emissão em um lugar seguro, pois será utilizada na geração do seu ' +
            'TOKEN CNS. O extravio da senha de emissão inviabiliza a continuidade na geração, sendo necessária a realização de novo' +
            'processo de requisição.'
        doc.moveDown()
        doc.moveDown()
        doc.font(fontebd).text("IMPORTANTE: ", {
            continued: true,
            //width: largura_pg,
            align: 'justify'
        }).fontSize(11)
            .font(fonte)
            .fontSize(11)
            .text(paragrafo_seis), {
                //width: largura_pg,
                align: 'justify'
            }

        //////// fim Corpo  //////////////    

        //////// início rodapé  //////////////

        let rodape = 'Informações Adicionais:'
        doc.font(fonte)
            .text(rodape, (doc.page.width / 2) * 0.82, doc.page.height - 100, {
                lineBreak: false,
                align: 'center',


            });

        let rodape_dois = 'Central de Teleserviços CAIXA - 3004-1104 (capitais e regiões metropolitanas)'
        doc.font(fonte)
            .text(rodape_dois, (doc.page.width / 2) * 0.42, doc.page.height - 86, {
                lineBreak: false,
                align: 'center',


            });

        let rodape_tres = 'e 0800 7260104 (demais localidades).'
        doc.font(fonte)
            .text(rodape_tres, (doc.page.width / 2) * 0.71, doc.page.height - 72, {
                lineBreak: false,
                align: 'center',
            });

        //////// fim rodapé  //////////////        

     
        //Finalize PDF file 
        doc.end()

        return arquivo;

    }


}

module.exports = Pdf;

