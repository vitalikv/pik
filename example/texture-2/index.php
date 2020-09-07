<?php $vrs = '=45' ?>

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
    <script src="<?=$path?>js/jquery.js"></script>        
	
	<script src="<?=$path?>js/dp/EffectComposer.js?<?=$vrs?>"></script>
	<script src="<?=$path?>js/dp/CopyShader.js?<?=$vrs?>"></script>
	<script src="<?=$path?>js/dp/RenderPass.js?<?=$vrs?>"></script>
	<script src="<?=$path?>js/dp/ShaderPass.js?<?=$vrs?>"></script>
	<script src="<?=$path?>js/dp/OutlinePass.js?<?=$vrs?>"></script>
	<script src="<?=$path?>js/dp/FXAAShader.js?<?=$vrs?>"></script>
	<script src="<?=$path?>js/dp/SAOPass.js?<?=$vrs?>"></script>
	<script src="<?=$path?>js/dp/SAOShader.js?<?=$vrs?>"></script>
	<script src="<?=$path?>js/dp/DepthLimitedBlurShader.js?<?=$vrs?>"></script>
	<script src="<?=$path?>js/dp/UnpackDepthRGBAShader.js?<?=$vrs?>"></script>
	<script src="<?=$path?>js/dp/GammaCorrectionShader.js?<?=$vrs?>"></script>	

	<script src="<?=$path?>js/loader/inflate.min.js?<?=$vrs?>"></script>
	<script src="<?=$path?>js/loader/FBXLoader.js?<?=$vrs?>"></script>
	<script src="<?=$path?>js/loader/STLExporter.js?<?=$vrs?>"></script>
	<script src="<?=$path?>js/loader/GLTFLoader.js?<?=$vrs?>"></script>	
	<script src="<?=$path?>js/loader/EXRLoader.js?<?=$vrs?>"></script>
	
	
	<div id="canvasFrame" style="position: fixed; width: 100%; height: 100%; top: 0; right: 0; overflow: hidden;">
		<div class="frame block_select_text" style="touch-action: none;">
				
			<div class="flex_1 height100">
				
				<div style="flex-grow:1; position: relative;">
					<? require_once("include/top_1.php"); ?>
					
				</div>
				
				<div style="position: absolute; left: 50px; bottom: 80px;"  data-action ='top_panel_1'>
					
					<!--<div class="button1-wrap-1" nameId='texture_1' style="display: none;">
						<div class="button1 button_gradient_1" style="width: 130px;"> 
							текстура 1
						</div>	
					</div>
					
					<div class="button1-wrap-1" nameId='texture_2' style="margin-top: 20px;">
						<div class="button1 button_gradient_1" style="width: 130px;"> 
							текстура пол
						</div>	
					</div>-->
					
					
					
					<!--<div style="border:solid 1px #b3b3b3; margin-top: 5px; font:12px Arial, Helvetica, sans-serif; color: #737373;">						
						<div nameId="value_gammaFactor" style="text-align:center;">
							gammaFactor 2
						</div>
						<input type="range" nameId="input_gammaFactor" min="0" max="4" value="2" step="0.1">
					</div>-->

					<div class="button1-wrap-1" nameId='switchTexture' style="margin-top: 35px;">
						<div class="button1 button_gradient_1" nameId='textswitchTexture' style="width: 130px;"> 
							текстура (вкл)
						</div>	
					</div>
					
					<div class="button1-wrap-1" nameId='switchLightMap' style="margin-top: 5px;">
						<div class="button1 button_gradient_1" nameId='textSwitchLightMap' style="width: 130px;"> 
							lightMap (вкл)
						</div>	
					</div>
					
					
					<div class="button1-wrap-1" nameId='NoToneMapping' style="margin-top: 35px;">
						<div class="button1 button_gradient_1" style="width: 130px;"> 
							выкл ToneMapping
						</div>	
					</div>
					<div class="button1-wrap-1" nameId='LinearToneMapping' style="margin-top: 5px;">
						<div class="button1 button_gradient_1" style="width: 130px;"> 
							LinearToneMapping
						</div>	
					</div>
					<div class="button1-wrap-1" nameId='ReinhardToneMapping' style="margin-top: 5px;">
						<div class="button1 button_gradient_1" style="width: 130px;"> 
							ReinhardToneMapping
						</div>	
					</div>
					<div class="button1-wrap-1" nameId='CineonToneMapping' style="margin-top: 5px;">
						<div class="button1 button_gradient_1" style="width: 130px;"> 
							CineonToneMapping
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

					
					<div class="button1-wrap-1" nameId='jpg_exr' style="margin-top: 20px;">
						<div class="button1 button_gradient_1" nameId='text_jpg_exr' style="width: 130px;"> 
							jpg/exr (jpg)
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
	<script src="<?=$path?>loadFbxGlb.js?<?=$vrs?>"></script>
	<script src="<?=$path?>hideWall.js?<?=$vrs?>"></script>
    <script src="<?=$path?>script.js?<?=$vrs?>"></script>    		 
		
		


</body>


</html>