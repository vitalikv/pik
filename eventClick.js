$(document).ready(function()
{


$('[data-action="top_panel_1"]').on('mousedown wheel DOMMouseScroll mousewheel mousemove touchstart touchend touchmove', function (e) { e.stopPropagation(); });
$('[ui_1=""]').on('mousedown wheel DOMMouseScroll mousewheel mousemove touchstart touchend touchmove', function (e) { e.stopPropagation(); });
		




$('[nameId="butt_camera_2D"]').mousedown(function() { changeCamera(cameraTop); $(this).hide(); $('[nameId="butt_camera_3D"]').show(); });
$('[nameId="butt_camera_3D"]').mousedown(function() { changeCamera(camera3D); $(this).hide(); $('[nameId="butt_camera_2D"]').show(); });


				


$('[nameId="zoom_camera_butt_m"]').mousedown(function () { zoomLoop = 'zoomOut'; });
$('[nameId="zoom_camera_butt_p"]').mousedown(function () { zoomLoop = 'zoomIn'; });
$(window).mouseup(function () { zoomLoop = ''; });



// загрузка obj --->

$('#load_obj_1').change(readURL_2);

function readURL_2(e) 
{
	if (this.files[0]) 
	{		
		var reader = new FileReader();
		reader.onload = function (e) 
		{						
			loadInputFile({data: e.target.result});
		};				

		reader.readAsArrayBuffer(this.files[0]);  									
	};
};


$('[nameId="butt_main_load_obj"]').mousedown(function () { $('[nameId="window_main_load_obj"]').css({"display":"block"}); });

$('[nameId="button_close_main_load_obj"]').mousedown(function () { $('[nameId="window_main_load_obj"]').css({"display":"none"}); });

$('[nameId="butt_load_obj_2"]').mousedown(function () { loadUrlFile(); });
// <--- загрузка obj

});







