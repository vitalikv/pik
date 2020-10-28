
var containerF = document.getElementById( 'canvasFrame' );

var canvas = document.createElement( 'canvas' );
var context = canvas.getContext( 'webgl2' );
var renderer = new THREE.WebGLRenderer( { canvas: canvas, context: context, preserveDrawingBuffer: true, } );

renderer.outputEncoding = THREE.sRGBEncoding;
renderer.gammaFactor = 2.2;

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( containerF.clientWidth, containerF.clientHeight );
containerF.appendChild( renderer.domElement );

var stats = new Stats();
containerF.appendChild( stats.dom );

var scene = new THREE.Scene();
scene.background = new THREE.Color( 0xffffff );

var aspect = containerF.clientWidth/containerF.clientHeight;
var d = 5;

//----------- cameraTop
var cameraTop = new THREE.OrthographicCamera( - d * aspect, d * aspect, d, - d, 1, 1000 );
cameraTop.position.set(0, 10, 0);
cameraTop.lookAt(scene.position);
cameraTop.zoom = 1;
cameraTop.updateMatrixWorld();
cameraTop.updateProjectionMatrix();
cameraTop.userData.camera = { save: { pos: cameraTop.position.clone(), zoom: cameraTop.zoom } };
//----------- cameraTop


//----------- camera3D
var camera3D = new THREE.PerspectiveCamera( 65, containerF.clientWidth / containerF.clientHeight, 0.01, 1000 );  
camera3D.rotation.order = 'YZX';		//'ZYX'
camera3D.position.set(5, 7, 5);
camera3D.lookAt(scene.position);
camera3D.rotation.z = 0;
camera3D.userData.camera = { type: 'fly', height: camera3D.position.y, startProject: true };
camera3D.userData.camera.click = { pos: new THREE.Vector3() };
camera3D.userData.camera.save = {}; 
camera3D.userData.camera.save.pos = camera3D.position.clone();
camera3D.userData.camera.save.radius = 0;
//----------- camera3D




//----------- render
function animate() 
{
	requestAnimationFrame( animate );	

	dblclickMovePosition();
	moveCameraToNewPosition();
	cameraZoomTopLoop();	
	
	updateKeyDown();
	
	stats.update();
}


function renderCamera()
{
	camera.updateMatrixWorld();

	renderer.render( scene, camera );
}
//----------- render


//----------- onWindowResize
window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize() 
{ 
	var aspect = containerF.clientWidth / containerF.clientHeight;
	var d = 5;
	
	cameraTop.left = -d * aspect;
	cameraTop.right = d * aspect;
	cameraTop.top = d;
	cameraTop.bottom = -d;
	cameraTop.updateProjectionMatrix();

	 
	camera3D.aspect = aspect;
	camera3D.updateProjectionMatrix();
	
	renderer.setSize(containerF.clientWidth, containerF.clientHeight);
	
	renderCamera();
}
//----------- onWindowResize





//----------- start


var resolutionD_w = window.screen.availWidth;
var resolutionD_h = window.screen.availHeight;
var camera = cameraTop;

var infProject = {}; 
infProject.camera = { d3: { theta: 0, phi: 75 } };
infProject.camera.d3.targetO = createCenterCamObj();
infProject.camera.d3.targetO.visible = false;
infProject.scene = {};
infProject.scene.obj = [];
infProject.scene.lightMap = [];
infProject.scene.array = { point: [], wall: [], window: [], door: [], floor: [], ceiling: [], obj: [] };
infProject.settings = {};
infProject.settings.lightMap = {type: 'jpg', act: true};


var typeCamMove = 1;	// перемещение как в планоплане
//var typeCamMove = 2;	// перемещение камеры по плоскости



var gCubeCam = null;

var zoomLoop = '';
var clickO = {keys:[]};


var planeMath = createPlaneMath();
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var offset = new THREE.Vector3();
  
var lightMap_1 = new THREE.TextureLoader().load('img/lightMap_1.png'); 


startPosCamera3D({radious: 15, theta: 90, phi: 65});		// стартовое положение 3D камеры

//----------- start




function createPlaneMath()
{
	var geometry = new THREE.PlaneGeometry( 10000, 10000 );
	//var geometry = new THREE.PlaneGeometry( 10, 10 );
	var material = new THREE.MeshLambertMaterial( {color: 0xffff00, transparent: true, opacity: 0.5, side: THREE.DoubleSide } );
	material.visible = false; 
	var planeMath = new THREE.Mesh( geometry, material );
	planeMath.rotation.set(-Math.PI/2, 0, 0);
	planeMath.userData.tag = 'planeMath';	
	scene.add( planeMath );	
	
	return planeMath;
}


// создаем круг (объект), для обозначения куда смотрит камера в 3D режиме
function createCenterCamObj()
{

	var material = new THREE.MeshPhongMaterial({ color: 0xcccccc, transparent: true, opacity: 1, depthTest: false });
	var obj = new THREE.Mesh( createGeometryCube(0.07, 0.07, 0.07), material );
	obj.renderOrder = 2;

	scene.add( obj );
	
	
	return obj;
}



function createGeometryCube(x, y, z, cdm)
{
	var geometry = new THREE.Geometry();
	x /= 2;
	z /= 2;
	var vertices = [
				new THREE.Vector3(-x,0,z),
				new THREE.Vector3(-x,y,z),
				new THREE.Vector3(x,y,z),
				new THREE.Vector3(x,0,z),
				new THREE.Vector3(x,0,-z),
				new THREE.Vector3(x,y,-z),
				new THREE.Vector3(-x,y,-z),
				new THREE.Vector3(-x,0,-z),
			];	
			
	var faces = [
				new THREE.Face3(0,3,2),
				new THREE.Face3(2,1,0),
				new THREE.Face3(4,7,6),
				new THREE.Face3(6,5,4),				
				new THREE.Face3(0,1,6),
				new THREE.Face3(6,7,0),					
				new THREE.Face3(1,2,5),
				new THREE.Face3(5,6,1),				
				new THREE.Face3(2,3,4),
				new THREE.Face3(4,5,2),				
				new THREE.Face3(3,0,7),
				new THREE.Face3(7,4,3),
			];
	
	var uvs3 = [
				new THREE.Vector2(0,0),
				new THREE.Vector2(1,0),
				new THREE.Vector2(1,1),
			];
	var uvs4 = [
				new THREE.Vector2(1,1),
				new THREE.Vector2(0,1),
				new THREE.Vector2(0,0),
			];	

	var uvs1 = [
				new THREE.Vector2(0,0),
				new THREE.Vector2(1,0),
				new THREE.Vector2(0.95,1),
			];
	var uvs2 = [
				new THREE.Vector2(0.95,1),
				new THREE.Vector2(1-0.95,1),
				new THREE.Vector2(0,0),
			];				


			
	geometry.vertices = vertices;
	geometry.faces = faces;
	geometry.faceVertexUvs[0] = [uvs3, uvs4, uvs3, uvs4, uvs3, uvs4, uvs1, uvs2, uvs3, uvs4, uvs3, uvs4];
	geometry.computeFaceNormals();	
	geometry.uvsNeedUpdate = true;	

	if(cdm)
	{
		if(cdm.material)
		{
			geometry.faces[0].materialIndex = 1;
			geometry.faces[1].materialIndex = 1;	
			geometry.faces[2].materialIndex = 2;
			geometry.faces[3].materialIndex = 2;	
			geometry.faces[6].materialIndex = 3;
			geometry.faces[7].materialIndex = 3;				
		}
	}
	
	return geometry;
}





