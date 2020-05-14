

    


// переключение камеры
function changeCamera(cam)
{  
	
	camera = cam;
	renderPass.camera = cam;
	outlinePass.renderCamera = cam;
	if(saoPass) saoPass.camera = cam;
	outlineRemoveObj();
	
	if(camera == cameraTop)
	{						
		//cameraZoomTop( camera.zoom );
	}
	else if(camera == camera3D)
	{	
		infProject.camera.d3.targetO.visible = true;	
	}
	
	renderCamera();
}






