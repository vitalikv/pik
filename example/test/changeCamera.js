

    


// переключение камеры
function changeCamera(cam)
{  
	
	camera = cam;
	
	if(camera == cameraTop)
	{						
		//cameraZoomTop( camera.zoom );
		//showAllWallRender();	// показываем стены, которые были спрятаны
		showAllWallRender_2();
	}
	else if(camera == camera3D)
	{	
		//infProject.camera.d3.targetO.visible = true;

		// прячем стены
		//wallAfterRender_2();
		wallAfterRender_3();
	}
	
	showHidePlita();
	showHideObjCeil();
	renderCamera();
}



// переключаем в 3D режиме полёт/вид от первого лица
function switchCamera3D(cdm)
{
	if(camera != camera3D) return;
	
	if(!cdm) { cdm = {}; }
	
	planeMath.position.set(camera.position.x,0,camera.position.z);
	planeMath.rotation.set(-Math.PI/2,0,0);  
	planeMath.updateMatrixWorld();
	
	

	if(cdm.event) 
	{ 
		var intersects = rayIntersect( cdm.event, planeMath, 'one' );
		var posCenter = intersects[0].point;  
	}
	else
	{
		var posCenter = infProject.camera.d3.targetO.position;
	}
	
	if(cdm.type)
	{
		camera3D.userData.camera.type = cdm.type;
	}
	else
	{
		if(camera3D.userData.camera.type == 'first')
		{
			camera3D.userData.camera.type = 'fly';
		}
		else
		{
			camera3D.userData.camera.type = 'first';
		}
	}

	
	if(camera3D.userData.camera.type == 'first')
	{		
		camera3D.userData.camera.save.pos = camera3D.position.clone();
		camera3D.userData.camera.save.radius = posCenter.distanceTo(camera.position);
		 
		camera3D.userData.camera.dist = posCenter.distanceTo(camera.position);
		camera3D.userData.camera.type = 'first';		
		
		newCameraPosition = { positionFirst: new THREE.Vector3(posCenter.x, 1.5, posCenter.z), chekCeil: true };

		// показываем стены, которые были спрятаны
		//showAllWallRender();
		showAllWallRender_2();
	}
	else
	{
		var radius = camera3D.userData.camera.save.radius;
		var pos = new THREE.Vector3();		
		
		var radH = Math.acos(camera3D.userData.camera.save.pos.y/radius);
		
		camera3D.updateMatrixWorld();
		var dir = camera3D.getWorldDirection(new THREE.Vector3());
		dir = new THREE.Vector3(dir.x, 0, dir.z).normalize();
		
		var radXZ = Math.atan2(dir.z, dir.x);		
	
		pos.x = -radius * Math.sin(radH) * Math.cos(radXZ) + posCenter.x; 
		pos.z = -radius * Math.sin(radH) * Math.sin(radXZ) + posCenter.z;
		pos.y = radius * Math.cos(radH);					
		
		newCameraPosition = { positionFly: pos, chekCeil: true };

		// прячем стены
		//wallAfterRender_2();
		wallAfterRender_3();		
	}
	
	showHidePlita();
	showHideObjCeil();
	dblclickPos = null;
}


// скрываем плиты, если в 3D переходим в режим от первого лица, во всех остальных случаях показываем
function showHidePlita()
{
	var visible = true;
	
	if(camera == cameraTop) { visible = true; }
	
	if(camera == camera3D) 
	{
		if(camera3D.userData.camera.type == 'first') { visible = false; }
		else { visible = true; }
	}
	
	for(let i = 0; i < plitaVisible.length; i++)
	{
		plitaVisible[i].visible = visible;
		//console.log(plitaVisible[i].name, plitaVisible[i].visible);
	}
	
	renderCamera();
}



// скрываем потолочные объекты
function showHideObjCeil()
{
	if(!boundG) return;
	
	var value = 1;
	
	if(camera == cameraTop) { value = 0; }
	
	if(camera == camera3D) 
	{
		if(camera3D.userData.camera.type == 'first') { value = 1; }
		else 
		{ 
			if(camera.position.y > boundG.max.y) { value = 0; }
			else 
			{
				value = 0;
				
				if(boundG.max.y - camera.position.y > 0.1) 
				{
					value = (Math.round((boundG.max.y - camera.position.y) * 100)/100) * 3;
					
					if(value > 1) value = 1;
				}
				
			}
		}
	}

	let k = Math.abs(value - 1);
	if(k < 0) k = 0;
		
	for(let i = 0; i < objCeilVisible.length; i++)
	{
		setTransparentMat_2({obj: objCeilVisible[i], value: value, renderOrder: k});
		
		//console.log(objCeilVisible[i].name);
	}
	
	renderCamera();
}



function moveCameraToNewPosition()
{

	if ( !newCameraPosition ) return;
	
	
	if ( camera == camera3D && newCameraPosition.moveFirst )
	{
		var pos = newCameraPosition.moveFirst;
		var pos2 = camera.position.clone();
		camera.position.lerp( pos, 0.5 );
		
		infProject.camera.d3.targetO.position.add(camera.position.clone().sub(pos2));
		
		if(comparePos(camera.position, pos)) 
		{ 	
			newCameraPosition = null; 
		};		
	}
	else if ( camera == camera3D && newCameraPosition.positionFirst || camera == camera3D && newCameraPosition.positionFly )
	{
		var pos = (newCameraPosition.positionFirst) ? newCameraPosition.positionFirst : newCameraPosition.positionFly;
		
		var pos2 = camera.position.clone();  
		
		camera.position.lerp( pos, 0.1 );
		
		if(!newCameraPosition.stoDir)
		{
			if(newCameraPosition.positionFirst)
			{
				var dir = camera.getWorldDirection(new THREE.Vector3()); 			
				dir.y = 0; 
				dir.normalize();
				dir.add( newCameraPosition.positionFirst );	
				camera.lookAt( dir );
			}
			if(newCameraPosition.positionFly)
			{
				var radius_1 = camera3D.userData.camera.save.radius;
				var radius_2 = infProject.camera.d3.targetO.position.distanceTo(camera.position);
				
				var k = Math.abs((radius_2/radius_1) - 1);
				
				var dir = camera.getWorldDirection(new THREE.Vector3()); 			
				dir.y = 0; 
				dir.normalize();
				dir.x *= 15*k;
				dir.z *= 15*k;
				dir.add( infProject.camera.d3.targetO.position );	
				
				camera.lookAt( dir ); 
			}		
		}
		else
		{
			infProject.camera.d3.targetO.position.add(camera.position.clone().sub(pos2));
		}
		
		if(comparePos(camera.position, pos)) 
		{ 	
			newCameraPosition = null; 
		};		
	}
	else
	{
		newCameraPosition = null;
	}
	
	if(newCameraPosition) 
	{
		if(newCameraPosition.chekCeil) { showHideObjCeil(); }
	}
	
	renderCamera();
}



// сравнить позиционирование
function comparePos(pos1, pos2, cdm)
{
	if(!cdm) cdm = {};
	
	var x = pos1.x - pos2.x;
	var y = pos1.y - pos2.y;
	var z = pos1.z - pos2.z;
	
	var kof = (cdm.kof) ? cdm.kof : 0.01;
	
	
	var equals = true;
	if(Math.abs(x) > kof){ equals = false; }
	if(Math.abs(y) > kof){ equals = false; }
	if(Math.abs(z) > kof){ equals = false; }

	return equals;
}




