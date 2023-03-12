//GERA UMA IDENTIFICADOR PARA UMA TAG HTML
function generateID(size,prefix='id'){
  let MAIUSC = 'ABCDEFGHIJLMNOPQRSTUVXZ';
  let minusc = MAIUSC.toLowerCase();
  let uniId = prefix;
  for(let i=0;i<size;i++){
      let tipCarac = Math.floor(Math.random()*3)+1;
      switch(tipCarac){
          case 1:
              uniId += String( Math.floor(Math.random()*10));
          break;
          case 2:
              let posM= Math.floor(Math.random()*MAIUSC.length);
              uniId +=MAIUSC[posM];
          break;
          case 3:
              let posm= Math.floor(Math.random()*minusc.length);
              uniId +=minusc[posm];
      }

  }
  return uniId;
}

function createHTMLELement(classList=[],classAtrrib={},tag='div'){
  let row = document.createElement(tag);
  for(let i in classList){
    row.classList.add(classList[i]);
  }
  for(let atrri in classAtrrib){
    row.setAttribute(atrri,classAtrrib[atrri]);
  }
  return row;
}

    class Accordion{
        constructor(id){
          let newAccordiona = document.createElement('div');
          //id_Newaccordion += String(stringToHash(i+id_Newaccordion));
          newAccordiona.setAttribute('id',id);
          newAccordiona.classList.add('accordion');
          newAccordiona.classList.add('mt-3');
          this.accordion = newAccordiona;
        }
      }

    //  export
      class AccordionItem{
        constructor(rotulo='Sem rotulo',id_accordion='Sem_id',isExpanded=false){
          let accordion_item  = document.createElement('div');
          accordion_item.classList.add('accordion-item');
          
          let identificator = String(stringToHash(rotulo+id_accordion));
          
          let accordion_header = document.createElement('h1');
          accordion_header.classList.add('accordion-header');
          //accordion_header.classList.add('col-12');
          //let identificator = String(stringToHash(rotulo+id_accordion));
          accordion_header.setAttribute('id','head_'+identificator);
          
          let button = document.createElement('button');
          button.classList.add('accordion-button');
          button.setAttribute('type','button');
          button.setAttribute('data-bs-toggle','collapse');
          button.setAttribute('data-bs-target','#collapse_'+identificator);
          
          button.setAttribute('aria-controls','collapse_'+identificator);
          let parag = document.createElement('p');
          parag.classList.add('fw-bold');
          parag.innerHTML = getDisplayConfig(rotulo);
          button.appendChild(parag);
          
          let accordion_colapse  =  document.createElement('div');
          accordion_colapse.classList.add('accordion-collapse');
          accordion_colapse.classList.add('collapse');
          accordion_colapse.setAttribute('aria-labelledby','head_'+identificator);
          accordion_colapse.setAttribute('data-bs-parent','#'+id_accordion);
          accordion_colapse.setAttribute('id','collapse_'+identificator);
          
          let accordion_body =  document.createElement('div');
          accordion_body.classList.add('accordion-body');
          
          //None = undefined;
          if(isExpanded){
           // colapsed=1;
          button.setAttribute('aria-expanded','true');
          
          accordion_colapse.classList.add('show');
          }else{
            button.setAttribute('aria-expanded','false');
            button.classList.add('collapsed');
          }
          accordion_header.appendChild(button);
          accordion_item.appendChild(accordion_header);
          this.colapse =  accordion_colapse;
          this.item = accordion_item;
          this.body = accordion_body;
          this.header = accordion_header;

        }
        apenToThisBody(NodeElement=undefined){
          if(NodeElement==undefined){
            let LoadingTag = new Loading("Carregando movimentos...   ");
            LoadingTag.insertIn(this.body);
          }else{
              this.body.appendChild(NodeElement);
          }
        }
        loadItem(NewItem){
          this.item = NewItem;
          this.header= NewItem.firstChild;
          this.colapse= NewItem.lastChild;
          this.body = this.colapse.firstChild;

        }
        finalize(){
          this.colapse.appendChild(this.body);
          this.item.appendChild(this.colapse);
          //this.item.appendChild(this.body);  
        }
        groupRows(){
         // let Acc_children = [].slice.call(this.body.querySelectorAll('.accordion'));
          let children = [].slice.call(this.body.children);//('.row'));
          let thisBody = this.body;
          children.map(function(kid){
            if(kid.className != 'row'){
              let copy = kid.cloneNode(true);
              kid.remove();
              thisBody.appendChild(copy);
            }
          });
    
        }
      }
      

      class Loading{
        constructor(text,qtyicons=1){
          let div = document.createElement('div');
          div.classList.add('d-flex');
          div.classList.add('loadDiv');
          div.classList.add('align-items-center');
          let h1 =  document.createElement('h6');
          let textTag = document.createElement('strong');
          textTag.innerText=text;
          h1.appendChild(textTag);
          div.appendChild(h1);
          for (let i=0;i<qtyicons;i++){
            let logo = document.createElement('div');
            logo.classList.add('spinner-border');
            logo.classList.add('align-items-center');
            logo.setAttribute('role','status');
            logo.setAttribute('aria-hidden','true');
            div.appendChild(logo);
          }
          this.item = div;
        }
        insertIn(elementTarget){
          elementTarget.innerHTML='';
          elementTarget.appendChild(this.item);
        }
      }


      class Table{
        constructor(ListHeader){
          this.qtyColumn = ListHeader.length;
          let table = document.createElement('table');
          table.classList.add('table');
          let thead = document.createElement('thead');
          let trh = document.createElement('tr');
          let th = document.createElement('th');
          th.setAttribute('scope','col');
          th.innerText="#";
          trh.appendChild(th);
          for(let columnTitle in ListHeader){
              let thn = document.createElement('th');
              thn.setAttribute('scope','col');
              thn.innerText=ListHeader[columnTitle];
              trh.appendChild(thn);

          }
          thead.appendChild(trh);
          table.appendChild(thead);
          let tbody = document.createElement('tbody');
          this.table = table;
          this.head = thead;
          this.body = tbody;
          
          //let tbody = document.createElement('tbody');
        }
        addRow(ListRow){
          let trb = document.createElement('tr');
          let th_row = document.createElement('tr');
          th_row.setAttribute('soce','row');
          let td = document.createElement('td');
          if (this.qtyColumn !=ListRow.length ){
           
            th_row.innerText=0;
            trb.appendChild(th_row);
            
            td.setAttribute('colspan',String(this.qtyColumn));
            td.innerText="NUMERO DE COLUNAS NÃO BATE COM O DA TABELA";
            trb.appendChild(td);
            //this.body.appendChild(trb);
            
          }else{
            for(let a=0;a<this.qtyColumn;a++){
              th_row.innerText=a;
              trb.appendChild(th_row);
              td.innerText=ListRow[a];
              trb.appendChild(td);
             
            }
          }
          this.body.appendChild(trb);
        }
        finalize(){
          this.table.appendChild(this.body); 
        }
       }

      class List{
        constructor(numbered=true){
          let tag = 'ul';
          let grupoType = undefined;
          if (numbered){
            tag = 'ol';
            grupoType = 'list-group-numbered'; 
          }
          let thislist = document.createElement(tag);
          thislist.classList.add('list-group');
          thislist.classList.add(grupoType);
          this.list = thislist;

        }
        addItem(idItem,name,qtdp=undefined,info=undefined,funcDel=undefined,delParams={},funcClick=undefined,clickParams={}){
          let thisItem = document.createElement('li');
          thisItem.classList.add('list-group-item');
          thisItem.classList.add('d-flex');
          thisItem.classList.add('justify-content-between');
          thisItem.classList.add('align-items-start');
          
          thisItem.setAttribute('id',idItem);
          if(funcClick!=undefined){
              thisItem.classList.add('list-group-item-action');
              thisItem.addEventListener('click',function(){funcClick(clickParams)});
          }
          
          let divInfo  = document.createElement('div');
          divInfo.classList.add('ms-2');
          divInfo.classList.add('me-auto');

          let divName = document.createElement('div');
          divName.classList.add('fw-bold');
          divName.innerHTML = name+'   ';
          if(qtdp!=undefined){
              let qtdProcs = document.createElement('span');
              qtdProcs.classList.add('badge');
              qtdProcs.classList.add('bg-info');
              qtdProcs.classList.add('info-qty');
              qtdProcs.classList.add('rounded-pill'); 
              qtdProcs.innerHTML=qtdp;

              divName.appendChild(qtdProcs);
          }
          divInfo.appendChild(divName);
          if(info!=undefined){
              let Recipientinfo = document.createElement('span');
              Recipientinfo.innerHTML= info;
              divInfo.appendChild(Recipientinfo);
          }
          thisItem.appendChild(divInfo);

          if(funcDel!=undefined){
              let clsButton = document.createElement('span');
              clsButton.classList.add('badge');
              clsButton.classList.add('bg-danger');
              clsButton.classList.add('rounded-pill');
              clsButton.setAttribute('role','button')
              clsButton.innerHTML='X';
              clsButton.addEventListener('click',function(event){
                                                        funcDel(delParams);
                                                        event.stopPropagation();})
              thisItem.appendChild(clsButton);
          }
          this.list.appendChild(thisItem);
    
        }
        lockItems(id){
          let items = [].slice.call(this.list.children);
          items.map(function(obj){
            if(obj.id== id){
              obj.classList.add('active');
            }
              obj.classList.add('disabled');
            
          });
          
        }
        checkContainsText(text){
          let items = [].slice.call(this.list.children);
          let contains= false;
          items.map(function(obj){
            if(obj.innerText.includes(text)){
              contains = true;
            }
              
          });
          return contains;
        }
        setItemQty(newQty,idItem){
         
          let items = [].slice.call(this.list.children);
          items.map(function(obj){
            if(obj.id== idItem){
              obj.querySelector('.info-qty').innerHTML=newQty;
              //obj
              //.classList.add('active');
            }
              
            
          });
        }
        releaseItems(){
          let items = [].slice.call(this.list.children);
          items.map(function(obj){
              obj.classList.remove('active');
              obj.classList.remove('disabled');
          });
        }
        loadList(p_list){
          this.list=p_list;
        }
      }

      class Button{
        constructor(text,tagType='a',collor='primary',action=undefined,params={}){
          let btn = document.createElement(tagType);
          btn.innerHTML=text;
          btn.classList.add('btn');
          btn.classList.add('btn-'+collor);
          btn.classList.add('mt-3');
          btn.classList.add('mx-2');
          if(action!=undefined){
              btn.addEventListener('click',function (){
                  action(params);
              });
          }
          this.button = btn;
        }
        changeText(NewText){
          this.button.innerHTML=NewText;
          

        }
        changeColor(NewColor){
          this.button.classList.forEach(function(val){
            if(val.includes('btn-')){
              this.button.classList.remove(val);
            }
          });
          this.button.classList.add(NewColor);
        }
        disable(){
          this.button.classList.add('disabled');  
        }
        enable(){
          this.button.classList.remove('disabled');  
        }
      }

      class Icon{
        constructor(tipo='addFace',height='24',width='24',color='#000000',classId='No_id',funcClick=undefined,clickParams={}){
          this.tipos ={'addFace':"M18,9V7h-2V2.84C14.77,2.3,13.42,2,11.99,2C6.47,2,2,6.48,2,12s4.47,10,9.99,10C17.52,22,22,17.52,22,12 c0-1.05-0.17-2.05-0.47-3H18z M15.5,8C16.33,8,17,8.67,17,9.5S16.33,11,15.5,11S14,10.33,14,9.5S14.67,8,15.5,8z M8.5,8 C9.33,8,10,8.67,10,9.5S9.33,11,8.5,11S7,10.33,7,9.5S7.67,8,8.5,8z M12,17.5c-2.33,0-4.31-1.46-5.11-3.5h10.22 C16.31,16.04,14.33,17.5,12,17.5z M22,3h2v2h-2v2h-2V5h-2V3h2V1h2V3z",
                       'uva-logo':"M63.0711 1.19849L54.4319 26.0424H54.2321L45.5929 1.19849H35.0062L49.4381 38.6766H59.0261L73.483 1.19849H63.0711ZM83.2458 24.9687L87.3657 12.784H87.5654L91.7102 24.9687H83.2458ZM92.7839 1.19849H82.322L67.915 38.6766H78.0773L80.5492 32.4344H94.3569L96.8538 38.6766H107.191L92.7839 1.19849ZM22.9713 20.9488C22.9713 25.8177 22.6217 31.136 16.3545 31.136C10.0874 31.136 9.73781 25.8177 9.73781 20.9488V1.22346H0V22.2971C0 27.1161 0.19975 31.8851 3.92009 35.5056C7.04119 38.5767 11.96 39.6753 16.3296 39.6753C20.6991 39.6753 25.6179 38.5767 28.764 35.5056C32.4843 31.8851 32.6841 27.1161 32.6841 22.2971V1.19849H22.9713V20.9488Z",
                       'circulo':"M106.642 20C106.642 8.96378 115.605 0 126.666 0C137.728 0 146.666 8.96378 146.666 20C146.666 31.0362 137.703 39.9999 126.666 39.9999C115.605 40.0249 106.642 31.0611 106.642 20Z"}
          if (!Object.keys(this.tipos).includes(tipo)) {
            throw 'Não existe código cadastrado para o tipo \''+tipo+'\' informado';
          }
          if (funcClick==undefined && Object.keys(clickParams).length > 0) {
            throw 'Foi craido um item com parametros de função mas sem função definida';
          }
          
          let svgNS = 'http://www.w3.org/2000/svg';
          let svg = document.createElementNS(svgNS,'svg');
          //let svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
          
          svg.setAttribute('xmlns','http://www.w3.org/2000/svg');
          svg.setAttribute('enable-background','new 0 0 '+width+' '+height);
          svg.setAttribute('viewBox','0 0 '+width+' '+height);
          svg.setAttribute('height',height+'px');
          svg.setAttribute('width',width+'px');
          svg.setAttribute('fill',color);
          if(funcClick!=undefined){
          svg.setAttribute('role','button');

          svg.addEventListener('click',function(event){
            console.log('Entrou aqui!');
            let p = clickParams;
            p['svgClicked'] = event.currentTarget;
            funcClick(p);
            event.stopPropagation();

          });
          }
          
          let rect = document.createElementNS(svgNS,'rect');
          rect.setAttribute('fill','none');
          rect.setAttribute('height',height);
          rect.setAttribute('width',width);


          let path = document.createElementNS(svgNS,'path');
          path.setAttribute('d',this.tipos[tipo]);
          
          
          svg.appendChild(rect);
          svg.appendChild(path);
          //embed.setAttribute('src',svg);

          let row = document.createElement('div');
          row.classList.add('row');
          row.classList.add('m-0');
          row.classList.add(classId);
          

          let col = document.createElement('div');
          col.classList.add('col-auto');
          col.classList.add('px-0');

          let label = document.createElement('div');
          label.classList.add('col-auto');
          label.classList.add('px-0');
          label.classList.add('me-0');
          label.classList.add('ms-3');
          //col.innerHTML="Daniel ";
          col.appendChild(svg);
          row.appendChild(col);
          row.appendChild(label);

         // row.appendChild(col);
          this.svg =  svg;
          this.path =  path;
          this.ico = row;

        }
        setPathAttri(atrii,value){
          this.path.setAttribute(atrii,value);

        }
        loadElementBySVG(svg){
          let col = svg.parentElement;
          let row = col.parentElement;
          this.ico = row;
        }
        loadRow(Element){
          this.ico = Element;
        }
        changeDesenho(newTipo=undefined,newColor=undefined){
         
          let svg = this.ico.firstChild.firstChild;
          
          if(newColor!= undefined){
              svg.setAttribute('fill',newColor);
          }
          if(newTipo!= undefined){
            if (!Object.keys(this.tipos).includes(newTipo)) {
              throw 'Não existe código cadastrado para o tipo \''+newTipo+'\' informado';
            }
              svg.lastChild.remove();
              let path = document.createElementNS(svgNS,'path');
              path.setAttribute('d',this.tipos[newTipo]);
          }
        }
        hidden(what='All'){
          switch(what){
            case 'All':
              this.ico.setAttribute('style','visibility: hidden;');
              //this.ico.classList.add('visually-hidden');
              break;
            case 'Ico':
              this.ico.firstChild.setAttribute('style','visibility: hidden;');
              //this.ico.firstChild.classList.add('visually-hidden');
              break;
            case 'Label':
              this.ico.lastChild.setAttribute('style','visibility: hidden;');
              //this.ico.lastChild.classList.add('visually-hidden');
              break;
          }
        }
        show(what='All'){
          switch(what){
            case 'All':
              this.ico.setAttribute('style',' ');
             // this.ico.classList.remove('visually-hidden');
              break;
            case 'Ico':
              this.ico.firstChild.setAttribute('style',' ');
              //this.ico.firstChild.classList.remove('visually-hidden');
              break;
            case 'Label':
              this.ico.lastChild.setAttribute('style',' ');
              //this.ico.lastChild.classList.remove('visually-hidden');
              break;
          }
          //this.ico.classList.remove('visually-hidden');
        }
        setLabel(label){
          this.ico.lastChild.innerHTML=label;
        }
        loadElement(element){
          this.ico = element;

        }
        insertIco(targ){
          targ.appendChild(this.ico)
        }
      }
      class Input{
        constructor(text='Sem texto',id='No_Id',val_type='string'){
          
          let idGroup = id+'_inputG'
          
          let group = createHTMLELement(
            ['input-group','input-group-sm','mb-3'],
            {});

          let label = createHTMLELement(
            ['input-group-text'],
            {'id':idGroup},
            'span');
          label.innerText = text;

          let input =  createHTMLELement(
            ['form-control'],
            {'type':'text',
              'id':id,
              'aria-describedby':idGroup,
              'aria-label':'Inputing '+text},
            'input');

          if (val_type== 'int'){
            input.addEventListener('keyup',function(e){
              let fieldValue = e.currentTarget.value;
              let ValidValue ='';
              for(let cpos in fieldValue){
                if(!isNaN(parseInt(fieldValue[cpos])) || (cpos == 0 && fieldValue[cpos]=='-')){
                  ValidValue+=fieldValue[cpos];
                }
              }
              e.currentTarget.value = ValidValue;
             
            });
          }
          if (val_type== 'float'){
            input.addEventListener('keyup',function(e){
              let fieldValue = e.currentTarget.value;
              let ValidValue ='';
              let qtdDecimalSep=0;
              
              for(let cpos in fieldValue){
                let carctere = fieldValue[cpos];
                if(carctere==','){
                  carctere='.';
                }
                if(!isNaN(parseFloat(carctere))|| (cpos == 0 && carctere=='-')){

                  ValidValue+=carctere;
                }else{
                  if(qtdDecimalSep==0 && carctere=='.'){
                    qtdDecimalSep+=1;
                    ValidValue+=carctere;

                  }
                }
              }
              if(ValidValue=='-.'){
                ValidValue='-0.';
              }
              e.currentTarget.value = ValidValue;
             
            });
          }
          group.appendChild(label);
          group.appendChild(input);

          this.input = group;

        }
      }

      class Card{
        constructor(title='Sem'){
          let tagcard = document.createElement('div');
          tagcard.setAttribute('style','width: 18rem;')
          tagcard.classList.add('card');
          tagcard.classList.add('p-0');
          
          tagcard.classList.add('m-3');
          this.card = tagcard;
          let cardBody = document.createElement('div');
          cardBody.classList.add('card-body');
          cardBody.classList.add('p-3');
          let cardHeader = document.createElement('div');
          cardHeader.classList.add('card-header');
          let tagtitle = document.createElement('h5');
          tagtitle.innerText=title;
          cardHeader.appendChild(tagtitle);
          this.card.appendChild(cardHeader);
          this.body=cardBody;
        }

        appendToBoddy(element){
          this.body.appendChild(element);
        }
        finalize(){
          this.card.appendChild(this.body);
        }
      }

      class Alert{
        constructor(type='alert-success'){
          let alert = document.createElement('div');
          alert.classList.add('alert');

          alert.classList.add(type);
          this.curType = type;
          alert.classList.add('alert-dismissible');
          alert.classList.add('fade');
          alert.classList.add('show');
          alert.classList.add('position-relative');
          alert.classList.add('top-0');
          alert.classList.add('ms-3');
          alert.setAttribute('role','alert');
          alert.setAttribute('style','pointer-events: auto;');
          let alertBody = document.createElement('div');
          alert.appendChild(alertBody);
          this.body = alertBody;
          let btn_close = document.createElement('button');
          btn_close.classList.add('btn-close'); 
          btn_close.setAttribute('type','button');
          btn_close.setAttribute('data-bs-dismiss','alert');
          btn_close.setAttribute('aria-label','Fechar'); 
          alert.appendChild(btn_close);
          this.alert = alert;

        }
        setInner(HTML){
          this.body.innerHTML=HTML;
        }
        changeType(newType='alert-danger'){
          this.alert.classList.remove(this.curType);
          this.alert.classList.add(newType);
          this.curType = newType;
        }
      }

      class PageLayout{
        constructor(type='containerCenter',
                    bgTittleColor='#0360a0',
                    cntColor='#0693e3'){
            
            this.alertZone =  createHTMLELement(
              ['position-absolute','start-0','top-0'],
              {'style':'z-index: 9999999; pointer-events: none; display: flex; flex-wrap: wrap'}
                                              );
            this.contaier = createHTMLELement(
              ['container','mt-5'],
              {'style':'background-color:'+cntColor}
            ); 
              
            this.titleRow = createHTMLELement(
              ['row'],
              {'style':'background-color:'+bgTittleColor}
            );
            
            this.contaier.appendChild(this.titleRow);

            this.BodyRow = createHTMLELement(
              ['row']
            );
            this.contaier.appendChild(this.BodyRow);
        }
        
        setTitle(logo=undefined,titleTex='TITULO DA PÁGINA',fntColor='#fff'){
          
          let TextColSize = 'col-12'
          if(logo != undefined){
                this.logoZone = createHTMLELement(
                  ['col-auto','p-3']
                );
                this.logoZone.appendChild(logo);
                this.titleRow.appendChild(this.logoZone);

                TextColSize = 'col'

          }
          this.titleZone = createHTMLELement(
                [TextColSize,'p-3']
          );
          let titleHTML = createHTMLELement(
                ['m-3','text-center'],
                {'style':'color:'+fntColor},
                'h1'
          );
          titleHTML.innerText=titleTex;
          this.titleZone.appendChild(titleHTML);
          this.titleRow.appendChild(this.titleZone);

        }
      }
           