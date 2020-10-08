

var dblclickPos = null;
var clickInf = {event: null, th1: {clientX:0, clientY:0}, th2: {clientX:0, clientY:0}, ratio1: 0, camDist: 0 };
clickInf.st = {clientX:0, clientY:0};

var onMouseDownPosition = new THREE.Vector2();
var long_click = false;
var lastClickTime = 0;
var doubleClickThreshold = 250;
var isDoubleClick = false;
var catchTime = 0.30;
var vk_click = '';





function mouseDownRight()
{

}


function onDocumentDbMouseDown()
{
	isDoubleClick = true;
	switchCamera3D({event: clickInf.event});
}



function onDocumentMouseDown( event )
{
	
}


function onDocumentMouseDown( event ) 
{
	vk_click = '';
	
	if(event.changedTouches)
	{   
console.log(event);
		if(event.targetTouches.length == 1)
		{
			vk_click = 'left';
		}
		else
		{	
			vk_click = 'right';	
			clickInf.th1.clientX = event.targetTouches[0].clientX;
			clickInf.th1.clientY = event.targetTouches[0].clientY;				
			clickInf.th2.clientX = event.targetTouches[1].clientX;
			clickInf.th2.clientY = event.targetTouches[1].clientY;	

			clickInf.ratio1 = new THREE.Vector2(clickInf.th2.clientX, clickInf.th2.clientY).distanceTo(new THREE.Vector2(clickInf.th1.clientX, clickInf.th1.clientY));
			clickInf.camDist = infProject.camera.d3.targetO.position.distanceTo(camera.position);
		}
		
		event.clientX = event.targetTouches[0].clientX;
		event.clientY = event.targetTouches[0].clientY;
		
		clickInf.st.clientX = event.clientX;
		clickInf.st.clientY = event.clientY;		
		
		if(event.targetTouches.length == 1)
		{
			isDoubleClick = false;
			if( new Date().getTime() - lastClickTime < doubleClickThreshold && !newCameraPosition) { onDocumentDbMouseDown(); }
			
			long_click = false;
			lastClickTime = new Date().getTime();				
		}		
	}
	else
	{
		switch ( event.button ) 
		{
			case 0: vk_click = 'left'; break;
			case 1: vk_click = 'right'; /*middle*/ break;
			case 2: vk_click = 'right'; break;
		}
		
	}
	
	clickInf.event = event;

		

	clickSetCamera2D( clickInf.event, vk_click );
	clickSetCamera3D( clickInf.event, vk_click );
	
	renderCamera();
}





function onDocumentMouseMove( event ) 
{ 
	if(event.changedTouches)
	{ 
		event.clientX = event.targetTouches[0].clientX;
		event.clientY = event.targetTouches[0].clientY;
	}
	
	clickInf.event = event;

	if ( !long_click ) { long_click = ( lastClickTime - new Date().getTime() < catchTime ) ? true : false; }

	if ( camera == camera3D ) { cameraMove3D( clickInf.event ); }
	else if ( camera == cameraTop ) { moveCameraTop( clickInf.event ); }

	renderCamera();
}



function onDocumentMouseUp(event)  
{	

	if(event.changedTouches)
	{   
		if(event.targetTouches.length == 1)
		{
			vk_click = 'left';
		}
		else if(event.targetTouches.length > 1)
		{	
			vk_click = 'right';			
		}
		else
		{
			vk_click = '';
		}
		
		
		if(vk_click != '')
		{
			event.clientX = event.targetTouches[0].clientX;
			event.clientY = event.targetTouches[0].clientY;
			
			clickInf.event = event;			
			
			clickSetCamera2D( clickInf.event, vk_click );
			clickSetCamera3D( clickInf.event, vk_click );					
		}
	}	
	else
	{
		vk_click = '';
	}

	if(!long_click && camera == camera3D && !isDoubleClick)
	{
		planeMath.position.set(camera.position.x,0,camera.position.z);
		planeMath.rotation.set(-Math.PI/2,0,0);  
		planeMath.updateMatrixWorld();
		
		var intersects = rayIntersect( clickInf.event, planeMath, 'one' );

		dblclickPos = intersects[0].point;
	}
	
	
	
	renderCamera();
}




