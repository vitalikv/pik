


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
	
	// накладываем тени
	obj.traverse(function(child) 
	{
		if(child.userData.tag)
		{			
			if(child.userData.tag == 'wall')
			{
				child.userData.wall = {};
				child.userData.wall.show = true;
				child.userData.wall.arrO = [];
				infProject.scene.array.wall[infProject.scene.array.wall.length] = child;
			}

			if(child.userData.tag == 'door')
			{
				infProject.scene.array.door[infProject.scene.array.door.length] = child;
			}
			
			if(child.userData.tag == 'window')
			{
				infProject.scene.array.window[infProject.scene.array.window.length] = child;
			}			
		}
		
		
		if(child.isMesh) 
		{ 
	
			if(child.material && 1==1)
			{
				var material = new THREE.MeshPhongMaterial({ color: child.material.color });
				
				material.transparent = child.material.transparent;
				//material.transparent = true;
				material.opacity = child.material.opacity;
				material.lightMap = child.material.lightMap_1;
				material.map = child.material.map;
				
				child.material = material;
			}

			child.castShadow = true;	
			child.receiveShadow = true;							
		}
	});			

	infProject.scene.obj[infProject.scene.obj.length] = obj;
	
	
	for ( var i = 0; i < infProject.scene.array.wall.length; i++ )
	{
		var wall = infProject.scene.array.wall[i];
		
		for ( var i2 = 0; i2 < wall.userData.wd.length; i2++ )
		{
			for ( var i3 = 0; i3 < infProject.scene.array.door.length; i3++ )
			{
				if(wall.userData.wd[i2] == infProject.scene.array.door[i3].userData.id)
				{
					wall.userData.wall.arrO[wall.userData.wall.arrO.length] = infProject.scene.array.door[i3];
				}
				
				if(wall.userData.wd[i2] == infProject.scene.array.window[i3].userData.id)
				{
					wall.userData.wall.arrO[wall.userData.wall.arrO.length] = infProject.scene.array.window[i3];
				}				
			}
			
		}
		
	}
	
	
	getInfoRenderWall();
	
	console.log(infProject.scene);
	
	scene.add( obj );
	
	fitCameraToObject({obj: obj}); 
	
	renderCamera();	
}








