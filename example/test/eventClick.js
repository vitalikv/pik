$(document).ready(function()
{


$('[data-action="top_panel_1"]').on('mousedown wheel DOMMouseScroll mousewheel mousemove touchstart touchend touchmove', function (e) { e.stopPropagation(); });
$('[ui_1=""]').on('mousedown wheel DOMMouseScroll mousewheel mousemove touchstart touchend touchmove', function (e) { e.stopPropagation(); });
		



$('[nameId="butt_camera_2D"]').mousedown(function(e) 
{ 
	changeCamera(cameraTop); 
	$(this).hide(); 
	$('[nameId="butt_camera_3D"]').show(); 
	$('[nameId="butt_cam_walk"]').hide();
	e.stopPropagation();
});

$('[nameId="butt_camera_3D"]').mousedown(function(e) 
{ 
	changeCamera(camera3D); 
	$(this).hide(); 
	$('[nameId="butt_camera_2D"]').show(); 
	$('[nameId="butt_cam_walk"]').show();
	e.stopPropagation();
});

$('[nameId="butt_cam_walk"]').mousedown(function() { switchCamera3D(); });


				
$('[nameId="zoom_camera_butt_m"]').bind('touchstart click', function(){ zoomLoop = 'zoomOut'; });
$('[nameId="zoom_camera_butt_p"]').bind('touchstart click', function(){ zoomLoop = 'zoomIn'; });
$(window).bind('touchend click', function(){ zoomLoop = ''; });


$('[nameId="zoom_camera_butt_m"]').mousedown(function () { zoomLoop = 'zoomOut'; });
$('[nameId="zoom_camera_butt_p"]').mousedown(function () { zoomLoop = 'zoomIn'; });
$(window).mouseup(function () { zoomLoop = ''; });




$('[nameId="NoToneMapping"]').mousedown(function (e) { setToneMapping({toneMapping: 'NoToneMapping'}); });
$('[nameId="ACESFilmicToneMapping"]').mousedown(function (e) { setToneMapping({toneMapping: 'ACESFilmicToneMapping'}); });
$('[nameId="CustomToneMapping"]').mousedown(function (e) { setToneMapping({toneMapping: 'CustomToneMapping'}); });


$('[nameId="input_toneMapping"]').on("input", function() { inputTransparencySubstrate({value: $(this).val()}); });
});







