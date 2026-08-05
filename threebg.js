// GridGuard — Three.js Animated Network Background
window.addEventListener('load', function () {
  if (typeof THREE === 'undefined') return;

  var canvas = document.getElementById('three-bg');
  if (!canvas) return;

  var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 14);

  // Lights
  scene.add(new THREE.AmbientLight(0xffffff, 0.25));
  var pl1 = new THREE.PointLight(0x00F0FF, 2, 80);
  pl1.position.set(10, 10, 10);
  scene.add(pl1);
  var pl2 = new THREE.PointLight(0x8A2BE2, 2, 80);
  pl2.position.set(-10, -10, -10);
  scene.add(pl2);

  // Main pivot group — everything rotatable goes here
  var pivot = new THREE.Group();
  scene.add(pivot);

  // Stars
  var starCount = 2500;
  var starPos = new Float32Array(starCount * 3);
  for (var s = 0; s < starCount * 3; s++) starPos[s] = (Math.random() - 0.5) * 200;
  var starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  pivot.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.18, transparent: true, opacity: 0.65 })));

  // Nodes
  var nodeCount = 15;
  var basePositions = [];
  var nodeMeshes = [];
  var nodeGeo = new THREE.SphereGeometry(0.15, 16, 16);

  for (var i = 0; i < nodeCount; i++) {
    var x = (Math.random() - 0.5) * 8;
    var y = (Math.random() - 0.5) * 4;
    var z = (Math.random() - 0.5) * 8;
    basePositions.push({ x: x, y: y, z: z });
    var mat = new THREE.MeshStandardMaterial({ color: 0x00F0FF, emissive: 0x00F0FF, emissiveIntensity: 2 });
    var mesh = new THREE.Mesh(nodeGeo, mat);
    mesh.position.set(x, y, z);
    mesh.userData.baseY = y;
    mesh.userData.idx = i;
    pivot.add(mesh);
    nodeMeshes.push(mesh);
  }

  // Connection lines
  for (var a = 0; a < nodeCount; a++) {
    for (var b = a + 1; b < nodeCount; b++) {
      if (Math.random() > 0.45) {
        var pts = [
          new THREE.Vector3(basePositions[a].x, basePositions[a].y, basePositions[a].z),
          new THREE.Vector3(basePositions[b].x, basePositions[b].y, basePositions[b].z)
        ];
        var lineGeo = new THREE.BufferGeometry().setFromPoints(pts);
        var lineMat = new THREE.LineBasicMaterial({ color: 0x8A2BE2, transparent: true, opacity: 0.4 });
        pivot.add(new THREE.Line(lineGeo, lineMat));
      }
    }
  }

  // Mouse parallax
  var mx = 0, my = 0;
  document.addEventListener('mousemove', function (e) {
    mx = (e.clientX / window.innerWidth) * 2 - 1;
    my = -((e.clientY / window.innerHeight) * 2 - 1);
  });

  // Resize handler
  window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Animation loop
  var clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    var t = clock.getElapsedTime();
    pivot.rotation.y = t * 0.05;
    pivot.rotation.z += (mx * 0.15 - pivot.rotation.z) * 0.04;
    pivot.rotation.x += (my * 0.15 - pivot.rotation.x) * 0.04;
    for (var n = 0; n < nodeMeshes.length; n++) {
      var m = nodeMeshes[n];
      m.position.y = m.userData.baseY + Math.sin(t * 2 + m.userData.idx) * 0.2;
      m.material.emissiveIntensity = 1.5 + Math.sin(t * 3 + m.userData.idx) * 0.5;
    }
    renderer.render(scene, camera);
  }
  animate();
});
