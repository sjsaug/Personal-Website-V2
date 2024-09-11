let scene, camera, renderer, controls;
let raycaster, mouse;
let projectsCube, libraryCube;

function init() {
    // create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);  // white

    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 15; // increased initial distance

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

    // add raycaster for mouse interaction
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    renderer.domElement.addEventListener('click', onMouseClick, false);

    // load the models
    const loader = new THREE.GLTFLoader();
    
    // Load projects cube
    loader.load(
        'models/projectscube.glb',
        function (gltf) {
            projectsCube = gltf.scene;
            projectsCube.position.set(-2.5, 0, 0); // Position on the left, closer to center
            scene.add(projectsCube);
            checkAllModelsLoaded();
        },
        function (xhr) {
            console.log('Projects cube ' + (xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.error('An error happened', error);
        }
    );

    // Load library cube
    loader.load(
        'models/librarycube.glb',
        function (gltf) {
            libraryCube = gltf.scene;
            libraryCube.position.set(2.5, 0, 0); // Position on the right, closer to center
            scene.add(libraryCube);
            checkAllModelsLoaded();
        },
        function (xhr) {
            console.log('Library cube ' + (xhr.loaded / xhr.total * 100) + '% loaded');
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

function checkAllModelsLoaded() {
    if (projectsCube && libraryCube) {
        // Both models are loaded, adjust camera
        const box = new THREE.Box3().setFromObject(scene);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        let cameraZ = Math.abs(maxDim / 2 * Math.tan(fov * 2));

        camera.position.z = cameraZ * 1.2; // Slightly reduced to account for closer cubes

        controls.maxDistance = cameraZ * 10;
        controls.target.copy(center);
        controls.update();
    }
}

function onMouseClick(event) {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // calculate objects intersecting the picking ray
    const intersectsProjects = raycaster.intersectObject(projectsCube, true);
    const intersectsLibrary = raycaster.intersectObject(libraryCube, true);

    if (intersectsProjects.length > 0) {
        console.log('Clicked on the projects cube!');
        window.location.href = 'projects.html';
    } else if (intersectsLibrary.length > 0) {
        console.log('Clicked on the library cube!');
        window.location.href = 'library.html';
    }
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