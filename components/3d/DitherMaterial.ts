import { shaderMaterial } from '@react-three/drei'
import { extend, ReactThreeFiber } from '@react-three/fiber'
import * as THREE from 'three'

const DitherMaterial = shaderMaterial(
    {
        uTime: 0,
        uResolution: new THREE.Vector2(1, 1),
        uMouse: new THREE.Vector2(0, 0),
    },
    // Vertex Shader
    `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    // Fragment Shader
    `
    uniform float uTime;
    uniform vec2 uResolution;
    uniform vec2 uMouse;
    varying vec2 vUv;

    float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    void main() {
        vec2 st = gl_FragCoord.xy / uResolution.xy;
        
        // Create a gradient based on mouse position
        float dist = distance(st, uMouse);
        float grain = random(st * 2.0 + uTime * 0.1);
        
        // Dither threshold
        float threshold = 0.5;
        float c = (dist + grain * 0.2) < threshold ? 0.0 : 1.0;
        
        // Invert colors for style
        vec3 color = vec3(1.0 - c);

        gl_FragColor = vec4(color, 1.0);
    }
  `
)



// Add types to ThreeElements
declare module '@react-three/fiber' {
    interface ThreeElements {
        ditherMaterial: any
    }
}

export { DitherMaterial }
