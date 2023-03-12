<!doctype html>
<html lang="pt">
    <head>
        <link rel="shortcut icon" href="https://www.uva.br/wp-content/themes/uva-theme/dist/favicon.ico" type="image/vnd.microsoft.icon">
        <title>Exercícios de algorítimo  Aula 2</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        
        <script src="./tools/MyGeneratorBootStrap5.js" ></script>
</head>
<body >
<a class="btn btn-outline-primary" href="#"  onclick="gerarZIP(this)" ><h5>--->BAIXAR CÓDIGO FONTE<---</h5></a>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
<script src="./tools/jquery-3.6.3.min.js?v=1" defer></script>
<script>
function gerarZIP(o){
    if(o.href.slice(-1)=='#'){
       
        o.classList.add('disabled');
        $.get('generateZip.php').done(function(data){
        o.href=data;
        o.setAttribute('download','')
        o.click();
        o.classList.remove('disabled'); 
    });
    
    //o.stopPropagation();
    }
   
}
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx style="background-color:#b87500"
// montando logo da uva
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
let uva_logo = new Icon('uva-logo','40','147','none');
uva_logo.setPathAttri('fill',"#fff");
let circulo = new Icon('circulo','40','147','none');
circulo.setPathAttri('fill',"#FFD000");
uva_logo.svg.appendChild(circulo.path);
uva_logo.svg.classList.add('mx-5');
uva_logo.svg.classList.add('my-3');

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// montando página HTML
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
let Page = new PageLayout();

const body = document.getElementsByTagName('body')[0];
body.setAttribute('style',"background-color:#fcb900");
Page.setTitle(uva_logo.svg,'ALGORITMOS AULA 3');
body.appendChild(Page.alertZone);
body.appendChild(Page.contaier);
root = Page.BodyRow;


//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// obtendo parametros para montar qeustionário
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
const urlParams = new URLSearchParams(window.location.search);
const qtd = parseInt(urlParams.get("qtd"));
let qtdMotas = 3;
if(!isNaN(qtd)){
    qtdMotas = qtd; 
}


       

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// Configurando questões
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

let questoes = {'Questão 1':
                            {inputs:{},
                            buttonText:"Verificar Notas"},
                'Questão 2':
                            {inputs:{},
                            buttonText:"Verificar Números"},
                'Questão 3':
                            {inputs:{},
                            buttonText:"Criar Vetor"}}

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// excrevendo questões
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
for(let aluno =1 ; aluno <= qtdMotas; aluno++ ){

//INPUTS DA QUESTÃO 1
    questoes['Questão 1']['inputs']['nome_'+aluno] = {text:'Nome Aluno '+aluno,
                                               type:'string',
                                               validacao:"+_)(*&¨%$#@!=-|\\^~\´`{}?/][;:"
                                              };
    questoes['Questão 1']['inputs']['nota_'+aluno] ={text:'Nota Aluno '+aluno,
                                               type:'float',
                                               validacao:[" >= 0.00"," <= 10.00"]
                                              }; 
//INPUTS DA QUESTÃO 2    
    questoes['Questão 2']['inputs']['nota_'+aluno] ={text:'Número '+aluno,
                                               type:'int',
                                               validacao:[" >= -999999.00"," <= 1000000.00"]
                                              };
//INPUTS DA QUESTÃO 3    
    questoes['Questão 3']['inputs']['nota_'+aluno] ={text:'Número '+aluno,
                                               type:'float',
                                               validacao:[" >= -999999.00"," <= 1000000.00"]
                                              };                             
}

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// montando questionário
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

for(let questao in questoes){
    let parameters = {};
    let card = new Card(questao);
    let inputs =  questoes[questao].inputs;
    for(let inputName in inputs){
        let inputID = generateID(25,inputName+'ID_');
        parameters[inputName] = [inputID,inputs[inputName].type,inputs[inputName].validacao]
    let ask = new Input(inputs[inputName].text,inputID,inputs[inputName].type);
    card.appendToBoddy(ask.input)
    }
    parameters['algoritimo'] = questao;
    let btn_do = new Button(questoes[questao].buttonText,
                            undefined,
                            undefined,
                            callPHP,
                            parameters);
    card.appendToBoddy(btn_do.button);  
    card.finalize();
    root.appendChild(card.card); 
}

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// submentendo valores ao PHP
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

function callPHP(p){
    let dictRequest = {}
    for(let variable in p){
        if(variable == 'algoritimo'){
            
            dictRequest[variable] =p[variable];
        
        }else{
        let value = document.getElementById(p[variable][0]).value;
        switch(p[variable][1]){
            case 'int':
                value = parseInt(value);
                for (let condId in p[variable][2]){
                    let cond = p[variable][2][condId];
                    if(!eval(value+cond)){
                        alert('Condição "'+value+cond+'" no campo "'+variable+'" não foi atendida!!');
                        return undefined;
                    }
                }
                dictRequest[variable] = value;
                break;
            case 'float':
                value = parseFloat(value.replace(',','.'));
                for (let condId in p[variable][2]){
                    let cond = p[variable][2][condId];
                    if(!eval(value+cond)){
                        alert('Condição "'+value+cond+'" no campo "'+variable+'" não foi atendida!!');
                        return undefined;
                    }
                    
                }
                dictRequest[variable] = value;
                break;
            case 'string':
                value = String(value);
                for (let condId in p[variable][2]){
                    let invalidCaract = p[variable][2][condId];
                    if(value.includes(invalidCaract)){
                        alert('O caractere "'+invalidCaract+'" no campo "'+variable+'" não é aceito!!');
                        return undefined;
                    }
                    if(value == '' || value==null || value == undefined){
                        alert('O campo "'+variable+'" deve ser preenchido!!!');
                        return undefined;
                    }
                }
                dictRequest[variable] = value;
                break;
            default:
                alert('Tipo "'+p[variable][1]+'" do campo "'+variable+'" não foi definido!!'); 
                return undefined;
            }
        }
    }
    dictRequest['qtdMotas']=qtdMotas;
   $.post('./algs.php',{params:dictRequest}).done(function(data){
    

    let alertReturn = new Alert();
    alertReturn.setInner(data);
    Page.alertZone.appendChild(alertReturn.alert);
    }
   
   )

}
 
</script>
</body>
</html>

