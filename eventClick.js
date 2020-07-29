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



//$('[nameId="texture_1"]').mousedown(function (e) { activeTexture({id: 1}); });
$('[nameId="texture_2"]').mousedown(function (e) { activeFloorTexture({id: 1}); });
$('[nameId="jpg_exr"]').mousedown(function (e) { setLightmapJpgExr(); });


$('[nameId="switchTexture"]').mousedown(function (e) { activeTextureMap(); });
$('[nameId="switchLightMap"]').mousedown(function (e) { setLightmapJpgExr({active: true}); });

$('[nameId="NoToneMapping"]').mousedown(function (e) { setToneMapping({toneMapping: 'NoToneMapping'}); });
$('[nameId="LinearToneMapping"]').mousedown(function (e) { setToneMapping({toneMapping: 'LinearToneMapping'}); });
$('[nameId="ReinhardToneMapping"]').mousedown(function (e) { setToneMapping({toneMapping: 'ReinhardToneMapping'}); });
$('[nameId="CineonToneMapping"]').mousedown(function (e) { setToneMapping({toneMapping: 'CineonToneMapping'}); });
$('[nameId="ACESFilmicToneMapping"]').mousedown(function (e) { setToneMapping({toneMapping: 'ACESFilmicToneMapping'}); });
$('[nameId="CustomToneMapping"]').mousedown(function (e) { setToneMapping({toneMapping: 'CustomToneMapping'}); });

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



$('[nameId="input_gammaFactor"]').on("input", function() { inputGammaFactor({value: $(this).val()}); });
$('[nameId="input_toneMapping"]').on("input", function() { inputTransparencySubstrate({value: $(this).val()}); });
});







