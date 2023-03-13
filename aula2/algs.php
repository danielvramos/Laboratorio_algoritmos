<?php
//por
$parameters = $_POST['params'];

function codToString($code){
    $ARRAY = explode($code,',');
    $msg ="";
    for($i=0; $i < count($ARRAY)-1;$i++){
        $code = intval($ARRAY[$i]);
        $msg += chr($code);
    }

}

switch($parameters['algoritimo']){
    case 'Questão 1':
        echo "<strong class='h3'>Primeira Questão:</strong></br></br>";
        //echo "<p> Olá ".$parameters['nome'].",</p>";
        $total=0;
        $maior=0;
        $nomeMaior='';
        for($aluno=1; $aluno <= $parameters['qtdMotas']; $aluno++){
            echo "Aluno '".$parameters['nome_'.$aluno]."' nota: ".$parameters['nota_'.$aluno]."</br>";
            $total += $parameters['nota_'.$aluno];
            if($parameters['nota_'.$aluno]>$maior){
                $maior=$parameters['nota_'.$aluno];
                $nomeMaior=$parameters['nome_'.$aluno];
            }
           // echo "</br>"
        }
        
        echo "</br></br><p>A média das notas é ".($total/$parameters['qtdMotas'])."</p>";
        echo "<p>A maior das notas é ".$maior." de ".$nomeMaior."</p>";
        break;
        case 'Questão 2':
            echo "<strong class='h3'>Segunda Questão:</strong></br></br>";
            //echo "<p> Olá ".$parameters['nome'].",</p>";
            $qtdNeg=0;
            $qtdPos=0;
            $qtdPar=0;
            $qtdInpar=0;
            
            for($aluno=1; $aluno <= $parameters['qtdMotas']; $aluno++){
                if(intval($parameters['nota_'.$aluno])<0){
                    $qtdNeg+=1;
                }else{
                    $qtdPos+=1; 
                }
                if((intval($parameters['nota_'.$aluno])%2)==0){
                    $qtdPar+=1;
                }else{
                    $qtdInpar+=1; 
                }
        
               // echo "</br>"
            }
            
            echo "</br></br><p>São  ".$qtdPar." números pares</p>";
            echo "<p>São  ".$qtdInpar." números Inpares</p>";
            echo "<p>São  ".$qtdNeg." números Negativo</p>";
            echo "<p>São  ".$qtdPos." números Positivo</p>";
            break;
            
    case 'Questão 3':
        if (array_key_exists('multiply', $parameters)){
            $val_vet = $parameters['vetor'];
            for($aluno=0; $aluno < $parameters['qtdMotas']; $aluno++){
               
                echo ''.$val_vet[$aluno].' X '.$parameters['fator_q3'].'='.floatval($val_vet[$aluno])*floatval($parameters['fator_q3']).'</br>';
             }
        }
        else{
            echo "<strong class='h3'>Terceira Questão:</strong></br></br>";
            $value=array();
            for($aluno=1; $aluno <= $parameters['qtdMotas']; $aluno++){
               array_push($value, floatval($parameters['nota_'.$aluno]));
               
            }
            
            $id = time();
           // $_SESSION["SessaoQ3"]=$value;
            echo '<p class="h6">Separador decimal é \'.\'</p>
                    <input id="fator_q3_'.$id.'" type="text" onkeyup="if (this.value.slice(-1) == \',\' || (this.value.slice(-1) != \'.\' && isNaN(parseInt(this.value.slice(-1))))){this.value = this.value.slice(0,-1);}"></input>
                    <a class="btn btn-success" onclick="(function(){
                        let fat = document.getElementById(\'fator_q3_'.$id.'\').value;
                        
                        if(isNaN(parseFloat(fat))){
                            alert(\'Fator (\'+fat+\') deve ser um número!\');
                            document.getElementById(\'fator_q3_'.$id.'\').value=\'\';
                            return undefined;
                        }
                        fat = parseFloat(fat);
                        document.getElementById(\'fator_q3_'.$id.'\').value=fat;

                        $.post(\'./algs.php\',{params:{algoritimo:\'Questão 3\',multiply:true,fator_q3:fat,qtdMotas:'.$parameters['qtdMotas'].',vetor:'.json_encode($value).'}}).done(function(data){
    
                            let recipie = document.getElementById(\'rec_q3_'.$id.'\');
                            
                            recipie.innerHTML = data;
                          
                           }
                           
                           )
                    })()"  type="text">Multiplicar</a>
                    <div id="rec_q3_'.$id.'"></div>
            
            ';
                }
          break;
    default:
        echo "Algoritimo '".$parameters['algoritimo']."' ainda não foi implementado";
}
?>