








function setElemButtonRightPanel()
{
    let colorPick = document.querySelector('[nameId="colorPick"]');	
	colorPick.value = '#ffffff';
	colorPick.addEventListener('change', function() { changeColorTexture({ value: this.value }); });

    let colorEmissive = document.querySelector('[nameId="colorEmissive"]');	
	colorEmissive.value = '#000000';
	colorEmissive.addEventListener('change', function() { changeColorEmissive({ value: this.value }); });	
	
	let elem = document.querySelector('[nameId="rightBlock"]');
	elem.onmousedown = function(e) { e.stopPropagation(); }
	elem.ontouchstart = function(e) { e.stopPropagation(); }
	elem.ontouchmove = function(e)	{ e.stopPropagation(); }
	
	//let elem = document.querySelector('[nameId="switchTransparent"]');
	//elem.onmousedown = function(e){ switchTransparent(); }
	
	let input1 = document.querySelector('[nameId="input_opacity"]');
	input1.onmousemove = function(e) { inputOpacity({value: input1.value}); };	
	input1.ontouchmove = function(e){ inputOpacity({value: input1.value});  }	
	
	let input2 = document.querySelector('[nameId="input_metalness"]');
	input2.onmousemove = function(e) { inputMetalness({value: input2.value}); };	
	input2.ontouchmove = function(e){ inputMetalness({value: input2.value});  }
	
	let input3 = document.querySelector('[nameId="input_roughness"]');
	input3.onmousemove = function(e) { inputRoughness({value: input3.value}); }	
	input3.ontouchmove = function(e){ inputRoughness({value: input3.value});  }

	let input4 = document.querySelector('[nameId="input_transmission"]');
	input4.onmousemove = function(e) { inputTransmission({value: input4.value}); }	
	input4.ontouchmove = function(e){ inputTransmission({value: input4.value});  }

	let input5 = document.querySelector('[nameId="input_envMapIntensity"]');
	input5.onmousemove = function(e) { inputEnvMapIntensity({value: input5.value}); }	
	input5.ontouchmove = function(e){ inputEnvMapIntensity({value: input5.value});  }

	let input6 = document.querySelector('[nameId="input_clearcoat"]');
	input6.onmousemove = function(e) { inputClearcoat({value: input6.value}); }	
	input6.ontouchmove = function(e){ inputClearcoat({value: input6.value});  }

	let input7 = document.querySelector('[nameId="input_clearcoatRoughness"]');
	input7.onmousemove = function(e) { inputClearcoatRoughness({value: input7.value}); }	
	input7.ontouchmove = function(e){ inputClearcoatRoughness({value: input7.value});  }

	let input8 = document.querySelector('[nameId="input_reflectivity"]');
	input8.onmousemove = function(e) { inputReflectivity({value: input8.value}); }	
	input8.ontouchmove = function(e){ inputReflectivity({value: input8.value});  }

	let input9 = document.querySelector('[nameId="input_refraction"]');
	input9.onmousemove = function(e) { inputRefraction({value: input9.value}); }	
	input9.ontouchmove = function(e){ inputRefraction({value: input9.value});  }	
	
	let elem1 = document.querySelector('[nameId="setCubeCamera"]');
	elem1.onmousedown = function(e) { createCubeCam(); }

	let elem4 = document.querySelector('[nameId="delCubeCamera"]');
	elem4.onmousedown = function(e) { delCubeCam(); }		

	let elem2 = document.querySelector('[nameId="delNormalMap"]');
	elem2.onmousedown = function(e) { deleteNormalMap(); }	

	let elem3 = document.querySelector('[nameId="delMap"]');
	elem3.onmousedown = function(e) { deleteMap(); }

	let elem5 = document.querySelector('[nameId="delBumpMap"]');
	elem5.onmousedown = function(e) { delBumpMap(); }

	let elem6 = document.querySelector('[nameId="delLightMap"]');
	elem6.onmousedown = function(e) { delLightMap(); }	

	let elem7 = document.querySelector('[nameId="saveMat"]');
	elem7.onmousedown = function(e) { saveFile(); }		
}


