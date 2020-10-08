
var type_browser = detectBrowser();
var newCameraPosition = null;


function updateKeyDown() 
{
	var flag = false;
	var rot = false;
	
	var keys = clickO.keys;  
	if(keys.length == 0) return;
	
	if ( camera == cameraTop )
	{
		if ( keys[ 87 ] || keys[ 38 ] ) 
		{
			camera.position.z -= 0.1;			
			flag = true;
		}
		else if ( keys[ 83 ] || keys[ 40 ] ) 
		{
			camera.position.z += 0.1;
			flag = true;
		}
		if ( keys[ 65 ] || keys[ 37 ] ) 
		{
			camera.position.x -= 0.1;
			flag = true;
		}
		else if ( keys[ 68 ] || keys[ 39 ] ) 
		{
			camera.position.x += 0.1;
			flag = true;
		}
	}
	else if ( camera == camera3D ) 
	{
		var kof = (camera3D.userData.camera.type == 'fly') ? 0.1 : 0.1;
		
		if ( keys[ 87 ] || keys[ 38 ] ) 
		{
			var x = Math.sin( camera.rotation.y );
			var z = Math.cos( camera.rotation.y );
			var dir = new THREE.Vector3( -x, 0, -z );
			dir = new THREE.Vector3().addScaledVector( dir, kof );
			//camera.position.add( dir );
			
			flag = true;
		}
		else if ( keys[ 83 ] || keys[ 40 ] ) 
		{
			var x = Math.sin( camera.rotation.y );
			var z = Math.cos( camera.rotation.y );
			var dir = new THREE.Vector3( x, 0, z );
			dir = new THREE.Vector3().addScaledVector( dir, kof );
			dir.addScalar( 0.0001 );
			//camera.position.add( dir );
			
			flag = true;
		}
		if ( keys[ 65 ] || keys[ 37 ] ) 
		{
			if(camera == camera3D) { if(camera3D.userData.camera.type == 'first' && keys[ 37 ]) { rot = true; } }
			
			if(rot && keys[ 37 ])
			{
				camera.rotation.y += 0.025;
				var dir = new THREE.Vector3( 0, 0, 0 );
			}
			else
			{
				var x = Math.sin( camera.rotation.y - 1.5707963267948966 );
				var z = Math.cos( camera.rotation.y - 1.5707963267948966 );
				var dir = new THREE.Vector3( x, 0, z );
				dir = new THREE.Vector3().addScaledVector( dir, kof );
				dir.addScalar( 0.0001 );
				//camera.position.add( dir );				
			}
			
			flag = true;
		}
		else if ( keys[ 68 ] || keys[ 39 ] ) 
		{
			
			if(camera == camera3D) { if(camera3D.userData.camera.type == 'first' && keys[ 39 ]) { rot = true; } }
			
			if(rot && keys[ 39 ])
			{
				camera.rotation.y -= 0.025;
				var dir = new THREE.Vector3( 0, 0, 0 );
			}
			else
			{
				var x = Math.sin( camera.rotation.y + 1.5707963267948966 );
				var z = Math.cos( camera.rotation.y + 1.5707963267948966 );
				var dir = new THREE.Vector3( x, 0, z );
				dir = new THREE.Vector3().addScaledVector( dir, kof );
				dir.addScalar( 0.0001 );
				//camera.position.add( dir );			
			}						
			
			flag = true;
		}
		if ( keys[ 88 ] && 1==2 ) 
		{
			var dir = new THREE.Vector3( 0, 1, 0 );
			dir = new THREE.Vector3().addScaledVector( dir, -kof );
			dir.addScalar( 0.0001 );
			//camera.position.add( dir );
			
			flag = true;
		}
		else if ( keys[ 67 ] && 1==2 ) 
		{
			var dir = new THREE.Vector3( 0, 1, 0 );
			dir = new THREE.Vector3().addScaledVector( dir, kof );
			dir.addScalar( 0.0001 );
			//camera.position.add( dir );
			
			flag = true;
		}
	}

	if(flag) 
	{ 
		if(!rot && camera == camera3D) 
		{ 
			if(!newCameraPosition) newCameraPosition = {};
			//dir.x *= 2.5;
			//dir.z *= 2.5;
			newCameraPosition.moveFirst = camera.position.clone().add( dir );
			
		}			
		else
		{
			newCameraPosition = null;
			camera.position.add( dir );
			infProject.camera.d3.targetO.position.add( dir );
		}
		
		renderCamera(); 
	}
}