function getMousePosition( event )
{
	var x = ( ( event.clientX - containerF.offsetLeft ) / containerF.clientWidth ) * 2 - 1;
	var y = - ( ( event.clientY - containerF.offsetTop ) / containerF.clientHeight ) * 2 + 1;	
	
	return new THREE.Vector2(x, y);
}


function getScreenMousePosition( event )
{
	var x = ( ( event.clientX - containerF.offsetLeft ) );
	var y = ( ( event.clientY - containerF.offsetTop ) );	
	
	return new THREE.Vector2(x, y);
}	
	

function rayIntersect( event, obj, t ) 
{
	mouse = getMousePosition( event );
	
	raycaster.setFromCamera( mouse, camera );
	
	var intersects = null;
	if(t == 'one'){ intersects = raycaster.intersectObject( obj ); } 
	else if(t == 'arr'){ intersects = raycaster.intersectObjects( obj, true ); }
	
	return intersects;
}



//----------- Math			
function localTransformPoint(dir1, qt)
{	
	return dir1.clone().applyQuaternion( qt.clone().inverse() );
}


function worldTransformPoint(dir1, dir_local)
{	
	var qt = quaternionDirection(dir1);			
	return dir_local.applyQuaternion( qt );
}


function quaternionDirection(dir1)
{
	var mx = new THREE.Matrix4().lookAt( dir1, new THREE.Vector3(0,0,0), new THREE.Vector3(0,1,0) );
	return new THREE.Quaternion().setFromRotationMatrix(mx);	
}
//----------- Math




function upUvs_4( obj )
{
	obj.updateMatrixWorld();
	var geometry = obj.geometry;
	
    geometry.faceVertexUvs[0] = [];
	var faces = geometry.faces;
	
    for (var i = 0; i < faces.length; i++) 
	{		
		var components = ['x', 'y', 'z'].sort(function(a, b) {			
			return Math.abs(faces[i].normal[a]) - Math.abs(faces[i].normal[b]);
		});	


        var v1 = geometry.vertices[faces[i].a];
        var v2 = geometry.vertices[faces[i].b];
        var v3 = geometry.vertices[faces[i].c];				

        geometry.faceVertexUvs[0].push([
            new THREE.Vector2(v1[components[0]], v1[components[1]]),
            new THREE.Vector2(v2[components[0]], v2[components[1]]),
            new THREE.Vector2(v3[components[0]], v3[components[1]])
        ]);
    }

    geometry.uvsNeedUpdate = true;
	geometry.elementsNeedUpdate = true; 
}






function deleteObj()
{
	for ( var i = 0; i < infProject.scene.obj.length; i++ )
	{
		scene.remove(infProject.scene.obj[i]); 
	}
	
	infProject.scene.obj = [];
	infProject.scene.array = { point: [], wall: [], window: [], door: [], floor: [], ceiling: [], obj: [] };
}


animate();
renderCamera();



containerF.addEventListener('contextmenu', function(event) { event.preventDefault() });
containerF.addEventListener( 'mousedown', onDocumentMouseDown, false );
containerF.addEventListener( 'mousemove', onDocumentMouseMove, false );
containerF.addEventListener( 'mouseup', onDocumentMouseUp, false );

//containerF.addEventListener( 'dblclick', onDocumentDbMouseDown2, false );


containerF.addEventListener( 'touchstart', onDocumentMouseDown, false );
containerF.addEventListener( 'touchmove', onDocumentMouseMove, false );
containerF.addEventListener( 'touchend', onDocumentMouseUp, false );

containerF.addEventListener('DOMMouseScroll', onDocumentMouseWheel, false);
containerF.addEventListener('mousewheel', onDocumentMouseWheel, false);	


document.addEventListener("keydown", function (e) 
{ 
	
	if(clickO.keys[18] && e.keyCode == 90) 	// alt + z
	{ 
		setToneMapping();
	}

	//if(e.keyCode == 66) { switchCamera3D(); } 	// b
} );

document.addEventListener("keydown", function (e) 
{ 
	clickO.keys[e.keyCode] = true;
	if(e.keyCode == 61) { zoomLoop = 'zoomIn'; }
	if(e.keyCode == 173) { zoomLoop = 'zoomOut'; }
	if(e.keyCode == 187) { zoomLoop = 'zoomIn'; }
	if(e.keyCode == 189) { zoomLoop = 'zoomOut'; }	
});

document.addEventListener("keyup", function (e) 
{ 
	clickO.keys[e.keyCode] = false;
	if(e.keyCode == 173) { zoomLoop = ''; }
	if(e.keyCode == 61) { zoomLoop = ''; }
	if(e.keyCode == 187) { zoomLoop = ''; }
	if(e.keyCode == 189) { zoomLoop = ''; }

	if(zoomLoop != '')	{ zoomLoop = ''; }
	
});

document.addEventListener("keyup", function (e) 
{ 
	clickO.keys[e.keyCode] = false;
	if(e.keyCode == 173) { zoomLoop = ''; }
	if(e.keyCode == 61) { zoomLoop = ''; }
	if(e.keyCode == 187) { zoomLoop = ''; }
	if(e.keyCode == 189) { zoomLoop = ''; }

	if(zoomLoop != '')	{ zoomLoop = ''; }
	
});





		

function EXRLoader_1(cdm)
{
	var obj = cdm.obj;
	var name = cdm.name;
		
	var exist = null;
	for ( var i = 0; i < infProject.scene.lightMap.length; i++ )
	{
		if(infProject.scene.lightMap[i].name == name) { exist = infProject.scene.lightMap[i].texture; break; }  
	}	
	
	if(exist)
	{
		obj.material.lightMap = exist;		
		//renderCamera();
	}		
}



function IMGLoader_1(cdm)
{
	var obj = cdm.obj;
	var name = cdm.name;
	
	
	var texture = null;
	for ( var i = 0; i < infProject.scene.lightMap.length; i++ )
	{
		if(infProject.scene.lightMap[i].name == name) { texture = infProject.scene.lightMap[i].texture; break; }  
	}	
	
	if(texture)
	{		
		obj.material.map = texture;
		//renderCamera();
	}
}


var objF = null;
var pathname = '';

				const pmremGenerator = new THREE.PMREMGenerator( renderer );
				pmremGenerator.compileEquirectangularShader();

