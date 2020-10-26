<?php $vrs = '='.time() ?>

<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title><?=$title?></title>
	<meta name="description" content="<?=$description?>" />
	<link rel="stylesheet" href="<?=$path?>css/style.css?<?=$vrs?>">
</head>

<body>
	<script>
		var vr = "<?=$vrs ?>";
		console.log('v'+ vr);		
	</script>
	
			
	
    <script src="<?=$path?>js/three.min.js?<?=$vrs?>"></script>
	<script src="<?=$path?>js/stats.min.js?<?=$vrs?>"></script>
    <script src="<?=$path?>js/jquery.js"></script>        
	

	<script src="<?=$path?>js/loader/EXRLoader.js?<?=$vrs?>"></script>
	<script src="<?=$path?>js/loader/inflate.min.js?<?=$vrs?>"></script>
	<script src="<?=$path?>js/dp/Reflector.js?<?=$vrs?>"></script>
	
	
	<div id="canvasFrame" style="position: fixed; width: 100%; height: 100%; top: 0; right: 0; overflow: hidden;">
	
	
<div class="pp-rotation__progress-container" style="opacity: 1;">
	<div class="pp-rotation__progress sc-gZMcBi hhhBDj">
		<div class="pp-rotation__progress__bg" style="background-color: #f4f7f7;"></div>
		<div class="pp-rotation__progress__bar" style="width: 3.0303%; background-color: #81aee3;"></div>
	</div>
</div>	

		<div nameid="loader" style="width: 100%; height: 100%; z-index: 2; display: none; /*! display: none; */">		
			<div style="position: absolute; top: 1%; bottom: 1%; left:1%; right: 1%;">			
				<img nameid="preview" src="img/WebGL_Preloader.jpg" style="display: block; position: relative; top: 50%; width: 100%; transform: translateY(-50%);">			
				<div style="position: absolute; top: 50%; left: 50%; -webkit-transform: translate(-50%, -50%); transform: translate(-50%, -50%); width: auto; padding: 20px; opacity: 0.6; border:solid 1px #b3b3b3; border-radius: 9px; background: #fff;">				
					<div nameid="progress_load" style="font:32px Arial, Helvetica, sans-serif; text-align: center; color: #222;">загрузка</div>			
				</div>		
			</div>	
		</div>	
	
	
		<div class="frame block_select_text" style="touch-action: none;">
				
			<div class="flex_1 height100">
				
				<div style="flex-grow:1; position: relative;">
				
					<div class="flex_1 top_panel_2">	
						
						<div class="toolbar" data-action ='top_panel_1'>		

							<div class="button1-wrap-1" nameId='butt_cam_walk' style="display: none;">
								<div class="button1 button_gradient_1" style="width: 39px; padding: 10px;"> 
									<img src="img/walk_2.png">
								</div>	
							</div>			
							
							<?if(1==2){?>
							<div class="button1-wrap-1" nameId='zoom_camera_butt_m'>
								<div class="button1 button_gradient_1" style="width: 19px;"> 
									-
								</div>	
							</div>
							<div class="button1-wrap-1" nameId='zoom_camera_butt_p'>
								<div class="button1 button_gradient_1" style="width: 19px;"> 
									+
								</div>	
							</div>
							<?}?>
							
							<div class="button1-wrap-1" nameId='butt_camera_2D' style="display: none;">
								<div class="button1 button_gradient_1" style="width: 39px; padding: 10px;"> 
									2D
								</div>	
							</div>		
							<div class="button1-wrap-1" nameId='butt_camera_3D' style="display: none;">
								<div class="button1 button_gradient_1" style="width: 39px; padding: 10px;"> 
									3D
								</div>	
							</div>							
							
						</div> 
						
						<div class="tp_right_1">
						
			
						</div>
						
					</div>
					
				</div>
				
				<div style="display: none; position: absolute; left: 50px; bottom: 80px;"  data-action ='top_panel_1'>

					<div nameId='div_loadJson_1' style="width: 160px; border:solid 1px #b3b3b3; background: #fff; text-align:center; font-family: arial,sans-serif; font-size: 15px; color: #666;">
						загрузки json:						
					</div>

					<div nameId='div_loadImg_1' style="width: 160px; border:solid 1px #b3b3b3; background: #fff; text-align:center; font-family: arial,sans-serif; font-size: 15px; color: #666;">
						загрузки Img:						
					</div>
					
					<div nameId='div_loadExr_1' style="width: 160px; border:solid 1px #b3b3b3; background: #fff; text-align:center; font-family: arial,sans-serif; font-size: 15px; color: #666;">
						загрузки Exr:						
					</div>					
					
					<div nameId='div_triangles_1' style="width: 160px; border:solid 1px #b3b3b3; background: #fff; text-align:center; font-family: arial,sans-serif; font-size: 15px; color: #666;">
						triangles:						
					</div>

					<div nameId='div_countMesh_1' style="width: 160px; border:solid 1px #b3b3b3; background: #fff; text-align:center; font-family: arial,sans-serif; font-size: 15px; color: #666;">
						mesh:						
					</div>
					
					<div nameId='div_countTexture_1' style="width: 160px; border:solid 1px #b3b3b3; background: #fff; text-align:center; font-family: arial,sans-serif; font-size: 15px; color: #666;">
						textures:						
					</div>

					<div nameId='div_countMaterial_1' style="width: 160px; border:solid 1px #b3b3b3; background: #fff; text-align:center; font-family: arial,sans-serif; font-size: 15px; color: #666;">
						material:						
					</div>						
					


					
					
					<div class="button1-wrap-1" nameId='NoToneMapping' style="margin-top: 35px;">
						<div class="button1 button_gradient_1" style="width: 130px;"> 
							выкл ToneMapping
						</div>	
					</div>

					<div class="button1-wrap-1" nameId='ACESFilmicToneMapping' style="margin-top: 5px;">
						<div class="button1 button_gradient_1" style="width: 130px;"> 
							ACESFilmicToneMapping
						</div>	
					</div>					
					<div class="button1-wrap-1" nameId='CustomToneMapping' style="margin-top: 5px;">
						<div class="button1 button_gradient_1" style="width: 130px;"> 
							формула ToneMapping
						</div>	
					</div>				
					
					<div style="border:solid 1px #b3b3b3; margin-top: 35px; font:12px Arial, Helvetica, sans-serif; color: #737373;">						
						<div nameId="value_toneMapping" style="text-align:center;">
							toneMapping 1
						</div>
						<input type="range" nameId="input_toneMapping" min="0" max="4" value="1" step="0.1">
					</div>					
				</div>					
				
			</div>
		
		</div>		
	</div>


	
	<script src="<?=$path?>mouseClick.js?<?=$vrs?>"></script>
	<script src="<?=$path?>changeCamera.js?<?=$vrs?>"></script>
	<script src="<?=$path?>moveCamera.js?<?=$vrs?>"></script>
	<script src="<?=$path?>eventClick.js?<?=$vrs?>"></script>
	<script src="<?=$path?>hideWall.js?<?=$vrs?>"></script>
    <script src="<?=$path?>script.js?<?=$vrs?>"></script>    		 
		
		


</body>


</html>