// первоначальные настройки при страте 
function startPosCamera3D(cdm)
{
	camera3D.position.x = 0;
	camera3D.position.y = cdm.radious * Math.sin( cdm.phi * Math.PI / 360 );
	camera3D.position.z = cdm.radious * Math.cos( cdm.theta * Math.PI / 360 ) * Math.cos( cdm.phi * Math.PI / 360 );			
			
	camera3D.lookAt(new THREE.Vector3( 0, 0, 0 ));
	
	camera3D.userData.camera.save.pos = camera3D.position.clone();
	camera3D.userData.camera.save.radius = infProject.camera.d3.targetO.position.distanceTo(camera3D.position);	
}



// кликаем левой кнопокой мыши (собираем инфу для перемещения камеры в 2D режиме)
function clickSetCamera2D( event, click )
{
	if ( camera != cameraTop) return;
	
	newCameraPosition = null;
	
	planeMath.position.set(camera.position.x,0,camera.position.z);
	planeMath.rotation.set(-Math.PI/2,0,0);  
	planeMath.updateMatrixWorld();
	
	var intersects = rayIntersect( event, planeMath, 'one' );
	
	onMouseDownPosition.x = intersects[0].point.x;
	onMouseDownPosition.z = intersects[0].point.z;	 		
}


// 1. кликаем левой кнопокой мыши (собираем инфу для вращения камеры в 3D режиме)
// 2. кликаем правой кнопокой мыши (собираем инфу для перемещения камеры в 3D режиме и устанавливаем мат.плоскость)
function clickSetCamera3D( event, click )
{
	if ( camera != camera3D ) { return; }

	onMouseDownPosition.x = event.clientX;
	onMouseDownPosition.y = event.clientY;

	if ( click == 'left' )				// 1
	{
		//var dir = camera.getWorldDirection();
		var dir = new THREE.Vector3().subVectors( infProject.camera.d3.targetO.position, camera.position ).normalize();
		
		// получаем угол наклона камеры к target (к точке куда она смотрит)
		var dergree = THREE.Math.radToDeg( dir.angleTo(new THREE.Vector3(dir.x, 0, dir.z)) ) * 2;	
		if(dir.y > 0) { dergree *= -1; } 			
		
		// получаем угол направления (на плоскости) камеры к target 
		dir.y = 0; 
		dir.normalize();    			
		
		
		infProject.camera.d3.theta = THREE.Math.radToDeg( Math.atan2(dir.x, dir.z) - Math.PI ) * 2;
		infProject.camera.d3.phi = dergree;
	}
	else if ( click == 'right' )		// 2
	{
		
		planeMath.position.copy( infProject.camera.d3.targetO.position );
		planeMath.rotation.copy( camera.rotation );
		//planeMath.rotation.set(-Math.PI/2, 0, 0);
		planeMath.updateMatrixWorld();

		var intersects = rayIntersect( event, planeMath, 'one' );	
		camera3D.userData.camera.click.pos = intersects[0].point; 

		clickInf.st.clientX = event.clientX;
		clickInf.st.clientY = event.clientY;		
	}
}



function moveCameraTop( event ) 
{
	if(camera != cameraTop) return;
	if(vk_click == '') return;

	newCameraPosition = null;	
	
	var intersects = rayIntersect( event, planeMath, 'one' );
	
	camera.position.x += onMouseDownPosition.x - intersects[0].point.x;
	camera.position.z += onMouseDownPosition.z - intersects[0].point.z;	
}




