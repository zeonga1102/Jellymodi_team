$(document).ready(function(){
	$('#floating_edit_button').hide();
});

function edit_button_click() {
  $('#edit_desc').css('display', 'block');
  $('#desc').hide();
  $('#floating_modal_button').hide();
  $('#option_modal').modal("hide")
  $('#floating_edit_button').show();
}

function done_button_click(post_id) {
  let desc = $('#edit_desc').val();

  $.ajax({
    type: 'POST',
    url: '/detail/update',
    data: {post_id: post_id, desc: desc},
    success: function (response) {
      window.location.reload();
    }
  });
}