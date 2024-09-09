let scene, camera, renderer, cube, controls;

function init() {
    // create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);  // white

    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 10; // increased initial distance

    // create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('model-container').appendChild(renderer.domElement);

    // add OrbitControls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 2;

    // load the model (must be .glb)
    const loader = new THREE.GLTFLoader();
    loader.load(
        'models/cube.glb',  // path to mdoel file
        function (gltf) {
            cube = gltf.scene;
            scene.add(cube);
            
            // center the model
            const box = new THREE.Box3().setFromObject(cube);
            const center = box.getCenter(new THREE.Vector3());
            cube.position.sub(center);
            
            // adjust camera to fit the model
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const fov = camera.fov * (Math.PI / 180);
            let cameraZ = Math.abs(maxDim / 2 * Math.tan(fov * 2));
            
            // set camera position further out
            camera.position.z = cameraZ * 5.7; // increased multiplier for more zoom out
            
            // update the controls
            controls.maxDistance = cameraZ * 10;
            controls.target.copy(center);
            controls.update();
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.error('An error happened', error);
        }
    );

    // add lights
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // start animation
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

// handle window resizing
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

// init 3D viewer when the page loads
window.onload = init;