function cameraMove3D( event )
{ 
	var pos = camera.position.clone();
	var rot = new THREE.Vector3(camera.rotation.x, camera.rotation.y, camera.rotation.z);
	
	if ( camera3D.userData.camera.type == 'fly' )
	{
		if ( vk_click == 'left' ) 
		{  //console.log(2, vk_click);
			//newCameraPosition = null;
			var radious = infProject.camera.d3.targetO.position.distanceTo( camera.position );
			
			var theta = - ( ( event.clientX - onMouseDownPosition.x ) * 0.5 ) + infProject.camera.d3.theta;
			var phi = ( ( event.clientY - onMouseDownPosition.y ) * 0.5 ) + infProject.camera.d3.phi;
			var phi = Math.min( 180, Math.max( -60, phi ) );

			camera.position.x = radious * Math.sin( theta * Math.PI / 360 ) * Math.cos( phi * Math.PI / 360 );
			camera.position.y = radious * Math.sin( phi * Math.PI / 360 );
			camera.position.z = radious * Math.cos( theta * Math.PI / 360 ) * Math.cos( phi * Math.PI / 360 );

			camera.position.add( infProject.camera.d3.targetO.position );  
			camera.lookAt( infProject.camera.d3.targetO.position );			
			
			infProject.camera.d3.targetO.rotation.set( 0, camera.rotation.y, 0 );
			
			//wallAfterRender_2();
			wallAfterRender_3();
		}
		if ( vk_click == 'right' )    
		{ //console.log(3, vk_click);
			//newCameraPosition = null;
			
			if(event.targetTouches)
			{
				if(event.targetTouches.length == 2)	
				{
					
					var ratio2 = new THREE.Vector2(event.targetTouches[0].clientX, event.targetTouches[0].clientY).distanceTo(new THREE.Vector2(event.targetTouches[1].clientX, event.targetTouches[1].clientY));
					
					touchCameraZoom3D( clickInf.ratio1/ratio2 );
					
					event.clientX = (event.targetTouches[1].clientX - clickInf.th2.clientX) + event.targetTouches[0].clientX;
					event.clientY = (event.targetTouches[1].clientY - clickInf.th2.clientY) + event.targetTouches[0].clientY;
				}								
			}
			
		if ( vk_click == 'right' )    
		{ //console.log(3, vk_click);
			//newCameraPosition = null;
			
			if(event.targetTouches)
			{
				if(event.targetTouches.length == 2)	
				{
					
					let ratio2 = new THREE.Vector2(event.targetTouches[0].clientX, event.targetTouches[0].clientY).distanceTo(new THREE.Vector2(event.targetTouches[1].clientX, event.targetTouches[1].clientY));
					
					touchCameraZoom3D( clickInf.ratio1/ratio2 );
					
					event.clientX = (event.targetTouches[1].clientX - clickInf.th2.clientX) + event.targetTouches[0].clientX;
					event.clientY = (event.targetTouches[1].clientY - clickInf.th2.clientY) + event.targetTouches[0].clientY;
				}								
			}
			
			if(typeCamMove == 1)
			{
				let intersects = rayIntersect( event, planeMath, 'one' );
				if(!intersects[0]) return;
				let offset = new THREE.Vector3().subVectors( camera3D.userData.camera.click.pos, intersects[0].point );
				//offset.y = 0;
				camera.position.add( offset );
				infProject.camera.d3.targetO.position.add( offset );							
			}
			else
			{
				let mX = event.clientX - clickInf.st.clientX;
				let mY = event.clientY - clickInf.st.clientY;
				
				let x = Math.sin( camera.rotation.y );
				let z = Math.cos( camera.rotation.y );
				let dir = new THREE.Vector3( -x, 0, -z );
				dir = new THREE.Vector3().addScaledVector( dir, mY * 0.01 );
				camera.position.add( dir );
				infProject.camera.d3.targetO.position.add( dir );

				x = Math.sin( camera.rotation.y - 1.5707963267948966 );
				z = Math.cos( camera.rotation.y - 1.5707963267948966 );
				dir = new THREE.Vector3( x, 0, z );
				dir = new THREE.Vector3().addScaledVector( dir, mX * 0.01 );
				camera.position.add( dir );
				infProject.camera.d3.targetO.position.add( dir );
			}
			
			clickInf.st.clientX = event.clientX;
			clickInf.st.clientY = event.clientY;
		
			wallAfterRender_3();
		}
		}
		
	}
	else if ( camera3D.userData.camera.type == 'first' )
	{
		if ( vk_click == 'left' )
		{
			//newCameraPosition = null;
			var y = ( ( event.clientX - onMouseDownPosition.x ) * 0.006 );
			var x = ( ( event.clientY - onMouseDownPosition.y ) * 0.006 );

			camera.rotation.x -= x;
			camera.rotation.y -= y;
			onMouseDownPosition.x = event.clientX;
			onMouseDownPosition.y = event.clientY;
			
			infProject.camera.d3.targetO.position.set( camera.position.x, infProject.camera.d3.targetO.position.y, camera.position.z );

			infProject.camera.d3.targetO.rotation.set( 0, camera.rotation.y, 0 );
		}
	} 		
	
	if(!comparePos(camera.position, pos))
	{
		//console.log('pos', 99999);
		long_click = true;		
	}
	else if(!comparePos(camera.rotation, rot))
	{
		//console.log('rot', 99999);
		long_click = true;		
	}
}




