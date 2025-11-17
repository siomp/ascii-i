const SATURN_PHASE       = 3;
const PHASE_DURATIONS = [5000];

function createSaturn() {
  const group = new THREE.Group();

  const saturn = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0xd2b48c })
  );
  group.add(saturn);

  const ring = new THREE.Mesh(
    new THREE.RingGeometry(4, 7, 64),
    new THREE.MeshBasicMaterial({
      color: 0xb8860b,
      side: THREE.DoubleSide
    })
  );
  ring.rotation.x = Math.PI / 2.3;
  group.add(ring);

  group.position.set(0, 0, -25);
  group.visible = false;

  return group;
}

const saturn = createSaturn();
scene.add(saturn);

function animate() {
  requestAnimationFrame(animate);
  const now = performance.now();
  const t = (now - phaseStart);

  // === PHASE 1 : HUMAN APPEARS IN DISTANCE ===
  if (phase === HUMAN_APPEAR_PHASE) {
    human.visible = true;

    const fade = Math.min(t / PHASE_DURATIONS[0], 1);
    human.scale.set(0.4 + fade * 0.2, 0.4 + fade * 0.2, 0.4 + fade * 0.2);
    human.position.z = -40 + fade * 8; // moves slightly forward

    if (t > PHASE_DURATIONS[0]) {
      phase = HUMAN_WALK_PHASE;
      phaseStart = now;
    }
  }

  // === PHASE 2 : HUMAN WALKS TOWARD CAMERA ===
  else if (phase === HUMAN_WALK_PHASE) {
    const walk = Math.min(t / PHASE_DURATIONS[1], 1);
    human.position.z = -32 + walk * 35;   // approaching camera
    human.position.y = -2 + Math.sin(t * 0.004) * 0.3;
    human.scale.set(0.6 + walk * 0.6, 0.6 + walk * 0.6, 0.6 + walk * 0.6);

    if (t > PHASE_DURATIONS[1]) {
      phase = HUMAN_FLOAT_PHASE;
      phaseStart = now;
    }
  }

  // === PHASE 3 : HUMAN FLOATS UP & SHRINKS ===
  else if (phase === HUMAN_FLOAT_PHASE) {
    const f = Math.min(t / PHASE_DURATIONS[2], 1);
    human.position.y = -2 + f * 12;
    human.scale.set(1.2 - f * 1.1, 1.2 - f * 1.1, 1.2 - f * 1.1);

    if (f >= 1) {
      human.visible = false;
      phase = SATURN_PHASE;
      phaseStart = now;
    }
  }

  // === PHASE 4 : SATURN APPEARS & ROTATES ===
  else if (phase === SATURN_PHASE) {
    saturn.visible = true;

    const f = Math.min(t / PHASE_DURATIONS[3], 1);
    saturn.rotation.y += 0.01;
    saturn.scale.set(f, f, f);

    if (t > PHASE_DURATIONS[3]) {
      resetScene();
    }
  }

  camera.position.set(0, 0, 20);
  camera.lookAt(0, 0, -20);
  effect.render(scene, camera);
}

function resetScene() {
  phase = HUMAN_APPEAR_PHASE;
  phaseStart = performance.now();

  human.visible = false;
  human.position.set(0, -2, -40);
  human.scale.set(0.4, 0.4, 0.4);

  saturn.visible = false;
  saturn.scale.set(0, 0, 0);
}

