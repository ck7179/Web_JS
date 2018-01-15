/*chatroom.html*/
var check_option = false;
$(document).ready(function(){
	var input_join = document.getElementById('input_join');
	var input_name = document.getElementById('input_name');	
	//動態調整版面
	$(window).on('resize', function(){
		$(show_message_layout).height($(write_message_wrapper).height()-200);
		$(show_message_layout).width($(write_message_wrapper).width()-80);
		$(write_layout).width($(write_message_wrapper).width()-40);
		$(input_write).width($(write_layout).width()-160);
    }).trigger('resize');
	//option預設隱藏
	
	$(write_option).hide();
});
function show_option() {
	if(!check_option){
		$(write_option).show();
		check_option = true;
	}else{
　		$(write_option).hide();
　		check_option = false;
	}	
}