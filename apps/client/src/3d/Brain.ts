import * as THREE from 'three';

const scene = new THREE.Scene();

const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshBasicMaterial({
    color: '#0033ff',
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//Camera
const camera = new THREE.PerspectiveCamera(45, )