function inputEnvMapIntensity(cdm)
{
	let obj = (cdm.obj) ? cdm.obj : clickO.rayhit.object;
	if(!obj) return;
	
	let value = cdm.value;						
	
	let input = document.querySelector('[nameId="input_envMapIntensity"]');
	input.value = value;
	
	let elem = document.querySelector('[nameId="txt_envMapIntensity"]');
	elem.innerText = 'envMapIntensity '+ value;
	
	obj.material.envMapIntensity = value;
	obj.material.needsUpdate = true;
	
	renderCamera();	
}


function inputClearcoat(cdm)
{
	let obj = (cdm.obj) ? cdm.obj : clickO.rayhit.object;
	if(!obj) return;
	
	let value = cdm.value;						
	
	let input = document.querySelector('[nameId="input_clearcoat"]');
	input.value = value;
	
	let elem = document.querySelector('[nameId="txt_clearcoat"]');
	elem.innerText = 'clearcoat '+ value;
	
	obj.material.clearcoat = value;
	obj.material.needsUpdate = true;
	
	renderCamera();	
}


function inputClearcoatRoughness(cdm)
{
	let obj = (cdm.obj) ? cdm.obj : clickO.rayhit.object;
	if(!obj) return;
	
	let value = cdm.value;

	let input = document.querySelector('[nameId="input_clearcoatRoughness"]');
	input.value = value;	
	
	let elem = document.querySelector('[nameId="txt_clearcoatRoughness"]');
	elem.innerText = 'clearcoatRoughness '+ value;
	
	obj.material.clearcoatRoughness = value;
	obj.material.needsUpdate = true;
	
	renderCamera();	
}



function inputReflectivity(cdm)
{
	let obj = (cdm.obj) ? cdm.obj : clickO.rayhit.object;
	if(!obj) return;
	
	let value = cdm.value;						

	let input = document.querySelector('[nameId="input_reflectivity"]');
	input.value = value;
	
	let elem = document.querySelector('[nameId="txt_reflectivity"]');
	elem.innerText = 'reflectivity '+ value;
	
	obj.material.reflectivity = value;
	obj.material.needsUpdate = true;
	
	renderCamera();	
}


function inputRefraction(cdm)
{
	let obj = (cdm.obj) ? cdm.obj : clickO.rayhit.object;
	if(!obj) return;
	
	let value = cdm.value;						

	let input = document.querySelector('[nameId="input_refraction"]');
	input.value = value;
	
	let elem = document.querySelector('[nameId="txt_refraction"]');
	elem.innerText = 'refraction '+ value;
	
	obj.material.refractionRatio = value;
	obj.material.needsUpdate = true;
	
	renderCamera();	
}



function inputOpacity(cdm)
{
	let obj = (cdm.obj) ? cdm.obj : clickO.rayhit.object;
	if(!obj) return;
	
	let value = cdm.value;	

	let input = document.querySelector('[nameId="input_opacity"]');
	input.value = value;	
	
	let elem = document.querySelector('[nameId="txt_opacity"]');
	elem.innerText = 'прозрачность '+ value;
	
	obj.material.opacity = value;
	obj.material.needsUpdate = true;
	
	renderCamera();	
}


function inputTransmission(cdm)
{
	let obj = (cdm.obj) ? cdm.obj : clickO.rayhit.object;
	if(!obj) return;
	
	let value = cdm.value;	

	let input = document.querySelector('[nameId="input_transmission"]');
	input.value = value;	
	
	let elem = document.querySelector('[nameId="txt_transmission"]');
	elem.innerText = 'transmission '+ value;
	
	obj.material.transmission = value;
	obj.material.needsUpdate = true;
	
	renderCamera();	
}


function inputMetalness(cdm)
{
	let obj = (cdm.obj) ? cdm.obj : clickO.rayhit.object;
	if(!obj) return;

	let value = cdm.value;						

	let input = document.querySelector('[nameId="input_metalness"]');
	input.value = value;
	
	let elem = document.querySelector('[nameId="txt_metalness"]');
	elem.innerText = 'metalness '+ value;
	
	obj.material.metalness = value;
	obj.material.needsUpdate = true;
	
	renderCamera();	
}


function inputRoughness(cdm)
{
	let obj = (cdm.obj) ? cdm.obj : clickO.rayhit.object;
	if(!obj) return;
	
	let value = cdm.value;						
	
	let input = document.querySelector('[nameId="input_roughness"]');
	input.value = value;
	
	let elem = document.querySelector('[nameId="txt_roughness"]');
	elem.innerText = 'roughness '+ value;
	
	obj.material.roughness = value;
	obj.material.needsUpdate = true;
	
	renderCamera();	
}


