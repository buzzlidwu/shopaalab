
function CheckStatus(){
  let status = $('.login_check').prop('checked')
  
  let text_input = $('#modal_text')
  if(status){

    text_input.text('登入成功')
  }else{
    text_input.text('請勾選使用條款')
  }
}
function ShowRegeister(){
  let loginpage = $('.login_card')
  let registerpage = $('.register_card')
  loginpage.addClass('display_none')
  registerpage.removeClass('display_none')
}