$(document).ready(function () 
{ 
	var paramsString = document.location.search; // ?page=4&limit=10&sortby=desc  
	var searchParams = new URLSearchParams(paramsString);
	
	var url_2 = searchParams.get("flat");
	
	if(url_2)
	{
		var arr = url_2.split( '/' );
		
		var fname = arr[arr.length - 1];
		
		pathname = url_2.replace(fname, '');

		var url = url_2+'?v='+new Date().getTime();
	}
	else
	{
		var url = 't/flat7.json';
		pathname = 'img/2/';
	}
	
	//var url = 'https://files.planoplan.com/upload/userdata/1/31/projects/2053843/poplight/flat.json';
	//var url = 'https://files.planoplan.com/upload/userdata/1/31/projects/2051669/poplight/flat.json';

	
	loadStartSceneJson({url: url});
	
});






async function getExr_2(cdm)
{
	var url = pathname+cdm.url;
	var name = cdm.url.split( '.' )[0];
	
	var type = cdm.url.split( '.' );
	type = type[type.length - 1];
	
	let elemLoad = document.querySelector('[nameId="progress_load"]');
	
	
	if(new RegExp( 'exr' ,'i').test(type))
	{
		//console.log('exr ->', type);
		
		//if(name == 'Lightmap-4_comp_light_LM') { url = 'exr1/00.exr'; }
		
		new THREE.EXRLoader().setDataType( THREE.FloatType ).load( url, function ( texture ) 
		{		
			infProject.scene.lightMap[infProject.scene.lightMap.length] = {name: name, texture: texture, uuid: cdm.uuid};
			
			numEXR++;
			console.log('numEXR', numEXR, name, (infProject.scene.lightMap.length/jsonG.images.length)*100);
			
			if(countEXR == numEXR)
			{				
				show_loadExr_1();
			}
			
			var val = 50+((infProject.scene.lightMap.length/jsonG.images.length)*100)/2;
			elemProgressBar.style.width = val + '%';
			
			if(jsonG.images.length == infProject.scene.lightMap.length)
			{
				loadStartSceneJson_2();
			}
		},		
		function ( xhr ) 
		{
			let val = 0;
			
			if(xhr.lengthComputable)
			{
				val = Math.round( xhr.loaded / xhr.total * 100 ) + '%';
			}
			else
			{
				let total = parseInt(xhr.target.getResponseHeader('content-length'), 10);
				val = Math.round( xhr.loaded / total * 10 ) + '%';
			}
			 
			elemLoad.innerText = 'EXR ' + val;			
		});		
	}
	else
	{
		//console.log('img ->', type);
		
		let xhr = new XMLHttpRequest();
		xhr.responseType =	"blob";
		xhr.open('GET', url, true);
		//xhr.open('GET', 'img1/'+name+'.jpg', true);
		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		xhr.onreadystatechange = function() 
		{		
			if(xhr.readyState == 4 && xhr.status == 200) 
			{	
				var image = new Image();
				image.src = window.URL.createObjectURL(xhr.response);
				
				image.onload = function()
				{
					var texture = new THREE.Texture();
					texture.image = image;
					texture.wrapS = THREE.RepeatWrapping;
					texture.wrapT = THREE.RepeatWrapping;
					texture.encoding = THREE.sRGBEncoding;
					texture.needsUpdate = true;				
					
					infProject.scene.lightMap[infProject.scene.lightMap.length] = {name: name, texture: texture, uuid: cdm.uuid};
					
					numImg++;
					console.log('numImg', numImg, (infProject.scene.lightMap.length/jsonG.images.length)*100);
					
					var val = 50+((infProject.scene.lightMap.length/jsonG.images.length)*100)/2;
					elemProgressBar.style.width = val + '%';					
					
					if(countImg == numImg)
					{						
						show_loadImg_1();
					}
					
					if(jsonG.images.length == infProject.scene.lightMap.length)
					{
						loadStartSceneJson_2();
					}									
				}
			}
		}
		xhr.onprogress = function(event) 
		{
			let val = 0;
			
			if(event.lengthComputable)
			{
				val = Math.round( event.loaded / event.total * 100 ) + '%';
			}
			else
			{
				//let total = parseInt(xhr.getResponseHeader('content-length'), 10);
				//val = Math.round( event.loaded / total * 10 ) + '%';
			}
			 
			elemLoad.innerText = 'IMG ' + val;		
		}		
		xhr.send();		
	}
	
	
}

let jsonG = null;
let divProgressBar = document.querySelector('.pp-rotation__progress-container');
let elemProgressBar = document.querySelector('.pp-rotation__progress__bar');



function loadStartSceneJson(cdm)
{
	var time = new Date().getTime();
	
	deleteObj();
	
	setToneMapping({toneMapping: 'CustomToneMapping'});
	inputTransparencySubstrate({value: 0.3});
	
	let elemLoad = document.querySelector('[nameId="progress_load"]');
	
	//return;
	
	let xhr = new XMLHttpRequest();
	xhr.responseType =	"json";
	xhr.open('GET', cdm.url, true);
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xhr.onreadystatechange = function() 
	{		
		if(xhr.readyState == 4 && xhr.status == 200) 
		{				
			
			time = new Date().getTime() - time;
			time = Math.round(time/10)/100;
			jsonG = xhr.response;
			
			console.log('загрузка json', time);
			
			let divLoadJson = document.querySelector('[nameId="div_loadJson_1"]');
			divLoadJson.innerText = 'загрузки json: ' +time+'c';
		
			sdfshnjr4(jsonG);			
		}
	};
	xhr.onprogress = function(event) 
	{
		let val = 0;
		
		if(event.lengthComputable)
		{
			val = Math.round( event.loaded / event.total * 100 );
		}
		else
		{
			let total = parseInt(xhr.getResponseHeader('content-length'), 10);
			val = Math.round( event.loaded / total * 10 );
		}
		
		if(val > 100) val = 100;
		elemProgressBar.style.width = val/2 + '%';		
		elemLoad.innerText = 'Json ' + val + '%';		
	};	
	xhr.send();	
}

var timeImg = 0;
var timeEXR = 0;
var countImg = 0;
var countEXR = 0;
var numImg = 0;
var numEXR = 0;
var timeLoadTexture = 0;

function sdfshnjr4(jsonG)
{
	timeImg = new Date().getTime();
	timeEXR = new Date().getTime();
	timeLoadTexture = new Date().getTime();
	
	for(let i = 0; i < jsonG.images.length; i++)
	{
		var type = jsonG.images[i].url.split( '.' );
		type = type[type.length - 1];

		
		if(new RegExp( 'exr' ,'i').test(type))
		{			
			countEXR++;
		}
		else
		{
			countImg++;
		}
	}	
	
	console.log('countImg', countImg);
	console.log('countEXR', countEXR);
	
	for(let i = 0; i < jsonG.images.length; i++)
	{
		let url = jsonG.images[i].url;
		
		jsonG.images[i].url = '';
		
		if(url)
		{			
			getExr_2({url: url, uuid: jsonG.images[i].uuid});
		}
	}


}


function show_loadImg_1()
{
	var time = new Date().getTime() - timeImg;
	time = Math.round(time/10)/100;

	let divLoadImg = document.querySelector('[nameId="div_loadImg_1"]');
	divLoadImg.innerText = 'загрузки Img: ' +time+'c';	
}


