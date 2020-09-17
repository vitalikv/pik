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
	


	
	
	
	<div id="canvasFrame" style="position: fixed; width: 100%; height: 100%; top: 0; right: 0; overflow: hidden;">
	
<div nameid="loader" style="width: 100%; height: 100%; z-index: 2; /*! display: none; */">		
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

	<div nameId="rightBlock" style="display: none; position: absolute; right: 50px; bottom: 80px; border:solid 1px #b3b3b3; background: #f5f5f5;">
		<div nameId="textSphere" style="margin: 5px; font:18px Arial, Helvetica, sans-serif; color: #737373; text-align:center;">
			объект
		</div>


	
<select nameId="list_material" style="width: 100%; margin: 15px 0">
	<option value="matte">matt</option>
	<option value="satin">semimatt</option>
	<option value="semigloss">semiglossy</option>
	<option value="glossy">glossy</option>
	<option value="reflective">reflective</option>
	<option value="brushed">brushed</option>
	<option value="polished">polished</option>
	<option value="chrome">chrome</option>
	<option value="mirror">mirror</option>
	<option value="glass">glass</option>
	<option value="steklo_blur">frostedglass</option>
	<option value="mattet">tulle</option>
</select>
		
		
		<input name="file" type="file" accept="image/x-png,image/jpeg" id="load_substrate_1" class="input_load_substrate">
		<label nameId="loadMap" for="load_substrate_1" class="button1 button_gradient_1" style="display: none;">		
			загрузить текстуру
		</label>
		
		<label nameId="delMap" class="button1 button_gradient_1" style="display: block;">		
			удалить текстуру
		</label>
		
		<div class="flex_1">
			<div style="margin: auto; font:12px Arial, Helvetica, sans-serif; color: #737373; text-align:center;">
				color
			</div>
			<div>
				<input nameId="colorPick" type="color" style="margin: auto;">
			</div>
		</div>		
		
		<div class="flex_1">
			<div style="margin: auto; font:12px Arial, Helvetica, sans-serif; color: #737373; text-align:center;">
				emissive
			</div>
			<div>
				<input nameId="colorEmissive" type="color" style="margin: auto;">
			</div>
		</div>
		
		<input name="file" type="file" accept="image/x-png,image/jpeg" id="load_lightMap_1" class="input_load_substrate">
		<label nameId="loadLightMap" for="load_lightMap_1" class="button1 button_gradient_1" style="display: none;">		
			загрузить lightMap
		</label>
		
		<label nameId="delLightMap" class="button1 button_gradient_1" style="display: block;">		
			удалить lightMap
		</label>		

		

		<div class="button1-wrap-1" nameId="setCubeCamera" style="display: none; margin: 5px 0 15px 0;">
			<div class="button1 button_gradient_1" nameId="txt_setCubeCamera" style="width: 100%; padding: 6px 0 6px 0;">
				добавить CubeCamera 
			</div>
		</div>

		<div class="button1-wrap-1" nameId="delCubeCamera" style="display: block; margin: 5px 0 15px 0;">
			<div class="button1 button_gradient_1" style="width: 100%; padding: 6px 0 6px 0;">
				удалить CubeCamera
			</div>
		</div>			
		
		
		<div style="margin-top: 15px; font:12px Arial, Helvetica, sans-serif; color: #737373;">
			<div nameId="txt_envMapIntensity" style="text-align:center;">
				envMapIntensity 1
			</div>
			<input type="range" nameId="input_envMapIntensity" min="0" max="1" value="1" step="0.01">
		</div>
		
		<div style="margin-top: 0px; font:12px Arial, Helvetica, sans-serif; color: #737373;">
			<div nameId="txt_metalness" style="text-align:center;">
				metalness 1
			</div>
			<input type="range" nameId="input_metalness" min="0" max="1" value="1" step="0.01">
		</div>
		
		<div style="margin-top: 0px; font:12px Arial, Helvetica, sans-serif; color: #737373;">
			<div nameId="txt_roughness" style="text-align:center;">
				roughness 0
			</div>
			<input type="range" nameId="input_roughness" min="0" max="1" value="0" step="0.01">
		</div>		

		<div style="margin-top: 0px; font:12px Arial, Helvetica, sans-serif; color: #737373;">
			<div nameId="txt_reflectivity" style="text-align:center;">
				reflectivity 0.5
			</div>
			<input type="range" nameId="input_reflectivity" min="0" max="1" value="0.5" step="0.01">
		</div>	
		
		<input name="file" type="file" accept="image/x-png,image/jpeg" id="load_normal_1" class="input_load_substrate">
		<label nameId="loadNormalMap" for="load_normal_1" class="button1 button_gradient_1" style="display: none;">		
			загрузить normal
		</label>
		
		<label nameId="delNormalMap" class="button1 button_gradient_1" style="display: block;">		
			удалить normal
		</label>

		<input name="file" type="file" accept="image/x-png,image/jpeg" id="load_bump_1" class="input_load_substrate">
		<label nameId="loadBumpMap" for="load_bump_1" class="button1 button_gradient_1" style="display: none;">		
			загрузить bumpMap
		</label>
		
		<label nameId="delBumpMap" class="button1 button_gradient_1" style="display: block;">		
			удалить bumpMap
		</label>		

		<div class="prew_substrate" style="margin: auto;">
			<img src="#" id="upload-img" alt=""/>
		</div>		
		

		
		<div style="margin-top: 0px; font:12px Arial, Helvetica, sans-serif; color: #737373;">
			<div nameId="txt_opacity" style="text-align:center;">
				прозрачность 1
			</div>
			<input type="range" nameId="input_opacity" min="0" max="1" value="1" step="0.01">
		</div>
		
		<div style="margin-top: 0px; font:12px Arial, Helvetica, sans-serif; color: #737373;">
			<div nameId="txt_transmission" style="text-align:center;">
				transmission 0
			</div>
			<input type="range" nameId="input_transmission" min="0" max="1" value="0" step="0.01">
		</div>		

		<div style="margin-top: 0px; font:12px Arial, Helvetica, sans-serif; color: #737373;">
			<div nameId="txt_clearcoat" style="text-align:center;">
				clearcoat 0
			</div>
			<input type="range" nameId="input_clearcoat" min="0" max="1" value="0" step="0.01">
		</div>
		
		<div style="margin-top: 0px; font:12px Arial, Helvetica, sans-serif; color: #737373;">
			<div nameId="txt_clearcoatRoughness" style="text-align:center;">
				clearcoatRoughness 0
			</div>
			<input type="range" nameId="input_clearcoatRoughness" min="0" max="1" value="0" step="0.01">
		</div>
	
		
		<div style="margin-top: 0px; font:12px Arial, Helvetica, sans-serif; color: #737373;">
			<div nameId="txt_refraction" style="text-align:center;">
				refraction 0.5
			</div>
			<input type="range" nameId="input_refraction" min="0" max="1" value="0.5" step="0.01">
		</div>
		
		<div class="button1-wrap-1" nameId="saveMat" style="margin: 25px 0 15px 0;">
			<div class="button1 button_gradient_1" nameId="txt_saveMat" style="width: 100%; padding: 6px 0 6px 0;">
				сохранить 
			</div>
		</div>		
		
	</div>				
				
			</div>
		
		</div>		
	</div>

	<script>
		// загрузка img  с компьютера
		$('#load_substrate_1').change(readURL_1);
		function readURL_1(e) 
		{
			if (this.files[0]) 
			{		
				if (this.files[0].type == "image/png" || this.files[0].type == "image/jpeg")
				{
					var reader = new FileReader();
					reader.onload = function (e) 
					{												
						setImgCompSubstrate({image: e.target.result});					
					}				

					reader.readAsDataURL(this.files[0]);  					
				}				
			}
		}	 
		// 

		// загрузка img  с компьютера
		$('#load_normal_1').change(readURL_2);
		function readURL_2(e) 
		{
			if (this.files[0]) 
			{		
				if (this.files[0].type == "image/png" || this.files[0].type == "image/jpeg")
				{
					var reader = new FileReader();
					reader.onload = function (e) 
					{												
						setNormalMap({image: e.target.result});					
					}				

					reader.readAsDataURL(this.files[0]);  					
				}				
			}
		}	 
		//

		// загрузка img  с компьютера
		$('#load_bump_1').change(readURL_3);
		function readURL_3(e) 
		{
			if (this.files[0]) 
			{		
				if (this.files[0].type == "image/png" || this.files[0].type == "image/jpeg")
				{
					var reader = new FileReader();
					reader.onload = function (e) 
					{												
						setBumpMap({image: e.target.result});					
					}				

					reader.readAsDataURL(this.files[0]);  					
				}				
			}
		}	 
		//

		// загрузка img  с компьютера
		$('#load_lightMap_1').change(readURL_4);
		function readURL_4(e) 
		{
			if (this.files[0]) 
			{		
				if (this.files[0].type == "image/png" || this.files[0].type == "image/jpeg")
				{
					var reader = new FileReader();
					reader.onload = function (e) 
					{												
						setLightMap({image: e.target.result});					
					}				

					reader.readAsDataURL(this.files[0]);  					
				}				
			}
		}	 
		//     		
	</script>
	
	<script src="<?=$path?>mouseClick.js?<?=$vrs?>"></script>
	<script src="<?=$path?>changeCamera.js?<?=$vrs?>"></script>
	<script src="<?=$path?>moveCamera.js?<?=$vrs?>"></script>
	<script src="<?=$path?>eventClick.js?<?=$vrs?>"></script>
	<script src="<?=$path?>loadFbxGlb.js?<?=$vrs?>"></script>
	<script src="<?=$path?>hideWall.js?<?=$vrs?>"></script>
	<script src="<?=$path?>setButton.js?<?=$vrs?>"></script>
    <script src="<?=$path?>script.js?<?=$vrs?>"></script>    		 
		
		


</body>


</html>