function touchCameraZoom3D( zoom )
{
	if ( camera != camera3D ) return;

	if(camera3D.userData.camera.type == 'fly')
	{
		var dist = zoom * clickInf.camDist;

		var pos1 = infProject.camera.d3.targetO.position;
		var pos2 = camera.position.clone();
		
		var dir = new THREE.Vector3().subVectors( camera.position, pos1 ).normalize();
		dir = new THREE.Vector3().addScaledVector( dir, dist );  
		var pos3 = new THREE.Vector3().addVectors( pos1, dir );

		console.log(clickInf.camDist, zoom, dist);

		camera.position.copy( pos3 ); 			
	}
}




function dblclickMovePosition()
{ 
	if(!dblclickPos) return;  
	if(newCameraPosition) return;
	if( new Date().getTime() - lastClickTime < doubleClickThreshold) return;
	
	if(camera3D.userData.camera.type == 'first')
	{
		newCameraPosition = { positionFirst: new THREE.Vector3(dblclickPos.x, camera.position.y, dblclickPos.z), stoDir: true };
	}
	else
	{
		dblclickPos = dblclickPos.sub(infProject.camera.d3.targetO.position).add(camera.position);
		newCameraPosition = { positionFly: new THREE.Vector3(dblclickPos.x, camera.position.y, dblclickPos.z), stoDir: true };
	}
	
	dblclickPos = null;
}




// cameraZoom
function onDocumentMouseWheel( e )
{
	
	var delta = e.wheelDelta ? e.wheelDelta / 120 : e.detail ? e.detail / 3 : 0;

	if ( type_browser == 'Chrome' || type_browser == 'Opera' ) { delta = -delta; }

	if(camera == cameraTop) 
	{ 
		cameraZoomTop( camera.zoom - ( delta * 0.1 * ( camera.zoom / 2 ) ) ); 
	}
	else if(camera == camera3D) 
	{ 
		cameraZoom3D( delta, 1 ); 
	}
	
	renderCamera();
}