function deleteMap()
{
	var obj = clickO.rayhit.object;	
	if(!obj) return;

	var material = obj.material;
	
	var elem1 = document.querySelector('[nameId="delMap"]');
	var elem2 = document.querySelector('[nameId="loadMap"]');
	
	elem1.style.display = "none";
	elem2.style.display = "block";
	
	if(material.map)
	{
		material.map = null; 
		material.needsUpdate = true;
		
		renderCamera();
	}	
}

// устанавливаем текстуру, которую загрузили с своего компьютера
function setImgCompSubstrate(cdm)
{
	//if(!cdm.img) return;
	
	var image = new Image();
	image.src = cdm.image;
	
	//var obj = cdm.obj;
	var obj = clickO.rayhit.object;	
	if(!obj) return;

	image.onload = function() 
	{
		var material = obj.material;
		var texture = new THREE.Texture();
		texture.image = image;
					
		texture.wrapS = THREE.MirroredRepeat;
		texture.wrapT = THREE.MirroredRepeat;
		texture.anisotropy = renderer.capabilities.getMaxAnisotropy();		

		texture.needsUpdate = true;
		material.map = texture; 
		material.needsUpdate = true; 

		var elem1 = document.querySelector('[nameId="delMap"]');
		var elem2 = document.querySelector('[nameId="loadMap"]');
		
		elem1.style.display = "block";
		elem2.style.display = "none";		
		
		renderCamera();
	};
		
}


function deleteNormalMap()
{
	var obj = clickO.rayhit.object;	
	if(!obj) return;

	var material = obj.material;
	
	var elem1 = document.querySelector('[nameId="delNormalMap"]');
	var elem2 = document.querySelector('[nameId="loadNormalMap"]');
	
	elem1.style.display = "none";
	elem2.style.display = "block";
	
	if(material.normalMap)
	{
		material.normalMap = null; 
		material.needsUpdate = true;
		
		renderCamera();
	}	
}

function setNormalMap(cdm)
{
	//if(!cdm.img) return;
	
	var image = new Image();
	image.src = cdm.image;
	
	//var obj = cdm.obj;
	var obj = clickO.rayhit.object;	
	if(!obj) return;

	image.onload = function() 
	{
		var material = obj.material;
		var texture = new THREE.Texture();
		texture.image = image;
					
		texture.wrapS = THREE.MirroredRepeat;
		texture.wrapT = THREE.MirroredRepeat;
		texture.anisotropy = renderer.capabilities.getMaxAnisotropy();		

		texture.needsUpdate = true;
		material.normalMap = texture; 
		material.needsUpdate = true; 

		var elem1 = document.querySelector('[nameId="delNormalMap"]');
		var elem2 = document.querySelector('[nameId="loadNormalMap"]');	

		elem1.style.display = "block";
		elem2.style.display = "none";		
		
		renderCamera();
	};
		
}



function delBumpMap()
{
	var obj = clickO.rayhit.object;	
	if(!obj) return;

	var material = obj.material;
	
	var elem1 = document.querySelector('[nameId="delBumpMap"]');
	var elem2 = document.querySelector('[nameId="loadBumpMap"]');
	
	elem1.style.display = "none";
	elem2.style.display = "block";
	
	if(material.bumpMap)
	{
		material.bumpMap = null; 
		material.needsUpdate = true;
		
		renderCamera();
	}	
}


function setBumpMap(cdm)
{
	//if(!cdm.img) return;
	
	var image = new Image();
	image.src = cdm.image;
	
	//var obj = cdm.obj;
	var obj = clickO.rayhit.object;	
	if(!obj) return;

	image.onload = function() 
	{
		var material = obj.material;
		var texture = new THREE.Texture();
		texture.image = image;
					
		texture.wrapS = THREE.MirroredRepeat;
		texture.wrapT = THREE.MirroredRepeat;
		texture.anisotropy = renderer.capabilities.getMaxAnisotropy();		

		texture.needsUpdate = true;
		material.bumpMap = texture; 
		material.needsUpdate = true; 

		var elem1 = document.querySelector('[nameId="delBumpMap"]');
		var elem2 = document.querySelector('[nameId="loadBumpMap"]');	

		elem1.style.display = "block";
		elem2.style.display = "none";		
		
		renderCamera();
	};
		
}




