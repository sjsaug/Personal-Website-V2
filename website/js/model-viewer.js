let projectsScene, projectsCamera, projectsRenderer, projectsControls, projectsCube;
let libraryScene, libraryCamera, libraryRenderer, libraryControls, libraryCube;

function initProjectsViewer() {
    projectsScene = new THREE.Scene();
    projectsScene.background = new THREE.Color(0xffffff);

    projectsCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    projectsCamera.position.z = 10; // increased initial distance

    projectsRenderer = new THREE.WebGLRenderer({ antialias: true });
    projectsRenderer.setSize(document.getElementById('projects-model-container').clientWidth, document.getElementById('projects-model-container').clientHeight);
    document.getElementById('projects-model-container').appendChild(projectsRenderer.domElement);

    projectsControls = new THREE.OrbitControls(projectsCamera, projectsRenderer.domElement);
    projectsControls.enableDamping = true;
    projectsControls.dampingFactor = 0.25;

    const loader = new THREE.GLTFLoader();
    loader.load(
        'models/projectscube.glb',
        function (gltf) {
            projectsCube = gltf.scene;
            projectsScene.add(projectsCube);
            fitCameraToObject(projectsCamera, projectsCube, projectsControls, 6); // increased zoom-out factor
        },
        function (xhr) {
            console.log('Projects cube ' + (xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.error('An error happened', error);
        }
    );

    const ambientLight = new THREE.AmbientLight(0x404040);
    projectsScene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    projectsScene.add(directionalLight);

    projectsRenderer.domElement.addEventListener('click', onCubeClick, false);
}

function initLibraryViewer() {
    libraryScene = new THREE.Scene();
    libraryScene.background = new THREE.Color(0xffffff);

    libraryCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    libraryCamera.position.z = 10; // increased initial distance

    libraryRenderer = new THREE.WebGLRenderer({ antialias: true });
    libraryRenderer.setSize(document.getElementById('library-model-container').clientWidth, document.getElementById('library-model-container').clientHeight);
    document.getElementById('library-model-container').appendChild(libraryRenderer.domElement);

    libraryControls = new THREE.OrbitControls(libraryCamera, libraryRenderer.domElement);
    libraryControls.enableDamping = true;
    libraryControls.dampingFactor = 0.25;

    const loader = new THREE.GLTFLoader();
    loader.load(
        'models/librarycube.glb',
        function (gltf) {
            libraryCube = gltf.scene;
            libraryScene.add(libraryCube);
            fitCameraToObject(libraryCamera, libraryCube, libraryControls, 6); // increased zoom-out factor
        },
        function (xhr) {
            console.log('Library cube ' + (xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.error('An error happened', error);
        }
    );

    const ambientLight = new THREE.AmbientLight(0x404040);
    libraryScene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    libraryScene.add(directionalLight);

    libraryRenderer.domElement.addEventListener('click', onCubeClick, false);
}

function fitCameraToObject(camera, object, controls, zoomOutFactor = 1.5) {
    const boundingBox = new THREE.Box3().setFromObject(object);
    const center = boundingBox.getCenter(new THREE.Vector3());
    const size = boundingBox.getSize(new THREE.Vector3());

    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = camera.fov * (Math.PI / 180);
    let cameraZ = Math.abs(maxDim / 2 * Math.tan(fov * 2));

    camera.position.z = cameraZ * zoomOutFactor;
    
    const minZ = boundingBox.min.z;
    const cameraToFarEdge = (minZ < 0) ? -minZ + cameraZ : cameraZ - minZ;

    camera.far = cameraToFarEdge * 3;
    camera.updateProjectionMatrix();

    controls.target.copy(center);
    controls.maxDistance = cameraToFarEdge * 2;
    controls.update();
}

function onCubeClick(event) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const rect = event.target.getBoundingClientRect();
    
    mouse.x = ((event.clientX - rect.left) / event.target.clientWidth) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / event.target.clientHeight) * 2 + 1;
    
    if (event.target === projectsRenderer.domElement) {
        raycaster.setFromCamera(mouse, projectsCamera);
        const intersects = raycaster.intersectObject(projectsCube, true);
        if (intersects.length > 0) {
            window.location.href = 'projects.html';
        }
    } else if (event.target === libraryRenderer.domElement) {
        raycaster.setFromCamera(mouse, libraryCamera);
        const intersects = raycaster.intersectObject(libraryCube, true);
        if (intersects.length > 0) {
            window.location.href = 'library.html';
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    
    projectsControls.update();
    projectsRenderer.render(projectsScene, projectsCamera);

    libraryControls.update();
    libraryRenderer.render(libraryScene, libraryCamera);
}

function onWindowResize() {
    const projectsContainer = document.getElementById('projects-model-container');
    const libraryContainer = document.getElementById('library-model-container');

    projectsCamera.aspect = projectsContainer.clientWidth / projectsContainer.clientHeight;
    projectsCamera.updateProjectionMatrix();
    projectsRenderer.setSize(projectsContainer.clientWidth, projectsContainer.clientHeight);

    libraryCamera.aspect = libraryContainer.clientWidth / libraryContainer.clientHeight;
    libraryCamera.updateProjectionMatrix();
    libraryRenderer.setSize(libraryContainer.clientWidth, libraryContainer.clientHeight);
}

window.addEventListener('resize', onWindowResize, false);

window.onload = function() {
    initProjectsViewer();
    initLibraryViewer();
    animate();
};