function cameraZoomTopLoop() 
{
	var flag = false;
	
	if ( camera == cameraTop )
	{
		if ( zoomLoop == 'zoomOut' ) { cameraZoomTop( camera.zoom - ( 0.05 * ( camera.zoom / 2 ) ) ); flag = true; }
		if ( zoomLoop == 'zoomIn' ) { cameraZoomTop( camera.zoom - ( -0.05 * ( camera.zoom / 2 ) ) ); flag = true; }
	}
	else if ( camera == camera3D )
	{
		if ( zoomLoop == 'zoomOut' ) { cameraZoom3D( 0.3, 0.3 ); flag = true; }
		if ( zoomLoop == 'zoomIn' ) { cameraZoom3D( -0.3, 0.3 ); flag = true; }
	}
	else if ( camera == cameraWall )
	{
		if ( zoomLoop == 'zoomOut' ) { camera.zoom = camera.zoom - ( 0.4 * 0.1 * ( camera.zoom / 2 ) ); flag = true; }
		if ( zoomLoop == 'zoomIn' ) { camera.zoom = camera.zoom - ( -0.4 * 0.1 * ( camera.zoom / 2 ) ); flag = true; }
		camera.updateProjectionMatrix();
	}
	
	if(flag) { renderCamera(); }
}






function cameraZoomTop( delta )
{
	if(camera == cameraTop)
	{		
		camera.zoom = delta;
		camera.updateProjectionMatrix();		
	}
}



function cameraZoom3D( delta, z )
{
	if ( camera != camera3D ) return;

	if(camera3D.userData.camera.type == 'fly')
	{
		var vect = ( delta < 0 ) ? z : -z;

		var pos1 = infProject.camera.d3.targetO.position;
		var pos2 = camera.position.clone();
		
		var dir = new THREE.Vector3().subVectors( pos1, camera.position ).normalize();
		dir = new THREE.Vector3().addScaledVector( dir, vect );  
		var pos3 = new THREE.Vector3().addVectors( camera.position, dir );	


		var qt = quaternionDirection( new THREE.Vector3().subVectors( pos1, camera.position ).normalize() );
		var v1 = localTransformPoint( new THREE.Vector3().subVectors( pos1, pos3 ), qt );


		var offset = new THREE.Vector3().subVectors( pos3, pos2 );
		var pos2 = new THREE.Vector3().addVectors( pos1, offset );

		var centerCam_2 = pos1.clone();
		
		if ( delta < 0 ) { if ( pos2.y >= 0 ) { centerCam_2.copy( pos2 ); } }
		
		if ( v1.z >= 0.5) 
		{ 
			infProject.camera.d3.targetO.position.copy(centerCam_2);
			camera.position.copy( pos3 ); 	
		}			
	}
}



