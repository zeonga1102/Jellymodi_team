from pymongo import MongoClient
client = MongoClient('여기에 URL 입력')
db = client.dbsparta







function showImage() {
    let newImage = document.getElementById('image-show').lastElementChild;
    //이미지는 화면에 나타나고
    newImage.style.visibility = "visible";
    //이미지 업로드 버튼은 숨겨진다
    document.getElementById('image-upload').style.visibility = 'hidden';
    document.getElementById('fileName').textContent = null;     //기존 파일 이름 지우기
}

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

  function preview(input) {
    let frame = document.getElementById('frame');
    let image_div = $(input).parent()
    image_div.css({'background-image':`url(${URL.createObjectURL(event.target.files[0])})`});
    frame.style.display = 'block';
  }
  ///////////////////////////////////////////////////////////////////


//   // 이미지 업로드 강의영상 코드
//   function posting(){
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
// function save_image() {
//     $.ajax({
//         type: "POST",
//         url: "/saveImage",
//         data: {sample_give: '데이터전송'},
//         success: function (response) {
//             alert(response['msg'])
//         }
//     });
// }

