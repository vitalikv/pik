

var dblclickPos = null;
var clickInf = {event: null, touches: [false, false], touchA: -1};

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
console.log(event.targetTouches.length, event);
		if(event.targetTouches.length == 1)
		{
			vk_click = 'left';
			clickInf.touches[0] = true;
			clickInf.touchA = 0;
		}
		else
		{	
			clickInf.touches[1] = true;
			clickInf.touchA = 1;
			vk_click = 'right';			
		}
		
		event.clientX = event.targetTouches[0].clientX;
		event.clientY = event.targetTouches[0].clientY;
		
		clickInf.event = event;
	}
	else
	{
		clickInf.event = event;
		
		switch ( event.button ) 
		{
			case 0: vk_click = 'left'; break;
			case 1: vk_click = 'right'; /*middle*/ break;
			case 2: vk_click = 'right'; break;
		}
		
	}
	
	 
	
	isDoubleClick = false;
	//if( new Date().getTime() - lastClickTime < doubleClickThreshold && !newCameraPosition) { onDocumentDbMouseDown(); }
	
	long_click = false;
	lastClickTime = new Date().getTime();	
		

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

	
		clickInf.event = event;
	}
	else
	{
		clickInf.event = event;
	}
	
	

	if ( !long_click ) { long_click = ( lastClickTime - new Date().getTime() < catchTime ) ? true : false; }

	if ( camera == camera3D ) { cameraMove3D( clickInf.event ); }
	else if ( camera == cameraTop ) { moveCameraTop( clickInf.event ); }

	renderCamera();
}



function onDocumentMouseUp(event)  
{	

	if(event.changedTouches)
	{   
		if(event.changedTouches[0].identifier == 0)
		{
			clickInf.touches[0] = false;
		}
		else
		{	
			clickInf.touches[1] = false;			
		}
		
		if(clickInf.touches[0]) { clickInf.touchA = 0; }
		else if(clickInf.touches[1]) { clickInf.touchA = 1; }
		else { clickInf.touchA = -1; }
	}	


	if(!long_click && camera == camera3D && !isDoubleClick)
	{
		planeMath.position.set(camera.position.x,0,camera.position.z);
		planeMath.rotation.set(-Math.PI/2,0,0);  
		planeMath.updateMatrixWorld();
		
		var intersects = rayIntersect( clickInf.event, planeMath, 'one' );

		dblclickPos = intersects[0].point;
	}
	
	
	if(!clickInf.touches[0] && !clickInf.touches[1])
	{
		vk_click = '';
	}
	
	if(clickInf.touches[0] || clickInf.touches[1])
	{
		vk_click = 'left';
	}	
	
	
	
	renderCamera();
}





