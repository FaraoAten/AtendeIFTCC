// Funções da tela principal dos usuários do tipo professor (Atendimentos)

var myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {
    keyboard: false,
    focus: true
  }); 

window.onload = function () { 

    telaAtendimentoProf();

    if(sessionStorage.getItem('primeiroLogin')==0){

        AlterarModal('confirmacao','Por favor insira uma foto sua no sistema.');
        AlterarModal('msg', '<button type="button" class="btn btn-primary btn-lg col-md-3 col-5 me-1 arredondado sombra" onclick="window.location.href=`./editarPerfilProfessor.html`" data-bs-dismiss="modal">Ok</button>');
        myModal.show();

        sessionStorage.setItem('primeiroLogin', 1);
        
        ajaxPutPrimeiroLogin('usuario/primeiroLogin');
  }
}

async function telaAtendimentoProf(){

    var main = document.getElementById('main');

    await ajaxGetHeaderAuthorization('atendimento/professor').then(function(result){

        main.innerHTML = "";

        var chaves = Object.keys(result);
        for (let i = 0; i < chaves.length; i++) {
            const chave = chaves[i];

            var divLinha = document.createElement("div");
            var divColuna = document.createElement("div");
            var str = document.createElement("strong");

            var textoChave = document.createTextNode(chave);

            str.appendChild(textoChave);
            divColuna.appendChild(str);
            divLinha.appendChild(divColuna);

            for (let j = 0; j < result[chave].length; j++) {
                const elemento = result[chave][j];

                var divCol = document.createElement("div");
                var divNome = document.createElement("div");
                var divMat = document.createElement("div");
                var divDisciplina = document.createElement("div");
                var divLocal = document.createElement("div");
                var divHora = document.createElement("div");
                var btnAlterar = document.createElement("button");
                var btnCancelar = document.createElement("button");
                var strNome = document.createElement("strong");
                var strMat = document.createElement("strong");
                var strDisciplina = document.createElement("strong");
                var strLocal = document.createElement("strong");
                var strHora = document.createElement("strong");

                var textoNome = document.createTextNode("Estudante: ");
                var textoMat = document.createTextNode("Matrícula: ");
                var textoDisciplina = document.createTextNode("Disciplina: ");
                var textoLocal = document.createTextNode("Onde: ");
                var textoHora = document.createTextNode("Horas: ");
                var textoBtnA = document.createTextNode("Alterar");
                var textoBtnC = document.createTextNode("Cancelar");

                strNome.appendChild(textoNome);
                strMat.appendChild(textoMat);
                strDisciplina.appendChild(textoDisciplina);
                strLocal.appendChild(textoLocal);
                strHora.appendChild(textoHora);
                divNome.appendChild(strNome);
                divMat.appendChild(strMat);
                divDisciplina.appendChild(strDisciplina);
                divLocal.appendChild(strLocal);
                divHora.appendChild(strHora);
                btnAlterar.appendChild(textoBtnA);
                btnCancelar.appendChild(textoBtnC);
                divCol.appendChild(divNome);
                divCol.appendChild(divMat);
                divCol.appendChild(divDisciplina);
                divCol.appendChild(divLocal);
                divCol.appendChild(divHora);
                divCol.appendChild(btnAlterar);
                divCol.appendChild(btnCancelar);
                divLinha.appendChild(divCol);

                divCol.classList.add("col-11", "col-md-6", "col-lg-4", "border", "border-2", "border-dark", "arredondado", "p-2", "maior14", "mt-3", "mx-3");
                divNome.classList.add("maior16");
                divMat.classList.add("maior16");
                divDisciplina.classList.add("maior16");
                divHora.classList.add("maior16");
                divLocal.classList.add("maior16");
                btnAlterar.classList.add("col-md", "col", "btn", "btn-md", "arredondado", "border-dark", "sombra", "azul", "text-white", "mt-2", "me-1", "maior14");
                btnCancelar.classList.add("col-md", "col", "btn", "btn-md", "arredondado", "border-dark", "sombra", "azul", "text-white", "mt-2", "ms-1", "maior14");
                
                divNome.innerHTML+=elemento.nome;
                divMat.innerHTML+=elemento.matricula;
                divDisciplina.innerHTML+=elemento.materia;
                divLocal.innerHTML+=elemento.local;
                divHora.innerHTML+=elemento.horario;
                btnAlterar.innerHTML+='&nbsp;&nbsp;<i class="far fa-clock fa-lg"></i>';
                btnCancelar.innerHTML+='&nbsp;&nbsp;<i class="fas fa-ban fa-lg"></i>';
                
                btnAlterar.onclick = function () {

                    var dataLista = chave.split('/');
                    var dataFormatada = "";
                    for (let i = (dataLista.length - 1); i >= 0; i--) {
                        if(i==0){
                            dataFormatada += dataLista[i];
                        }else{
                            dataFormatada += dataLista[i]+"-"
                        }               
                    }

                    window.location.href = './alterarAtendimento.html'; 

                    sessionStorage.setItem('id_atendimento', elemento.id);
                    sessionStorage.setItem('id_usuario', elemento.id_usuario); 
                    sessionStorage.setItem('horario', elemento.horario); 
                    sessionStorage.setItem('local', elemento.local); 
                    sessionStorage.setItem('nome', elemento.nome);
                    sessionStorage.setItem('data', dataFormatada);
                }

                btnCancelar.onclick = function(){

                    var dataLista = chave.split('/');
                    var dataFormatada = "";
                    for (let i = (dataLista.length - 1); i >= 0; i--) {
                        if(i==0){
                            dataFormatada += dataLista[i];
                        }else{
                            dataFormatada += dataLista[i]+"-"
                        }               
                    }

                    sessionStorage.setItem('id_atendimento', elemento.id);
                    sessionStorage.setItem('id_usuario', elemento.id_usuario);
                    sessionStorage.setItem('data', dataFormatada);

                    AlterarModal('confirmacao','Por favor confirme o cancelamento.');
                    AlterarModal('msg', '<button type="button" class="btn btn-success btn-lg col-md-3 col-5 me-1 arredondado sombra" onclick="confirmar(true)" data-bs-dismiss="modal">Confirmar</button><button type="button" class="btn btn-danger btn-lg col-md-3 col-5 ms-1 arredondado sombra" onclick="confirmar(false)" data-bs-dismiss="modal">Cancelar</button>');
                    myModal.show();
                };
            }
            
            divLinha.classList.add("row", "justify-content-center", "mb-3", "maior28");
            divColuna.classList.add("border-2", "border-bottom", "border-dark", "col-11", "col-md-6", "col-lg-11", "text-center", "cinza");
            
            main.appendChild(divLinha);
        }
    }).catch(function(p){

        main.innerHTML = "";

        var div = document.createElement("div");
        var h1 = document.createElement ("h1");

        var textoH1 = document.createTextNode("Sem Atendimentos Marcados");

        h1.appendChild(textoH1);

        div.innerHTML = '<i class="fas fa-chalkboard-teacher fa-7x"></i>';

        div.classList.add("text-secondary", "row", "justify-content-center", "mt-5", "text-center");
        h1.classList.add("text-secondary", "row", "justify-content-center", "mt-3");

        main.appendChild(div);
        main.appendChild(h1);
  });
}

