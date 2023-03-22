import {
    TrackballControls
} from '//unpkg.com/three/examples/jsm/controls/TrackballControls.js';
Object.assign(THREE, {
    TrackballControls
});
	
// Gen random data for lines
const N = 20;
const colorScale = d3.interpolate('#6230fa', '#e32172');

  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor( 0x000000, 0 );
  document.getElementById("globeViz").appendChild(renderer.domElement);

  // Setup scene
  const scene = new THREE.Scene();
  scene.add(new THREE.AmbientLight(0xbbbbbb, 0.3));
	
const Globe = new ThreeGlobe({ waitForGlobeReady: true })
 .globeImageUrl('https://uploads-ssl.webflow.com/640f35e62947197a5189ac4b/6419f83b60c4b23302f56f65_map-smart-globe.png')
 .showAtmosphere(true)
 .atmosphereColor("#0098ff")
 .atmosphereAltitude(0.15)
 fetch('https://raw.githubusercontent.com/ma73us/code/main/my-flights.json')
      .then(response => response.json())
      .then(data => {
        const flights = data.flights;
        // chama o método arcsData() dentro da função then
        Globe.arcsData(flights);
      });
 Globe.arcColor(d => ['rgba(255,255,255, 0.4)', 'rgba(255,255,255, 1)', 'rgba(255,255,255, 0.4)'])
 .arcAltitudeAutoScale(0.4)
 .arcStroke(0.6)
 .arcCurveResolution(1024)
 .arcDashLength(0.9)
 .arcDashGap(4)
 .arcDashAnimateTime(3000)
 .arcsTransitionDuration(1000)
 .arcDashInitialGap(() => Math.random() * 5)
 fetch('https://raw.githubusercontent.com/ma73us/code/main/my-flights.json')
      .then(response => response.json())
      .then(data => {
        const features = data.flights;
	    Globe.labelsData(features);
      });
 Globe.labelLat(d => d.endLat)
 .labelLng(d => d.endLng)
 .labelText(d => d.flightCode)
 .labelAltitude(0)
 .labelSize(0)
 .labelDotRadius(0.5)
 .labelColor(() => 'rgba(255,255,255, 0.9)')
 .labelsTransitionDuration(1000)
 .labelResolution(3);

  const globeMaterial = Globe.globeMaterial();
  globeMaterial.opacity = 1;
  //globeMaterial.color = new THREE.Color(0x7541e3);
  //globeMaterial.emissive = new THREE.Color(0x220038);
  //globeMaterial.emissiveIntensity = 0;
  //globeMaterial.shininess = 0;

  // Initialize camera, light
  const camera = new THREE.PerspectiveCamera();
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  var dLight = new THREE.DirectionalLight(0xffffff, 0.6);
  dLight.position.set(-800, 2000, 400);
  camera.add(dLight);

  var dLight1 = new THREE.DirectionalLight(0x8313eb, 0.4);
  dLight1.position.set(-200, 500, 200);
  camera.add(dLight1);

  /*var dLight2 = new THREE.PointLight(0x7541e3, 0.5);
  dLight2.position.set(-200, 500, 200);
  camera.add(dLight2);*/

  camera.position.z = 280;
  camera.position.x = 0;
  camera.position.y = 50;

  scene.add(camera);
	
  scene.add(Globe);
	

  // Additional effects
  // scene.fog = new THREE.Fog(0xe32172, 400, 2000);

  // Add camera controls
  const tbControls = new TrackballControls(camera, renderer.domElement);
  tbControls.minDistance = 101;
  tbControls.rotateSpeed = 5;
  tbControls.zoomSpeed = 0.8;
  tbControls.enabled = false;

  const clock = new THREE.Clock();

  function animate() {
 // IIFE
 const elapsedTime = clock.getElapsedTime();
 Globe.rotation.y = elapsedTime / 10;
 // Frame cycle
 tbControls.update();
 renderer.render(scene, camera);
 requestAnimationFrame(animate);
  }

  animate();