function show_loadExr_1()
{
	var time = new Date().getTime() - timeEXR;
	time = Math.round(time/10)/100;

	let divLoadExr = document.querySelector('[nameId="div_loadExr_1"]');
	divLoadExr.innerText = 'загрузки Exr: ' +time+'c';	
}




var objPanorama = null;
var reflectionProbe = [];





async function getReflectionProbeExr(cdm)
{
	
	

	
    await Promise.all([
      new Promise((resolve, reject) => new THREE.EXRLoader().setDataType( THREE.FloatType ).load(pathname + cdm.userData.frontSide, resolve, undefined, reject)),
      new Promise((resolve, reject) => new THREE.EXRLoader().setDataType( THREE.FloatType ).load(pathname + cdm.userData.bottomSide, resolve, undefined, reject)),
      new Promise((resolve, reject) => new THREE.EXRLoader().setDataType( THREE.FloatType ).load(pathname + cdm.userData.leftSide, resolve, undefined, reject)),
      new Promise((resolve, reject) => new THREE.EXRLoader().setDataType( THREE.FloatType ).load(pathname + cdm.userData.backSide, resolve, undefined, reject)),
      new Promise((resolve, reject) => new THREE.EXRLoader().setDataType( THREE.FloatType ).load(pathname + cdm.userData.topSide, resolve, undefined, reject)),
      new Promise((resolve, reject) => new THREE.EXRLoader().setDataType( THREE.FloatType ).load(pathname + cdm.userData.rightSide, resolve, undefined, reject))
    ]).then(([frontSide, bottomSide, leftSide, backSide, topSide, rightSide]) => 
	{
		
		//const textureCube = new THREE.CubeTexture([posx.image, negx.image, posy.image, negy.image, posz.image, negz.image]);
		//textureCube.encoding = THREE.sRGBEncoding;
		//textureCube.needsUpdate = true;
		
		const textureCube = [leftSide, rightSide, topSide, bottomSide, backSide, frontSide];
		const materials = [];
		
		for ( let i = 0; i < 6; i ++ ) {

			textureCube[i].mapping = THREE.EquirectangularReflectionMapping;
			
			if(i == 2) 
			{
				textureCube[i].center = new THREE.Vector2(0.5, 0.5);
				textureCube[i].rotation = Math.PI;
				textureCube[i].needsUpdate = true;
			}
			if(i == 3) 
			{
				textureCube[i].center = new THREE.Vector2(0.5, 0.5);
				textureCube[i].rotation = Math.PI;
				textureCube[i].needsUpdate = true;
			}			
			materials.push( new THREE.MeshPhysicalMaterial( { color: 0xffffff, map: textureCube[i], lightMap: lightMap_1 } ) );

		}		
		
		console.log(materials);

		//var geometry = new THREE.SphereGeometry( 1, 32, 32 );
		var geometry = new THREE.BoxGeometry( 1, 1, 1 );
		//var material = new THREE.MeshPhysicalMaterial( {color: 0xffffff, envMap: textureCube, lightMap: lightMap_1, metalness: 1, roughness: 0 } );
		//var material = new THREE.MeshPhysicalMaterial( {color: 0xffffff, map: textureCube, lightMap: lightMap_1 } );
		var sphere = new THREE.Mesh( geometry, materials );
		sphere.position.set(cdm.n*2-1, 3, 0);
		scene.add( sphere );

		renderCamera();	  
	
	});
	
	


	
//frontSide	"ReflectionProbe-0_front.exr"
//uuidImage	"31F3B5C4-31E3-4E38-9B16-4A632BB16F6D"
//bottomSide	"ReflectionProbe-0_bottom.exr"
//leftSide	"ReflectionProbe-0_left.exr"
//backSide	"ReflectionProbe-0_back.exr"
//direction	{…}
//IsReflectionProbe	true
//topSide	"ReflectionProbe-0_top.exr"
//rightSide	"ReflectionProbe-0_right.exr"
}


function getTexturesFromAtlasFile( imageObj, tilesNum ) 
{

	const textures = [];

	for ( let i = 0; i < tilesNum; i ++ ) {

		textures[ i ] = new THREE.Texture();

	}

	
	const tileWidth = imageObj.height;

	for ( let i = 0; i < textures.length; i ++ ) 
	{

		var canv = document.createElement( 'canvas' );
		var context = canv.getContext( '2d' );
		canv.height = tileWidth;
		canv.width = tileWidth;
		context.drawImage( imageObj, tileWidth * i, 0, tileWidth, tileWidth, 0, 0, tileWidth, tileWidth );
		textures[ i ].image = canv;
		textures[ i ].needsUpdate = true;

	}


	return textures;

}
			