// приближаемся к выбранному объекту
function fitCameraToObject(cdm)
{
	var obj = cdm.obj; 
	
	if(!obj) return;
	
	
	var arr = [];
	
	obj.traverse(function(child) 
	{
		if (child instanceof THREE.Mesh)
		{
			if(child.geometry) { arr[arr.length] = child; }
		}
	});	

	//scene.updateMatrixWorld();
	
	var v = [];
	
	for ( var i = 0; i < arr.length; i++ )
	{
		arr[i].updateMatrixWorld();
		arr[i].geometry.computeBoundingBox();	
		arr[i].geometry.computeBoundingSphere();

		var bound = arr[i].geometry.boundingBox;
		
		//console.log(111111, arr[i], bound);

		v[v.length] = new THREE.Vector3(bound.min.x, bound.min.y, bound.max.z).applyMatrix4( arr[i].matrixWorld );
		v[v.length] = new THREE.Vector3(bound.max.x, bound.min.y, bound.max.z).applyMatrix4( arr[i].matrixWorld );
		v[v.length] = new THREE.Vector3(bound.min.x, bound.min.y, bound.min.z).applyMatrix4( arr[i].matrixWorld );
		v[v.length] = new THREE.Vector3(bound.max.x, bound.min.y, bound.min.z).applyMatrix4( arr[i].matrixWorld );

		v[v.length] = new THREE.Vector3(bound.min.x, bound.max.y, bound.max.z).applyMatrix4( arr[i].matrixWorld );
		v[v.length] = new THREE.Vector3(bound.max.x, bound.max.y, bound.max.z).applyMatrix4( arr[i].matrixWorld );
		v[v.length] = new THREE.Vector3(bound.min.x, bound.max.y, bound.min.z).applyMatrix4( arr[i].matrixWorld );
		v[v.length] = new THREE.Vector3(bound.max.x, bound.max.y, bound.min.z).applyMatrix4( arr[i].matrixWorld );		
	}
	
	var bound = { min : { x : 999999, y : 999999, z : 999999 }, max : { x : -999999, y : -999999, z : -999999 } };
	
	for(var i = 0; i < v.length; i++)
	{
		if(v[i].x < bound.min.x) { bound.min.x = v[i].x; }
		if(v[i].x > bound.max.x) { bound.max.x = v[i].x; }
		if(v[i].y < bound.min.y) { bound.min.y = v[i].y; }
		if(v[i].y > bound.max.y) { bound.max.y = v[i].y; }			
		if(v[i].z < bound.min.z) { bound.min.z = v[i].z; }
		if(v[i].z > bound.max.z) { bound.max.z = v[i].z; }		
	}						
	


	//camera3D
	{	
		var center = new THREE.Vector3((bound.max.x - bound.min.x)/2 + bound.min.x, (bound.max.y - bound.min.y)/2 + bound.min.y, (bound.max.z - bound.min.z)/2 + bound.min.z);
				
		var fitOffset = 5.1;
		var maxSize = Math.max( bound.max.x - bound.min.x, bound.max.y - bound.min.y, bound.max.z - bound.min.z );  
		//var fitHeightDistance = maxSize / ( 2 * Math.atan( Math.PI * camera.fov / 360 ) );		
		//var fitWidthDistance = fitHeightDistance / camera.aspect;		
		//var distance = fitOffset * Math.max( fitHeightDistance, fitWidthDistance );		
		
		camera3D.lookAt(center);		
		var dir = center.clone().sub( camera3D.position ).normalize().multiplyScalar( maxSize + 0.5 );	
		camera3D.position.copy(center).sub(dir);	
		infProject.camera.d3.targetO.position.copy( center );
		
		camera3D.updateProjectionMatrix();
	}
	
	
	//cameraTop
	{

		var aspect = window.innerWidth/window.innerHeight;		
		
		if( aspect > 1.0 )	// определяем что больше ширина или высота окна canvas
		{
			// if view is wider than it is tall, zoom to fit height
			// если окно по ширине больше
			cameraTop.zoom = camera.right / (( bound.max.x - bound.min.x )/1.5);
		}
		else
		{
			// if view is taller than it is wide, zoom to fit width
			// если окно больше по высоте
			cameraTop.zoom = camera.top / (( bound.max.z - bound.min.z )/1.5);
		}
		
		cameraTop.updateProjectionMatrix();

		// центр нужно считать, так как у трубы центр всегда в нулях
		var pos = new THREE.Vector3((bound.max.x - bound.min.x)/2 + bound.min.x, 0, (bound.max.z - bound.min.z)/2 + bound.min.z);		
		cameraTop.position.x = pos.x;
		cameraTop.position.z = pos.z;	
	}
		
	
	renderCamera();
}



function detectBrowser()
{
	var ua = navigator.userAgent;

	if ( ua.search( /MSIE/ ) > 0 ) return 'Explorer';
	if ( ua.search( /Firefox/ ) > 0 ) return 'Firefox';
	if ( ua.search( /Opera/ ) > 0 ) return 'Opera';
	if ( ua.search( /Chrome/ ) > 0 ) return 'Chrome';
	if ( ua.search( /Safari/ ) > 0 ) return 'Safari';
	if ( ua.search( /Konqueror/ ) > 0 ) return 'Konqueror';
	if ( ua.search( /Iceweasel/ ) > 0 ) return 'Debian';
	if ( ua.search( /SeaMonkey/ ) > 0 ) return 'SeaMonkey';

	// Браузеров очень много, все вписывать смысле нет, Gecko почти везде встречается
	if ( ua.search( /Gecko/ ) > 0 ) return 'Gecko';

	// а может это вообще поисковый робот
	return 'Search Bot';
}


console.log( detectBrowser() );