function confirmar (confirm) {
    if(confirm){ 
        cancelar();
    }
}

async function cancelar(){
    var dataComparacao = new Date();
    dataComparacao.setDate(dataComparacao.getDate()+6);

    if((sessionStorage.getItem('data'))>dataComparacao){
        atendimento = {};
        atendimento.id_atendimento = sessionStorage.getItem('id_atendimento');
        atendimento.status_cancelamento = 1;

        await ajaxPut('atendimento/cancelar', atendimento);

        telaAtendimentoProf();
    }else{
        await ajaxGetHeaderIdAtendimento("atendimento/mensagemCancelamento").then(async function(result){
            atendimento = {};
            atendimento.id_atendimento = sessionStorage.getItem('id_atendimento');
            atendimento.status_cancelamento = 1;

            await ajaxPut('atendimento/cancelar', atendimento);
    
            var mensagem = {};
            mensagem.titulo = 'Atendimento cancelado';
            mensagem.corpo = `O seu atendimento de ${result.dataMsg}, dia ${result.diaMsg} de ${result.mesMsg}, foi cancelado.`;
            mensagem.id_remetente = sessionStorage.getItem('authorization');
            mensagem.id_destinatario = sessionStorage.getItem('id_usuario');
            mensagem.id_atendimento = sessionStorage.getItem('id_atendimento');
            await ajaxPost('mensagem', mensagem);
    
            telaAtendimentoProf();
        });
    }
}