async function loadStartSceneJson_2()
{
	let divLoad = document.querySelector('[nameId="loader"]');
	let elemLoad = document.querySelector('[nameId="progress_load"]');	
	
	
	timeLoadTexture = new Date().getTime() - timeLoadTexture;
	timeLoadTexture = Math.round(timeLoadTexture/10)/100;
	console.log('загрузка текстур и lightMap', timeLoadTexture);	
	
	var timeJsonParse = new Date().getTime();
	
	let obj = new THREE.ObjectLoader().parse( jsonG );
	
	timeJsonParse = new Date().getTime() - timeJsonParse;
	timeJsonParse = Math.round(timeJsonParse/10)/100;
	console.log('parse json', timeJsonParse);
			
	var timeScene_1 = new Date().getTime();
	
	{ 
		scene.add( obj );
		changeCamera(camera3D);
		
		objF = obj;
		
		infProject.scene.obj = [objF];
		
		getBoundObject_1({obj: obj});
		
		obj.traverse(function(child) 
		{
			if(new RegExp( 'VrayEnv_Panorama_unlit' ,'i').test( child.name ))
			{
				//child.visible = false;
			
				var color = child.material.color;
				var map = child.material.map;
				
				map.encoding =  THREE.LinearEncoding;
				map.needsUpdate = true;
				disposeNode(child);
				
				objPanorama = child;
				child.material = new THREE.MeshBasicMaterial({ color: color, map: map, lightMap: lightMap_1 });
				child.material.toneMapped = false;
				child.material.needsUpdate = true;
				objPanorama.visible = false;
				//console.log(child.material);
			}
			
			if(child.type == 'Group')
			{
				if(new RegExp( 'ReflectionProbe' ,'i').test( child.name ))
				{
					var n = reflectionProbe.length;
					reflectionProbe[n] = {};
					
				for ( var i2 = 0; i2 < infProject.scene.lightMap.length; i2++ )
				{
					if(child.userData.uuidImage == infProject.scene.lightMap[i2].uuid)
					{
						infProject.scene.lightMap[i2].texture.mapping = THREE.EquirectangularReflectionMapping;
						//infProject.scene.lightMap[i2].texture.mapping = THREE.CubeRefractionMapping;
						infProject.scene.lightMap[i2].texture.needsUpdate = true;						
						reflectionProbe[n].texture = infProject.scene.lightMap[i2].texture;
						
						break;
					}
				}					
	
var cubeT = getReflectionProbeExr({userData: child.userData, n: n});
	
if(1==2)
{
	//var cubeT = getReflectionProbeExr({userData: child.userData, n: n});
	var textureCube = getTexturesFromAtlasFile( reflectionProbe[n].texture, 6 );
	
var geometry = new THREE.SphereGeometry( 1, 32, 32 );
//var material = new THREE.MeshPhysicalMaterial( {color: 0xffffff, envMap: textureCube, lightMap: lightMap_1, metalness: 1, roughness: 0 } );
var material = new THREE.MeshPhysicalMaterial( {color: 0xffffff, map: textureCube, lightMap: lightMap_1 } );
var sphere = new THREE.Mesh( geometry, material );
sphere.position.set(n*2-1, 3, 0);
scene.add( sphere );						

}	

					
				}
				
				if(new RegExp( 'HiddenObject' ,'i').test( child.name ))
				{					
					wallVisible[wallVisible.length] = child;
					
					child.userData.wall = {};
					child.userData.wall.show = true;
					
					let dir = new THREE.Vector3(child.userData.direction.x, child.userData.direction.y, child.userData.direction.z); 
					
					child.userData.direction = dir; 
				}
				
			}
			
			if(new RegExp( 'Plita' ,'i').test( child.name ))
			{
				plitaVisible[plitaVisible.length] = child;
			}
			else if(child.userData.hideInWalk)
			{
				plitaVisible[plitaVisible.length] = child;
			}
			
			if(new RegExp( 'massive_nero' ,'i').test( child.name ))
			{
				objCeilVisible[objCeilVisible.length] = child;
			}
			else if(new RegExp( 'render_1533460906' ,'i').test( child.name ))
			{
				objCeilVisible[objCeilVisible.length] = child;
			}				
			else if(child.userData.snappedToCeil)
			{
				objCeilVisible[objCeilVisible.length] = child;
			}			
			
			if(child.material)
			{
				var userData = {};
				
				if(child.material.map)
				{
					IMGLoader_1({obj: child, name: child.material.map.name});
				}
				if(child.material.lightMap)
				{
					EXRLoader_1({obj: child, name: child.material.lightMap.name});
				}

				userData.opacity = child.material.opacity;									
				child.material.userData = userData;
				
				if(/illum/i.test( child.material.name ) && 1==1) 
				{
					let m1 = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0, roughness: 1 });
					m1.userData = userData;
					m1.map = child.material.map;
					m1.lightMap = lightMap_1;
					m1.opacity = child.material.opacity;
					
					child.material = m1;
					child.material.needsUpdate = true;
				}				
			}
		});
		
		timeScene_1 = new Date().getTime() - timeScene_1;
		timeScene_1 = Math.round(timeScene_1/10)/100;
		console.log('настройка сцены', timeScene_1);		
		
		
		var timeMaterial = new Date().getTime();
		
		obj.traverse(function(child) 
		{
			if(child.isMesh) 
			{ 		
				if(child.material)
				{					
					setMatSetting_2({obj: child})
				}							
			}
		});
		

		for ( var i = 0; i < arrFloor.length; i++ )
		{
			//console.log(i, arrFloor[i].o.name);
			//await 
			setMatSetting_3({obj: arrFloor[i].o, pos: arrFloor[i].pos})		
		}	

		
		timeMaterial = new Date().getTime() - timeMaterial;
		timeMaterial = Math.round(timeMaterial/10)/100;
		console.log('назначение материалов', timeMaterial);		

		if(1==1)
		{
			let cubeRenderTarget = new THREE.WebGLCubeRenderTarget( 512, { generateMipmaps: true, minFilter: THREE.LinearMipmapLinearFilter } );
			gCubeCam = new THREE.CubeCamera(0.1, 100, cubeRenderTarget);
			gCubeCam.position.y = 1;
			//cubeRenderTarget.format = THREE.RGBFormat;
			gCubeCam.update( renderer, scene );
		}
		
		var timeCubeCam = new Date().getTime();
		
		var ss = 0;
		for ( var i = 0; i < arrObj.length; i++ )
		{
			if(arrObj[i].o.material.userData.envMap)
			{

				for ( var i2 = 0; i2 < infProject.scene.lightMap.length; i2++ )
				{
					//if(child.userData == infProject.scene.lightMap[i2])
				}
			
				if(1==2)
				{
					//console.log(arrObj[i].o.material.name);
					var size = 64;
					var mirror = false;
					if(new RegExp( 'mirror' ,'i').test( arrObj[i].o.material.name )){ mirror = true; size = 1024; }
					
					let cubeRenderTarget_2 = new THREE.WebGLCubeRenderTarget( size, { generateMipmaps: true, minFilter: THREE.LinearMipmapLinearFilter } );
					let gCubeCam_2 = new THREE.CubeCamera(0.1, 10, cubeRenderTarget_2);
					gCubeCam_2.position.copy(arrObj[i].pos);
					gCubeCam_2.update( renderer, scene );

					arrObj[i].o.material.envMap = gCubeCam_2.renderTarget.texture;
					arrObj[i].o.material.needsUpdate = true;
					
					if(mirror)
					{
										
					}					
				}
			}
		}
		
		timeCubeCam = new Date().getTime() - timeCubeCam;
		timeCubeCam = Math.round(timeCubeCam/10)/100;
		console.log('создание и назначение CubeCam', timeCubeCam);		
		
		if(1==2)
		{
			obj.traverse(function(child) 
			{
				if(child.isMesh) 
				{ 		
					if(child.material)
					{
						if(child.material.userData.envMap) child.material.envMap = gCubeCam_2.renderTarget.texture;
						child.material.needsUpdate = true;
					}							
				}
			});				
		}
		
		if(1==2)
		{
			var geometry = new THREE.PlaneBufferGeometry( 10, 10 );
			
			var verticalMirror = new THREE.Reflector( geometry, {
				clipBias: 0.003,
				textureWidth: window.innerWidth * window.devicePixelRatio,
				textureHeight: window.innerHeight * window.devicePixelRatio,
				color: 0x889999
			});		

			//verticalMirror.position.copy(child.position);
			verticalMirror.position.y = 0.2;
			verticalMirror.rotateX( - Math.PI / 2 );
			//verticalMirror.rotation.x = Math.PI;
			//verticalMirror.rotation.copy(child.rotation);
			
			//child.visible = false;
			scene.add( verticalMirror );
			
		}
		
		divProgressBar.style.display = "none";		
		divLoad.style.display = "none";
		wallAfterRender_3();
		let divTriangles = document.querySelector('[nameId="div_triangles_1"]');
		divTriangles.innerText = 'triangles: ' +renderer.info.render.triangles;
		
		let divCountMesh = document.querySelector('[nameId="div_countMesh_1"]');
		divCountMesh.innerText = 'mesh: ' +renderer.info.memory.geometries;
		
		let divCountTexture = document.querySelector('[nameId="div_countTexture_1"]');
		divCountTexture.innerText = 'textures: ' +jsonG.images.length;		

		let divCountMaterial = document.querySelector('[nameId="div_countMaterial_1"]');
		divCountMaterial.innerText = 'material: ' +jsonG.materials.length;
		
		
		showHideObjCeil();
		renderCamera();
		
		$('[nameId="butt_camera_3D"]').hide(); 
		$('[nameId="butt_camera_2D"]').show();
		$('[nameId="butt_cam_walk"]').show();
		
	}	
}






