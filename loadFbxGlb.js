


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
console.log(9999999);
	if(1==1)	// gltf/glb
	{
		var loader = new THREE.GLTFLoader();
		loader.parse( cdm.data, '', function ( obj ) 						
		{ 
			//var obj = obj.scene.children[0];
			setParamObj({obj: obj.scene});
		});
		
	}
	else	// fbx
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
	
	// накладываем тени
	obj.traverse(function(child) 
	{
		if(child.isMesh) 
		{ 
			//child.castShadow = true;	
			//child.receiveShadow = true;				
		}
	});			

	scene.add( obj );
	
	renderCamera();	
}








