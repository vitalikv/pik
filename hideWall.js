

var wallVisible = [];





// собираем инфу, какие стены будем скрывать в 3D режиме
// опрееляем стена относится ко скольки зонам (0, 1, 2) 
// если 1 зона, то стена внешняя
function getInfoRenderWall()
{
	wallVisible = [];
	let wall = infProject.scene.array.wall;
	
	for ( let i = 0; i < wall.length; i++ )
	{	
		if(wall[i].userData.hide) 
		{ 	
			let side = wall[i].userData.hide;

			if(side == 2) { let n1 = 0; let n2 = 1; }
			else { let n1 = 1; let n2 = 0; }
			
			let x1 = wall[i].userData.point[n2].z - wall[i].userData.point[n1].z;
			let z1 = wall[i].userData.point[n1].x - wall[i].userData.point[n2].x;	
			let dir = new THREE.Vector3(x1, 0, z1).normalize();						// перпендикуляр стены	
			
			wallVisible[wallVisible.length] = { wall : wall[i], normal : dir };  
		}
	}	
}







// скрываем внешние стены, когда она перекрывает обзор
function wallAfterRender_3()
{ 

	let camPos = camera.getWorldDirection(new THREE.Vector3());
	
	camPos = new THREE.Vector3(camPos.x, 0, camPos.z).normalize();
	
	for ( let i = 0; i < wallVisible.length; i++ )
	{
		let wall = wallVisible[ i ];		
		
		let res = camPos.dot( wallVisible[ i ].userData.direction.clone() );
		
		
		wall.userData.wall.show = false;
		let k = Math.abs(res - 1);
		if(k < 0) k = 0;		
		
		res += 0.2;		
		res = res * 10;	
		
		if(res < 0) res = 0;
		
		setTransparentMat_2({obj: wall, value: res, renderOrder: k});
	}
}



function setTransparentMat_2(cdm) 
{ 
	let obj = cdm.obj;
	
	let arrM = [];
	let arrO = [];
	obj.traverse(function(child)
	{
		child.renderOrder = cdm.renderOrder;
		
		if(child.material)
		{
			arrM[arrM.length] = child.material;
			arrO[arrO.length] = child;
		}			
	});

	
	
	for( let i = 0; i < arrM.length; i++ ) 
	{
		// устанавливаем заданное значение
		if(cdm.value !== undefined)
		{
			let value = (arrM[i].userData.opacity < cdm.value) ? arrM[i].userData.opacity : cdm.value;
			
			arrM[i].opacity = value;
			if(arrM[i].opacity > 0.98) arrM[i].transparent = false;
			if(arrM[i].opacity < 0.98) arrM[i].transparent = true;
		}
		
		// восстанавливаем значение
		if(cdm.default)
		{
			arrM[i].opacity = arrM[i].userData.opacity;
			
			if(arrM[i].userData.opacity < 0.7) arrO[i].renderOrder = 1;
			
			if(arrM[i].userData.opacity > 0.98) arrM[i].transparent = false;
		}		
	}
}


// показываем все стены
function showAllWallRender_2()
{		
	for ( let i = 0; i < wallVisible.length; i++ )  
	{ 
		let wall = wallVisible[i];

		wall.userData.wall.show = true;
		setTransparentMat_2({obj: wall, default: true, renderOrder: 0});		
	}
}






