

var isMouseDown1 = false;
var isMouseRight1 = false;
var isMouseDown2 = false;
var isMouseDown3 = false;
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
	if(event.changedTouches)
	{   
		if(event.changedTouches[0].identifier == 0)
		{
			event.clientX = event.changedTouches[0].clientX;
			event.clientY = event.changedTouches[0].clientY;
			vk_click = 'left';			
			
			if(event.changedTouches[1])
			{
				event.clientX = event.changedTouches[1].clientX;
				event.clientY = event.changedTouches[1].clientY;
				
				vk_click = 'right';
			}

			clickInf.event = event;
		}
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
		if(event.changedTouches[0].identifier == 0)
		{ 
			event.clientX = event.changedTouches[0].clientX;
			event.clientY = event.changedTouches[0].clientY;
			isMouseDown2 = true;
			
			if(event.changedTouches[1])
			{
				event.clientX = event.changedTouches[1].clientX;
				event.clientY = event.changedTouches[1].clientY;
				
				isMouseDown2 = false;
				isMouseDown3 = true;
			}
			
			clickInf.event = event;
		}
	}
	else
	{
		clickInf.event = event;
	}
	
	console.log(vk_click, event);

	if ( !long_click ) { long_click = ( lastClickTime - new Date().getTime() < catchTime ) ? true : false; }

	if ( camera == camera3D ) { cameraMove3D( clickInf.event ); }
	else if ( camera == cameraTop ) { moveCameraTop( clickInf.event ); }

	renderCamera();
}

var dblclickPos = null;
var clickInf = {event: null};

function onDocumentMouseUp()  
{	

	if(!long_click && camera == camera3D && !isDoubleClick)
	{
		planeMath.position.set(camera.position.x,0,camera.position.z);
		planeMath.rotation.set(-Math.PI/2,0,0);  
		planeMath.updateMatrixWorld();
		
		var intersects = rayIntersect( clickInf.event, planeMath, 'one' );

		dblclickPos = intersects[0].point;
	}
	
	isMouseDown1 = false;
	isMouseRight1 = false;
	isMouseDown2 = false;
	isMouseDown3 = false;
	
	renderCamera();
}





