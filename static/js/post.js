function show_image(obj) {
    let url = URL.createObjectURL(event.target.files[0]);

    let siblings = $(obj).siblings();
    siblings.hide();

    let parent = $(obj).parent();
    if ($(obj).attr('id') == 'face_img') {
        let face_img = $('#face_img')[0].files[0];
        console.log(face_img)
        let form_data = new FormData();
        form_data.append('face_img', face_img);

        $.ajax({
            type: 'POST',
            url: '/post/change',
            data: form_data,
            cache: false,
            contentType: false,
            processData: false,
            success: function (response) {
                parent.css({
                    'background-image': `url(${response['url']}`,
                    'background-size': 'cover',
                    'border-radius': '0',
                    'box-shadow': 'none'
                });
            },
            error: function (response) {
                alert('error')
            }
        });
    } else {

        parent.css({'background-image': `url(${url}`, 'background-size': 'cover', 'border': 'none'});
    }
}

function submit() {
    let desc = $('#desc').val();
    let face_img = $('#face_img')[0].files[0];
    // let additional_img = $('#additional_img')[0].files[0];

    let form_data = new FormData();
    form_data.append('desc', desc);
    form_data.append('face_img', face_img);
    // form_data.append('additional_img', additional_img);

    $.ajax({
        type: 'POST',
        url: "/post/upload",
        data: form_data,
        cache: false,
        contentType: false,
        processData: false,
        success: function (response) {
            console.log(response["msg"])
            window.location.href = '/'
        }
    });
}


function search() {
    let title = $('#search-title').val()
    let form_data = new FormData()

    form_data.append("title_give", title)

    $.ajax({
        type: "POST",
        url: "/search",
        data: form_data,
        cache: false,
        contentType: false,
        processData: false,
        success: function (response) {
            let predictions = response["predictions"]
            $('.result').remove()
            for (let i = 0; i < predictions.length; i++) {
                let path = predictions[i]['path']
                let result = predictions[i]['result']

                let temp_html = `<div class="result"><img src="${path}" width="100px"/>
                                <p>${result}</p></div>`
                $('.search').append(temp_html)
            }
        }
    });
}

function preview(input) {
    let frame = document.getElementById('frame');
    let image_div = $(input).parent()
    image_div.css({'background-image': `url(${URL.createObjectURL(event.target.files[0])})`});
    frame.style.display = 'block';
}