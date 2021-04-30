function Login(){
    var form = document.getElementById("login");
    function handleForm(event) { event.preventDefault(); } 
    form.addEventListener('submit', handleForm);

    var log = {};
    var matriculaLogin = document.getElementById("matriculaLogin");
    log.num_matricula = matriculaLogin.value;
    
    var senhaLogin = document.getElementById("senhaLogin");
    log.senha = senhaLogin.value;

    var myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {
      keyboard: false,
      focus: true
    });

    login("usuario/login", log).then(function(result){
        if(result.tipo == 1){
          window.location.href = './html/estudanteBase.html';
          localStorage.setItem('authorization', result.id_usuario);
          localStorage.setItem('primeiroLogin', result.primeiro_login);
        }else if(result.tipo == 2){
          window.location.href = './html/professorBase.html';
          localStorage.setItem('authorization', result.id_usuario);
        }else if(result.tipo == 3){
          window.location.href = './html/profPedagBase.html';
          localStorage.setItem('authorization', result.id_usuario);
        }else{
          window.location.href = './html/pedagogiaBase.html';
        }
      }).catch(function(p){
        if(p.status == 405){
          showMod('msg', 'Este usuário não existe.');
          myModal.show();
        }else if(p.status == 400){
          showMod('msg', 'Senha incorreta.');
          myModal.show();
        }else if(p == {}){
          if(p.tipo == 1){
            window.location.href = './html/estudanteBase.html';
          }else if(p.tipo == 2){
            window.location.href = './html/professorBase.html';
          }else if(p.tipo == 3){
            window.location.href = './html/profPedagBase.html';
          }else{
            window.location.href = './html/pedagogiaBase.html';
          }
        }
      });
    }

async function login(theUrl, body){
    const myRequest = BASE_URL+theUrl;
    var ret = jQuery.ajax({
        type: 'POST',
        encoding:"UTF-8",
        dataType: 'json',
        contentType: 'application/json',
        url: myRequest,
        data:JSON.stringify(body),
    });
    return ret;
  }