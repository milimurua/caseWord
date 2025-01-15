async function signIn() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    try {
        let response = await fetch('../registro/thing.json');

        if (!response.ok) {
            throw new Error('Respuesta no exitosa al cargar thing.json');
        }

        let usuarios = await response.json();

        let usuarioValido = usuarios.find(usuario => usuario.email === email && usuario.password === password);

        if (usuarioValido) {
            document.cookie = `email=${email}; path=/`;
            window.location.href = "../profile/index.html";
        } else {
            alert("Correo electrónico o contraseña incorrectos.");
        }
    } catch (error) {
        console.error('Error al cargar el archivo JSON:', error);
    }
}

function onSignIn() {
    var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

    var params = {
        'client_id': '',//agegra el client id de google
        'redirect_uri': 'http://localhost:5500/userPage/profile/Index.html',
        'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/userinfo.email',
        'include_granted_scopes': 'true',
        'response_type': 'token'
    };

    var form = document.createElement('form');
    form.setAttribute('method', 'GET');
    form.setAttribute('action', oauth2Endpoint);

    for (var p in params) {
        var input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', p);
        input.setAttribute('value', params[p]);
        form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();
}

function getUserInfo(accessToken) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + accessToken);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var userInfo = JSON.parse(xhr.responseText);
            } else {
                console.error('Error fetching user info:', xhr.responseText);
            }
        }
    };
    xhr.send();
}

window.onload = function() {
    var params = getAccessTokenFromUrl();
    console.log('Access token params:', params);
    if (params.access_token) {
        getUserInfo(params.access_token);
    } else {
        console.error('No access token found in URL');
    }
};

function createAccount() {
    window.location.href = '../registro/Index.html';
}