// меняем тип ToneMapping
function setToneMapping(cdm)
{	

	if(cdm.toneMapping == 'NoToneMapping')
	{
		renderer.toneMapping = THREE.NoToneMapping; 
	}	
	else if(cdm.toneMapping == 'LinearToneMapping')
	{
		renderer.toneMapping = THREE.LinearToneMapping;
	}
	else if(cdm.toneMapping == 'ReinhardToneMapping')
	{
		renderer.toneMapping = THREE.ReinhardToneMapping;
	}
	else if(cdm.toneMapping == 'CineonToneMapping')
	{
		renderer.toneMapping = THREE.CineonToneMapping;
	}
	else if(cdm.toneMapping == 'ACESFilmicToneMapping')
	{
		renderer.toneMapping = THREE.ACESFilmicToneMapping;
	}
	else if(cdm.toneMapping == 'CustomToneMapping')
	{
		renderer.toneMapping = THREE.CustomToneMapping;
	}	
	else 
	{
		return;
	}
	
	if(!objF) return;
	
	var obj = objF;
	
	obj.traverse(function(child) 
	{
		if(child.isMesh) 
		{ 	
			if(child.material)
			{
				child.material.needsUpdate = true;
			}							
		}
	});	
	
	console.log(renderer.toneMapping);
	renderCamera();	
}





// установить яркость toneMapping
function inputTransparencySubstrate(cdm)
{
	var value = cdm.value;
	
	renderer.toneMappingExposure = value;					
	
	$('[nameId="input_toneMapping"]').val(value);
	$('[nameId="value_toneMapping"]').text('toneMapping '+ value);
	
	renderCamera();	
}


//(5.3 * x^2 + 0.104 * x) / (5.184 * x^2 + 4.052 * x + 0.362)

//((5.3 * x)*(5.3 * x) + 0.104 * x) / ((5.184 * x)*(5.184 * x) + 4.052 * x + 0.362)

THREE.ShaderChunk.tonemapping_pars_fragment = THREE.ShaderChunk.tonemapping_pars_fragment.replace(
	'vec3 CustomToneMapping( vec3 color ) { return color; }',
	`#define Uncharted2Helper( x ) max( ((5.3 * x)*(5.3 * x) + 0.104 * x) / ((5.184 * x)*(5.184 * x) + 4.052 * x + 0.362), vec3( 0.0 ) )
	float toneMappingWhitePoint = 1.0;
	vec3 CustomToneMapping( vec3 color ) {
		color *= toneMappingExposure;
		return saturate( Uncharted2Helper( color ) / Uncharted2Helper( vec3( toneMappingWhitePoint ) ) );
	}`
);






function disposeNode(node) 
{
	if (node instanceof THREE.Mesh) 
	{
		if (node.geometry) { node.geometry.dispose(); }
		
		if (node.material) 
		{
			var materialArray = [];
			
			if(node.material instanceof Array) { materialArray = node.material; }
			else { materialArray = [node.material]; }
			
			materialArray.forEach(function (mtrl, idx) 
			{
				if (mtrl.map) mtrl.map.dispose();
				if (mtrl.lightMap) mtrl.lightMap.dispose();
				if (mtrl.bumpMap) mtrl.bumpMap.dispose();
				if (mtrl.normalMap) mtrl.normalMap.dispose();
				if (mtrl.specularMap) mtrl.specularMap.dispose();
				if (mtrl.envMap) mtrl.envMap.dispose();
				mtrl.dispose();
			});
		}
	}
}






var arrFloor = [];
var arrObj = [];

