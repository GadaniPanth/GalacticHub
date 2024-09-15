import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage, Stars, useTexture } from '@react-three/drei'

const SphereWithTexture = () => {
  // Load the textures using useTexture hook
  const earthTexture = useTexture('bgs/8081_earthmap10k.jpg') // Replace with your image path
  const cloudTexture = useTexture('bgs/earthcloudmap.jpg') // Replace with your cloud image path

  return (
    <>
      {/* Earth Sphere */}
      <mesh>
        <sphereGeometry args={[3, 64, 64]} />
        <meshStandardMaterial map={earthTexture} />
      </mesh>

      {/* Cloud Sphere */}
      <mesh>
        <sphereGeometry args={[3.05, 64, 64]} /> {/* Slightly larger radius for the cloud layer */}
        <meshStandardMaterial 
          map={cloudTexture} 
          transparent={true} 
          opacity={0.5} 
        />
      </mesh>
    </>
  )
}

const SpaceAlt = () => {
  return (
    <div className='h-screen w-screen z-0 flex'>
      <Canvas>
        <Stars 
            radius={100} 
            depth={50}  
            count={3000} 
            factor={5}   
            saturation={0} 
            fade={true}  
        />
        {/* Brighter ambient light */}
        <ambientLight intensity={1.5} />
        {/* Stronger directional light with a different color for added effect */}
        <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
        {/* Additional point light for more illumination */}
        <pointLight position={[-10, -10, -5]} intensity={1} color="blue" />
        <OrbitControls />
        <Stage>
            <SphereWithTexture /> {/* Render the sphere with the textures inside the Canvas */}
        </Stage>
      </Canvas>
    </div>
  )
}

export default SpaceAlt
