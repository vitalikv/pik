


function loadUrlFile()
{	
	var url = $('[nameId="input_link_obj_1"]').val(); 
	var url = url.trim();	
	
	if(1==1)	// gltf/glb
	{
		var loader = new THREE.GLTFLoader();
		loader.load( url, function ( obj ) 						
		{ 
			//var obj = obj.scene.children[0];
			setParamObj({obj: obj.scene});
		});			
	}
	else	// fbx
	{
		var loader = new THREE.FBXLoader();
		loader.load( url, function ( obj ) 						
		{ 			
			setParamObj({obj: obj});
		});			
	}
}



function loadInputFile(cdm)
{

	if(cdm.type == 'glb')	// gltf/glb
	{
		var loader = new THREE.GLTFLoader();
		loader.parse( cdm.data, '', function ( obj ) 						
		{ 
			//var obj = obj.scene.children[0];
			setParamObj({obj: obj.scene});
		});
		
	}
	else if(cdm.type == 'fbx')	// fbx
	{
		var loader = new THREE.FBXLoader();
		var obj = loader.parse( cdm.data );		
		setParamObj({obj: obj});			
	}
}





function setParamObj(cdm)
{
	$('[nameId="window_main_load_obj"]').css({"display":"none"});
	//resetScene();
	
	var obj = cdm.obj;
	
	//var obj = obj.children[0];		
	obj.position.y = 0;	
	
	new THREE.RGBELoader().setDataType( THREE.UnsignedByteType ).load( 'img/royal_esplanade_1k.hdr', function ( texture ) 
	{

			var envMap = pmremGenerator.fromEquirectangular( texture ).texture;

			scene.background = envMap;
			scene.environment = envMap;

			texture.dispose();
			pmremGenerator.dispose();

			// model

	// накладываем тени
	obj.traverse(function(child) 
	{
		if(child.isMesh) 
		{ 
	
			if(child.material)
			{
				var material = new THREE.MeshPhongMaterial({ color: child.material.color });
				
				material.transparent = child.material.transparent;
				material.opacity = child.material.opacity;
				material.lightMap = child.material.lightMap_1;
				material.map = child.material.map;
				
				//child.material = material;
				
				//child.material.envMap = texture;
				
				//console.log(child.material);
			}

			//child.castShadow = true;	
			//child.receiveShadow = true;							
		}
	});	

		} ); 	
	
		

	infProject.scene.obj[infProject.scene.obj.length] = obj;
	
	scene.add( obj );
	
	fitCameraToObject({obj: obj}); 
	
	renderCamera();	
}