function getBoundObject_1(cdm)
{
	var obj = cdm.obj;
	
	if(!obj) return;
	
	var arr = [];
	
	obj.updateMatrixWorld(true);
	
	obj.traverse(function(child) 
	{
		if (child instanceof THREE.Mesh)
		{
			if(child.geometry) 
			{ 
				//if(new RegExp( 'floor' ,'i').test( child.name )){ arr[arr.length] = child; }
				//if(new RegExp( 'ceil' ,'i').test( child.name )){ arr[arr.length] = child; }
				if(new RegExp( 'VrayEnv_Panorama_unlit' ,'i').test( child.name )){}
				else { arr[arr.length] = child; }
				
			}
		}
	});	

	//scene.updateMatrixWorld();
	
	var v = [];
	
	for ( var i = 0; i < arr.length; i++ )
	{		
		arr[i].geometry.computeBoundingBox();	
		arr[i].geometry.computeBoundingSphere();

		let bound = arr[i].geometry.boundingBox;
		
		//console.log(111111, arr[i], bound);

		v[v.length] = new THREE.Vector3(bound.min.x, bound.min.y, bound.max.z).applyMatrix4( arr[i].matrixWorld );
		v[v.length] = new THREE.Vector3(bound.max.x, bound.min.y, bound.max.z).applyMatrix4( arr[i].matrixWorld );
		v[v.length] = new THREE.Vector3(bound.min.x, bound.min.y, bound.min.z).applyMatrix4( arr[i].matrixWorld );
		v[v.length] = new THREE.Vector3(bound.max.x, bound.min.y, bound.min.z).applyMatrix4( arr[i].matrixWorld );

		v[v.length] = new THREE.Vector3(bound.min.x, bound.max.y, bound.max.z).applyMatrix4( arr[i].matrixWorld );
		v[v.length] = new THREE.Vector3(bound.max.x, bound.max.y, bound.max.z).applyMatrix4( arr[i].matrixWorld );
		v[v.length] = new THREE.Vector3(bound.min.x, bound.max.y, bound.min.z).applyMatrix4( arr[i].matrixWorld );
		v[v.length] = new THREE.Vector3(bound.max.x, bound.max.y, bound.min.z).applyMatrix4( arr[i].matrixWorld );

		
		var pos = arr[i].geometry.boundingSphere.center.clone().applyMatrix4( arr[i].matrixWorld );
		
		if(new RegExp( 'floor' ,'i').test( arr[i].name ))
		{
			arrFloor[arrFloor.length] = {o: arr[i], name: arr[i].name, pos: pos};
		}
		else
		{
			arrObj[arrObj.length] = {o: arr[i], name: arr[i].name, pos: pos};
		}
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
	
	var offset = new THREE.Vector3(-((bound.max.x - bound.min.x)/2 + bound.min.x), 0, -((bound.max.z - bound.min.z)/2 + bound.min.z));
	obj.position.copy(offset);
	
	for ( var i = 0; i < arrFloor.length; i++ )
	{
		arrFloor[i].pos.add(offset);		
	}
	
	for ( var i = 0; i < arrObj.length; i++ )
	{
		arrObj[i].pos.add(offset);		
	}	
	
	boundG = bound;
}

var boundG = null;







function createOneCubeCam_2(cdm)
{
	let cubeRenderTarget = new THREE.WebGLCubeRenderTarget( 512, { format: THREE.RGBFormat, generateMipmaps: true, minFilter: THREE.LinearMipmapLinearFilter } );
	let cubeCam = new THREE.CubeCamera(0.1, 100, cubeRenderTarget);
	cubeCam.position.y = 0;
	cubeCam.position.copy(cdm.pos);
	cubeCam.update( renderer, scene );
	
	return cubeCam;
}





function setMatSetting_2(cdm)
{
	
	let obj = cdm.obj;
	let name = obj.material.name;
	
	if(!obj) return;
	
	if(new RegExp( 'floor' ,'i').test( obj.name )) return;

	let list = [];
	
	list[list.length] = {old: 'mattet', new: 'tulle', metalness: 0, roughness: 1, opacity: 1, transmission: 0.0};
	list[list.length] = {old: 'matte', new: 'matt', metalness: 0, roughness: 1, opacity: 1, transmission: 0 };
	list[list.length] = {old: 'satin', new: 'semimatt', metalness: 0.19, roughness: 0.2, opacity: 1, transmission: 0, envMap: true};
	list[list.length] = {old: 'semigloss', new: 'semiglossy', metalness: 0.59, roughness: 0.15, opacity: 1, transmission: 0, envMap: true};
	list[list.length] = {old: 'glossy', new: 'glossy', metalness: 0.6, roughness: 0.1, opacity: 1, transmission: 0, envMap: true};
	list[list.length] = {old: 'reflective', new: 'reflective', metalness: 1, roughness: 0.0, opacity: 1, transmission: 0, envMap: true};
	list[list.length] = {old: 'brushed', new: 'brushed', metalness: 0.33, roughness: 0.23, opacity: 1, transmission: 0, envMap: true};
	list[list.length] = {old: 'polished', new: 'polished', metalness: 0.7, roughness: 0.1, opacity: 1, transmission: 0, envMap: true};
	list[list.length] = {old: 'chrome', new: 'chrome', metalness: 1.0, roughness: 0, opacity: 1, transmission: 0, envMap: true};
	list[list.length] = {old: 'mirror', new: 'mirror', metalness: 1, roughness: 0, opacity: 1, transmission: 0, envMap: true};
	list[list.length] = {old: 'glass', new: 'glass', metalness: 1, roughness: 0, opacity: 1, transmission: 0.9, envMap: true};
	list[list.length] = {old: 'steklo_blur', new: 'frostedglass', metalness: 0.8, roughness: 0.15, opacity: 1, transmission: 0.6, envMap: true};	
	
	
	for ( var i = 0; i < list.length; i++ )
	{		
		if(new RegExp( list[i].old ,'i').test( name ))
		{	 

			//console.log(list[i], name);
			
			let color = obj.material.color;
			let map = obj.material.map;
			let lightMap = obj.material.lightMap;
			let userData = obj.material.userData;
			
			//console.log(obj.material.envMap);
			
			disposeNode(obj);
			
			obj.material = new THREE.MeshPhysicalMaterial({ color: color, transparent: true, map: map, lightMap: lightMap });
			obj.material.name = list[i].old;
			
			obj.material.userData = userData;

			obj.material.metalness = list[i].metalness;
			obj.material.roughness = list[i].roughness;
			obj.material.opacity = list[i].opacity;
			obj.material.transmission = list[i].transmission;
			

			if(list[i].envMap) 
			{ 
				obj.material.userData.envMap = true;
				//obj.material.envMap = gCubeCam.renderTarget.texture;
			}

			
			obj.material.needsUpdate = true;
			renderCamera();	
			
			break;
		}
	}	
	
}



async function setMatSetting_3(cdm)
{
	
	let obj = cdm.obj;
	let name = obj.material.name;
	
	if(!obj) return;
	
	console.log('xz', obj.name, obj.material.name);
	let color = obj.material.color;
	let map = obj.material.map;
	let lightMap = obj.material.lightMap;
	let userData = obj.material.userData;
	
	disposeNode(obj);
	
	let list = [];
	
	list[list.length] = {old: 'mattet', new: 'tulle', metalness: 0, roughness: 1, opacity: 1, transmission: 0.69, envMap: true};
	//list[list.length] = {old: 'matte', new: 'matt', metalness: 0, roughness: 1, opacity: 1, transmission: 0 };
	list[list.length] = {old: 'satin', new: 'semimatt', metalness: 0.19, roughness: 0.2, opacity: 1, transmission: 0, envMap: true};
	list[list.length] = {old: 'semigloss', new: 'semiglossy', metalness: 0.59, roughness: 0.15, opacity: 1, transmission: 0, envMap: true};
	list[list.length] = {old: 'glossy', new: 'glossy', metalness: 0.6, roughness: 0.1, opacity: 1, transmission: 0, envMap: true};
	list[list.length] = {old: 'reflective', new: 'reflective', metalness: 1, roughness: 0.0, opacity: 1, transmission: 0, envMap: true};
	list[list.length] = {old: 'brushed', new: 'brushed', metalness: 0.33, roughness: 0.23, opacity: 1, transmission: 0, envMap: true};
	list[list.length] = {old: 'polished', new: 'polished', metalness: 0.7, roughness: 0.1, opacity: 1, transmission: 0, envMap: true};
	list[list.length] = {old: 'chrome', new: 'chrome', metalness: 1.0, roughness: 0, opacity: 1, transmission: 0, envMap: true};
	list[list.length] = {old: 'mirror', new: 'mirror', metalness: 1, roughness: 0, opacity: 1, transmission: 0, envMap: true};
	list[list.length] = {old: 'glass', new: 'glass', metalness: 1, roughness: 0, opacity: 0.84, transmission: 1, envMap: true};
	list[list.length] = {old: 'steklo_blur', new: 'frostedglass', metalness: 0.45, roughness: 0.26, opacity: 1, transmission: 1, envMap: true};	
	

	for ( var i = 0; i < list.length; i++ )
	{		
		if(new RegExp( list[i].old ,'i').test( name ))
		{	 

			//console.log(list[i], obj.name);
			
			let color = obj.material.color;
			let map = obj.material.map;
			let lightMap = obj.material.lightMap;
			let userData = obj.material.userData;
			
			disposeNode(obj);
			
			obj.material = new THREE.MeshPhysicalMaterial({ color: color, transparent: true, map: map, lightMap: lightMap });
			//obj.material.name = list[i].new;
			
			obj.material.userData = userData;

			obj.material.metalness = list[i].metalness;
			obj.material.roughness = list[i].roughness;
			obj.material.opacity = list[i].opacity;
			obj.material.transmission = list[i].transmission;
			

			//obj.material.metalness = 0.99;
			//obj.material.roughness = 0;	

			var camCub_2 = createOneCubeCam_2({pos: cdm.pos});
			
			obj.material.envMap = camCub_2.renderTarget.texture;
			//camCub_2.renderTarget.texture.encoding = THREE.sRGBEncoding;
			//camCub_2.renderTarget.texture.needsUpdate = true;

					
			//console.log('boundingSphere', obj.geometry.boundingSphere);
			obj.material.onBeforeCompile = function ( shader ) 
			{
				var bound = obj.geometry.boundingBox;  
				//these parameters are for the cubeCamera texture
				
				shader.uniforms.cubeMapSize = { value: new THREE.Vector3( bound.max.x - bound.min.x, 18, bound.max.z - bound.min.z ) };
				shader.uniforms.cubeMapPos = { value: cdm.pos };

				//replace shader chunks with box projection chunks
				shader.vertexShader = 'varying vec3 vWorldPosition;\n' + shader.vertexShader;

				shader.vertexShader = shader.vertexShader.replace(
					'#include <worldpos_vertex>',
					worldposReplace
				);

				shader.fragmentShader = shader.fragmentShader.replace(
					'#include <envmap_physical_pars_fragment>',
					envmapPhysicalParsReplace
				);
			};							
			
			obj.material.needsUpdate = true;
			renderCamera();	
			
			break;
		}
	}
	

	
	obj.material.needsUpdate = true;
	renderCamera();	
	
	
}









			// shader injection for box projected cube environment mapping
			var worldposReplace = `
			#define BOX_PROJECTED_ENV_MAP

			#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP )

				vec4 worldPosition = modelMatrix * vec4( transformed, 1.0 );

				#ifdef BOX_PROJECTED_ENV_MAP

					vWorldPosition = worldPosition.xyz;

				#endif

			#endif
			`;

			var envmapPhysicalParsReplace = `
			#if defined( USE_ENVMAP )

				#define BOX_PROJECTED_ENV_MAP

				#ifdef BOX_PROJECTED_ENV_MAP

					uniform vec3 cubeMapSize;
					uniform vec3 cubeMapPos;
					varying vec3 vWorldPosition;

					vec3 parallaxCorrectNormal( vec3 v, vec3 cubeSize, vec3 cubePos ) {

						vec3 nDir = normalize( v );
						vec3 rbmax = ( .5 * cubeSize + cubePos - vWorldPosition ) / nDir;
						vec3 rbmin = ( -.5 * cubeSize + cubePos - vWorldPosition ) / nDir;

						vec3 rbminmax;
						rbminmax.x = ( nDir.x > 0. ) ? rbmax.x : rbmin.x;
						rbminmax.y = ( nDir.y > 0. ) ? rbmax.y : rbmin.y;
						rbminmax.z = ( nDir.z > 0. ) ? rbmax.z : rbmin.z;

						float correction = min( min( rbminmax.x, rbminmax.y ), rbminmax.z );
						vec3 boxIntersection = vWorldPosition + nDir * correction;

						return boxIntersection - cubePos;
					}

				#endif

				#ifdef ENVMAP_MODE_REFRACTION
					uniform float refractionRatio;
				#endif

				vec3 getLightProbeIndirectIrradiance( /*const in SpecularLightProbe specularLightProbe,*/ const in GeometricContext geometry, const in int maxMIPLevel ) {

					vec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );

					#ifdef ENVMAP_TYPE_CUBE

						#ifdef BOX_PROJECTED_ENV_MAP

							worldNormal = parallaxCorrectNormal( worldNormal, cubeMapSize, cubeMapPos );

						#endif

						vec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );

						// TODO: replace with properly filtered cubemaps and access the irradiance LOD level, be it the last LOD level
						// of a specular cubemap, or just the default level of a specially created irradiance cubemap.

						#ifdef TEXTURE_LOD_EXT

							vec4 envMapColor = textureCubeLodEXT( envMap, queryVec, float( maxMIPLevel ) );

						#else

							// force the bias high to get the last LOD level as it is the most blurred.
							vec4 envMapColor = textureCube( envMap, queryVec, float( maxMIPLevel ) );

						#endif

						envMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;

					#elif defined( ENVMAP_TYPE_CUBE_UV )

						vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );

					#else

						vec4 envMapColor = vec4( 0.0 );

					#endif

					return PI * envMapColor.rgb * envMapIntensity;

				}

				// Trowbridge-Reitz distribution to Mip level, following the logic of http://casual-effects.blogspot.ca/2011/08/plausible-environment-lighting-in-two.html
				float getSpecularMIPLevel( const in float roughness, const in int maxMIPLevel ) {

					float maxMIPLevelScalar = float( maxMIPLevel );

					float sigma = PI * roughness * roughness / ( 1.0 + roughness );
					float desiredMIPLevel = maxMIPLevelScalar + log2( sigma );

					// clamp to allowable LOD ranges.
					return clamp( desiredMIPLevel, 0.0, maxMIPLevelScalar );

				}

				vec3 getLightProbeIndirectRadiance( /*const in SpecularLightProbe specularLightProbe,*/ const in vec3 viewDir, const in vec3 normal, const in float roughness, const in int maxMIPLevel ) {

					#ifdef ENVMAP_MODE_REFLECTION

						vec3 reflectVec = reflect( -viewDir, normal );

						// Mixing the reflection with the normal is more accurate and keeps rough objects from gathering light from behind their tangent plane.
						reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );

					#else

						vec3 reflectVec = refract( -viewDir, normal, refractionRatio );

					#endif

					reflectVec = inverseTransformDirection( reflectVec, viewMatrix );

					float specularMIPLevel = getSpecularMIPLevel( roughness, maxMIPLevel );

					#ifdef ENVMAP_TYPE_CUBE

						#ifdef BOX_PROJECTED_ENV_MAP
							reflectVec = parallaxCorrectNormal( reflectVec, cubeMapSize, cubeMapPos );
						#endif

						vec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );

						#ifdef TEXTURE_LOD_EXT

							vec4 envMapColor = textureCubeLodEXT( envMap, queryReflectVec, specularMIPLevel );

						#else

							vec4 envMapColor = textureCube( envMap, queryReflectVec, specularMIPLevel );

						#endif

						envMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;

					#elif defined( ENVMAP_TYPE_CUBE_UV )

						vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );

					#elif defined( ENVMAP_TYPE_EQUIREC )

						vec2 sampleUV;
						sampleUV.y = asin( clamp( reflectVec.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
						sampleUV.x = atan( reflectVec.z, reflectVec.x ) * RECIPROCAL_PI2 + 0.5;

						#ifdef TEXTURE_LOD_EXT

							vec4 envMapColor = texture2DLodEXT( envMap, sampleUV, specularMIPLevel );

						#else

							vec4 envMapColor = texture2D( envMap, sampleUV, specularMIPLevel );

						#endif

						envMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;

					#elif defined( ENVMAP_TYPE_SPHERE )

						vec3 reflectView = normalize( ( viewMatrix * vec4( reflectVec, 0.0 ) ).xyz + vec3( 0.0,0.0,1.0 ) );

						#ifdef TEXTURE_LOD_EXT

							vec4 envMapColor = texture2DLodEXT( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );

						#else

							vec4 envMapColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );

						#endif

						envMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;

					#endif

					return envMapColor.rgb * envMapIntensity;
				}
			#endif
			`;