function delLightMap()
{
	var obj = clickO.rayhit.object;	
	if(!obj) return;

	var material = obj.material;
	
	var elem1 = document.querySelector('[nameId="delLightMap"]');
	var elem2 = document.querySelector('[nameId="loadLightMap"]');
	
	elem1.style.display = "none";
	elem2.style.display = "block";
	
	if(material.lightMap)
	{
		material.lightMap = null;  
		material.needsUpdate = true;
		
		renderCamera();
	}	
}


function setLightMap(cdm)
{
	//if(!cdm.img) return;
	
	var image = new Image();
	image.src = cdm.image;
	
	//var obj = cdm.obj;
	var obj = clickO.rayhit.object;	
	if(!obj) return;
 
	image.onload = function() 
	{
		var material = obj.material;
		var texture = new THREE.Texture();
		texture.image = image;
					
		texture.wrapS = THREE.MirroredRepeat;
		texture.wrapT = THREE.MirroredRepeat;
		texture.anisotropy = renderer.capabilities.getMaxAnisotropy();		

		texture.needsUpdate = true;
		material.lightMap = texture; 
		material.needsUpdate = true; 

		var elem1 = document.querySelector('[nameId="delLightMap"]');
		var elem2 = document.querySelector('[nameId="loadLightMap"]');	

		elem1.style.display = "block";
		elem2.style.display = "none";		
		
		renderCamera();
	};
		
}





function createCubeCam(cdm)
{
	let obj = (cdm.obj) ? cdm.obj : clickO.rayhit.object;
	if(!obj) return;
		
	let cubeRenderTarget = new THREE.WebGLCubeRenderTarget( 64, { format: THREE.RGBFormat, generateMipmaps: true, minFilter: THREE.LinearMipmapLinearFilter } );
	
	let cubeCam = new THREE.CubeCamera(0.1, 100, cubeRenderTarget);					
	scene.add(cubeCam); 

	obj.userData.cubeCam = cubeCam;		
	
	obj.material.envMap = cubeCam.renderTarget.texture;

	updateCubeCam({obj: obj});
	
	let elem1 = document.querySelector('[nameId="setCubeCamera"]');
	let elem2 = document.querySelector('[nameId="delCubeCamera"]');	

	elem1.style.display = "none";
	elem2.style.display = "block";
}


function updateCubeCam(cdm)
{
	let obj = cdm.obj;
	if(!obj) return;
	if(!obj.userData.cubeCam) return;
	
	let cubeCam = obj.userData.cubeCam;					
				
	obj.updateMatrixWorld();
	obj.geometry.computeBoundingSphere();
	let pos = obj.localToWorld( obj.geometry.boundingSphere.center.clone() );	
	cubeCam.position.copy(pos);
	
	obj.visible = false;
	cubeCam.update( renderer, scene );			
	obj.visible = true;
	
	obj.material.needsUpdate = true;
	
	disposeNode(obj);
	
	renderCamera();
}



function delCubeCam(cdm)
{
	let obj = (cdm.obj) ? cdm.obj : clickO.rayhit.object;

	let elem1 = document.querySelector('[nameId="setCubeCamera"]');
	let elem2 = document.querySelector('[nameId="delCubeCamera"]');	
	
	elem1.style.display = "block";
	elem2.style.display = "none";
	
	if(!obj.material.envMap) return false;
	
	obj.userData.cubeCam = null;
	
	obj.material.envMap = null;

	obj.material.needsUpdate = true;
	
	renderCamera();
}



function changeColorTexture(cdm)
{
	let obj = (cdm.obj) ? cdm.obj : clickO.rayhit.object;

	if(!obj) return;
	
    let colorPick = document.querySelector('[nameId="colorPick"]');	
	colorPick.value = cdm.value;
	
	obj.material.color = new THREE.Color( cdm.value );

	obj.material.needsUpdate = true;
	
	renderCamera();
}


function changeColorEmissive(cdm)
{
	let obj = (cdm.obj) ? cdm.obj : clickO.rayhit.object;

	if(!obj) return;
	
    let colorEmissive = document.querySelector('[nameId="colorEmissive"]');	
	colorEmissive.value = cdm.value;
	
	obj.material.emissive = new THREE.Color( cdm.value );

	obj.material.needsUpdate = true;
	
	renderCamera();

}




