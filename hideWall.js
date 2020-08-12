

var wallVisible = [];





// собираем инфу, какие стены будем скрывать в 3D режиме
// опрееляем стена относится ко скольки зонам (0, 1, 2) 
// если 1 зона, то стена внешняя
function getInfoRenderWall()
{
	wallVisible = [];
	var wall = infProject.scene.array.wall;
	
	for ( var i = 0; i < wall.length; i++ )
	{	
		if(wall[i].userData.hide) 
		{ 	
			var side = wall[i].userData.hide;

			if(side == 2) { var n1 = 0; var n2 = 1; }
			else { var n1 = 1; var n2 = 0; }
			
			var x1 = wall[i].userData.point[n2].z - wall[i].userData.point[n1].z;
			var z1 = wall[i].userData.point[n1].x - wall[i].userData.point[n2].x;	
			var dir = new THREE.Vector3(x1, 0, z1).normalize();						// перпендикуляр стены	
			
			wallVisible[wallVisible.length] = { wall : wall[i], normal : dir };  
		}
	}	
}



// скрываем внешние стены, когда она перекрывает обзор
function wallAfterRender_2()
{ //return; 

	var camPos = camera.getWorldDirection(new THREE.Vector3());
	
	camPos = new THREE.Vector3(camPos.x, 0, camPos.z).normalize();
	
	for ( var i = 0; i < wallVisible.length; i++ )
	{
		var wall = wallVisible[ i ].wall;		
		
		var res = camPos.dot( wallVisible[ i ].normal.clone() );
		
		if ( res > 0.5 )  
		{ 	
			wall.renderOrder = Math.abs(res);
			wall.userData.wall.show = false;
			setTransparentMat({obj: wall, value: 1 - Math.abs(res)});
			
			for ( var i2 = 0; i2 < wall.userData.wall.arrO.length; i2++ ) 
			{
				wall.userData.wall.arrO[i2].visible = false;				
			}
		}
		else
		{
			wall.renderOrder = 0;
			wall.userData.wall.show = true;
			setTransparentMat({obj: wall, value: 1});
			
			for ( var i2 = 0; i2 < wall.userData.wall.arrO.length; i2++ ) 
			{
				wall.userData.wall.arrO[i2].visible = true;
			}
		}
	}
}


// показываем стены, которые были спрятаны
function showAllWallRender()
{		
	for ( var i = 0; i < wallVisible.length; i++ ) 
	{ 
		var wall = wallVisible[i].wall;

		wall.renderOrder = 0;
		wall.userData.wall.show = true;
		setTransparentMat({obj: wall, value: 1});
		
		for ( var i2 = 0; i2 < wall.userData.wall.arrO.length; i2++ ) 
		{
			wall.userData.wall.arrO[i2].visible = true;
		}		
	}
}


function setTransparentMat(cdm)
{
	var obj = cdm.obj;
	
	var arrM = [];
	
	if(obj.userData.tag == 'wall')
	{
		obj.traverse(function(child)
		{
			if(child.material)
			{
				arrM[arrM.length] = child.material;
			}			
		});
	}
	
	
	for( var i = 0; i < arrM.length; i++ ) 
	{
		// устанавливаем заданное значение
		if(cdm.value)
		{
			var value = (arrM[i].userData.opacity < cdm.value) ? arrM[i].userData.opacity : cdm.value;
			
			arrM[i].opacity = value;
		}
		
		// восстанавливаем значение
		if(cdm.default)
		{
			arrM[i].opacity = arrM[i].userData.opacity;
		}		
	}
	
}






// скрываем внешние стены, когда она перекрывает обзор
function wallAfterRender_3()
{ //return; 

	var camPos = camera.getWorldDirection(new THREE.Vector3());
	
	camPos = new THREE.Vector3(camPos.x, 0, camPos.z).normalize();
	
	for ( var i = 0; i < wallVisible.length; i++ )
	{
		var wall = wallVisible[ i ];		
		
		var res = camPos.dot( wallVisible[ i ].userData.direction.clone() );
		
		if ( res > 0.2 )  
		{ 	
			wall.userData.wall.show = false;
			setTransparentMat_2({obj: wall, value: 1 - Math.abs(res), renderOrder: Math.abs(res)});
		}
		else
		{
			wall.userData.wall.show = true;
			setTransparentMat_2({obj: wall, default: true, renderOrder: 0});
		}
	}
}



function setTransparentMat_2(cdm) 
{
	var obj = cdm.obj;
	
	var arrM = [];
	
	obj.traverse(function(child)
	{
		child.renderOrder = cdm.renderOrder;
		
		if(child.material)
		{
			arrM[arrM.length] = child.material;
		}			
	});

	
	
	for( var i = 0; i < arrM.length; i++ ) 
	{
		// устанавливаем заданное значение
		if(cdm.value)
		{
			var value = (arrM[i].userData.opacity < cdm.value) ? arrM[i].userData.opacity : cdm.value;
			
			arrM[i].opacity = value;
		}
		
		// восстанавливаем значение
		if(cdm.default)
		{
			arrM[i].opacity = arrM[i].userData.opacity;
		}		
	}
}


function showAllWallRender_2()
{		
	for ( var i = 0; i < wallVisible.length; i++ )  
	{ 
		var wall = wallVisible[i];

		wall.userData.wall.show = true;
		setTransparentMat_2({obj: wall, default: true, renderOrder: 0});		
	}
}




