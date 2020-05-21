$(document).ready(function()
{


$('[data-action="top_panel_1"]').on('mousedown wheel DOMMouseScroll mousewheel mousemove touchstart touchend touchmove', function (e) { e.stopPropagation(); });
$('[ui_1=""]').on('mousedown wheel DOMMouseScroll mousewheel mousemove touchstart touchend touchmove', function (e) { e.stopPropagation(); });
		




$('[nameId="butt_camera_2D"]').mousedown(function() { changeCamera(cameraTop); $(this).hide(); $('[nameId="butt_camera_3D"]').show(); });
$('[nameId="butt_camera_3D"]').mousedown(function() { changeCamera(camera3D); $(this).hide(); $('[nameId="butt_camera_2D"]').show(); });


				
$('[nameId="zoom_camera_butt_m"]').bind('touchstart click', function(){ zoomLoop = 'zoomOut'; });
$('[nameId="zoom_camera_butt_p"]').bind('touchstart click', function(){ zoomLoop = 'zoomIn'; });
$(window).bind('touchend click', function(){ zoomLoop = ''; });


$('[nameId="zoom_camera_butt_m"]').mousedown(function () { zoomLoop = 'zoomOut'; });
$('[nameId="zoom_camera_butt_p"]').mousedown(function () { zoomLoop = 'zoomIn'; });
$(window).mouseup(function () { zoomLoop = ''; });



// загрузка obj --->


$('#load_obj_glb').change(readURL_glb);
function readURL_glb(e) 
{
	if (this.files[0]) 
	{		
		var reader = new FileReader();
		reader.onload = function (e) 
		{						
			loadInputFile({data: e.target.result, type: 'glb'});
		};				
		reader.readAsArrayBuffer(this.files[0]);  									
	};
};



$('#load_obj_fbx').change(readURL_fbx);
function readURL_fbx(e) 
{
	if (this.files[0]) 
	{		
		var reader = new FileReader();
		reader.onload = function (e) 
		{						
			loadInputFile({data: e.target.result, type: 'fbx'});
		};				
		reader.readAsArrayBuffer(this.files[0]);  									
	};
};


$('[nameId="butt_main_load_obj"]').mousedown(function () { $('[nameId="window_main_load_obj"]').css({"display":"block"}); });
$('[nameId="button_close_main_load_obj"]').mousedown(function () { $('[nameId="window_main_load_obj"]').css({"display":"none"}); });
$('[nameId="butt_del_obj"]').mousedown(function () { deleteObj(); });

// <--- загрузка obj

});







