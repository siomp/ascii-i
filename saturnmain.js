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
