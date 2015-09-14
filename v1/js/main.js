var container;
var scene, renderer, camera;
var mouseX = 0, mouseY = 0, mx = 0, my = 0, flymouse = new THREE.Vector2();
var time = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var butterfly;
var start = Date.now(); 
var renderSize = {w:0, h:0};
var butterflies = [];
init();
animate();
    
function init() {

    renderSize.w = window.innerWidth;
    renderSize.h = window.innerHeight;
    
    camera = new THREE.PerspectiveCamera(45, renderSize.w / renderSize.h, 1, 100000);
    camera.position.set(0,0,4);
    controls = new THREE.OrbitControls(camera);
    
    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer( {alpha: true, antialias: true} );
    renderer.setSize( renderSize.w, renderSize.h );
    // renderer.setClearColor(0xffffff);
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.physicallyBasedShading = true;
    
    container = document.getElementById( 'container' );
    container.appendChild( renderer.domElement );
    
    window.addEventListener( 'resize', onWindowResize, false );

    initCharacter();
}
function initCharacter(){
    var loader = new THREE.JSONLoader();
    loader.load( 'js/butterfly3.json', function( geometry, materials ) {
        for(var i = 0; i < 10; i++){
            var butterfly = new Butterfly(i);
            butterfly.init(geometry);      
            butterflies.push(butterfly);      
        }
    });
}
function map(value,max,minrange,maxrange) {
    return ((max-value)/(max))*(maxrange-minrange)+minrange;
}
    
function onWindowResize( event ) {
    renderSize.w = window.innerWidth;
    renderSize.h = window.innerHeight;

    windowHalfX = renderSize.w / 2;
    windowHalfY = renderSize.h / 2;

    renderer.setSize( renderSize.w, renderSize.h );
    camera.aspect = renderSize.w/renderSize.h;
    camera.updateProjectionMatrix();
}

function animate() {
    requestAnimationFrame( animate );
    render();
}

function render() {
    for(var i = 0; i < butterflies.length; i++){
        butterflies[i].update();        
    }
    renderer.render( scene, camera );
}