function showImage() {
    let newImage = document.getElementById('image-show').lastElementChild;
    //이미지는 화면에 나타나고
    newImage.style.visibility = "visible";
    //이미지 업로드 버튼은 숨겨진다
    document.getElementById('image-upload').style.visibility = 'hidden';
    document.getElementById('fileName').textContent = null;     //기존 파일 이름 지우기
}

function loadFile(input) {
    let image_div = $(input).parent()
    // console.log(image_div.attr('id'))
    image_div.css({'background-color':'black'})
    $(input).prev().hide()
    let file = input.files[0];	//선택된 파일 가져오기
  	//새로운 이미지 div 추가
    let newImage = document.createElement("img");
    newImage.setAttribute("class", 'img');
    //이미지 source 가져오기
    newImage.src = URL.createObjectURL(file);
    newImage.style.width = "70%";
    newImage.style.height = "70%";
    newImage.style.visibility = "hidden";   //버튼을 누르기 전까지는 이미지를 숨긴다
    newImage.style.objectFit = "contain";
}


// function posting(){
//     let title = $('#title').val()
//     let file = $('#file')[0].files[0]
//     let from_data = new FormData()
//
//     from_data.append("title_give", title)
//     form_data.append("file_give", file)
//
//     $.ajax({
//         type: "POST",
//         url: "/fileupload",
//         data: form_data,
//         cache: false,
//         contentType: false,
//         processData: false,
//         success: function (response){
//             alert(response["result"])
//             window.location.reload()
//         }
//     });
// }






function upload() {
    let file = $('#upload-file')[0].files[0]
    let title = $('#upload-title').val()
    let form_data = new FormData()

    form_data.append("file_give", file)
    form_data.append("title_give", title)

    $.ajax({
        type: "POST",
        url: "/upload",
        data: form_data,
        cache: false,
        contentType: false,
        processData: false,
        success: function (response) {
            alert(response["result"])
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

  function preview() {
    let frame = document.getElementById('frame');
    frame.src=URL.createObjectURL(event.target.files[0]);
    frame.style.display = 'block';
  }