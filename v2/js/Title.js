var clock = new THREE.Clock();

function Title(INDEX){
    this.mesh,this.mat;
    this.texture = THREE.ImageUtils.loadTexture("img/matcap3.jpg")
    var path = "img/studio1/";
    var format = '.png';
    var urls = [
        path + 'px' + format, path + 'nx' + format,
        path + 'py' + format, path + 'ny' + format,
        path + 'pz' + format, path + 'nz' + format
    ];
    this.textureCube = THREE.ImageUtils.loadTextureCube( urls );
    this.textureCube.minFilter = this.textureCube.magFilter = THREE.NearestFilter;

    this.update = function(){
        var delta = clock.getDelta();
        THREE.AnimationHandler.update( delta );
        this.mesh.rotation.y += 0.01;
    }

    
     this.init = function(GEO){
        if(!this.mesh)this.initMesh(GEO);
    }
    this.initMesh = function(GEO){
        this.mat = new THREE.MeshBasicMaterial({
            envMap: this.textureCube,
            refractionRatio: 0.9,
            reflectivity: 1.0,
            shading: THREE.FlatShading,
            side: 2
        })

        // this.mesh = new THREE.SkinnedMesh( GEO, this.mat );
        // this.mesh.visible = true;
        // this.mesh.position.set(Math.random()*10,Math.random()*10,Math.random()*10);
        // this.mesh.rotation.set(0,Math.random()*Math.PI*2.0,0);
        // scene.add(this.mesh);  
        this.mesh = new THREE.Mesh(GEO, this.mat);
        this.mesh.scale.set(100,100,100);
        scene.add(this.mesh);
    }
}
