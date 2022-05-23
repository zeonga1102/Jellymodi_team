function refresh() {
    window.location.reload()
}

function signup() {
    let email = $('#userid').val()
    let password = $('#userpw').val()

    if (email == '') {
        alert('이메일을 적어주세요!')
    } else if (password == '') {
        alert('비밀번호를 적어주세요!')
    } else if (password.length < 4) {
        alert('비밀번호가 너무 짧아요!')
    } else {
        $.ajax({
            type: "POST",
            url: "/jelly/api/signup",
            data: {
                email_give: email,
                pw_give: password
            },
            success: function (response) {
                if (response['result'] == 'success') {
                    alert('이제 젤리들을 모아봐요 XD')
                    window.location.href = '/'
                } else {
                    alert(response['msg'])
                }
            }
        })
    }
}

function login() {
    let email = $('#userid').val()
    let password = $('#userpw').val()

    if (email == '') {
        alert('이메일을 적어주세요!')
    }
    if (password == '') {
        alert('비밀번호를 적어주세요!')
    } else {
        $.ajax({
            type: "POST",
            url: "/jelly/api/login",
            data: {email_give: email, pw_give: password},
            success: function (response) {
                if (response['result'] == 'success') {
                    $.cookie('mytoken', response['token'], {path:'/'});

                    alert('오늘도 좋은하루 :D')
                    window.location.href = '/'
                } else {
                    alert(response['msg'])
                }

            }, error: function (response) {
                alert('error')
            }
        })
    }
}


