import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Stage, OrbitControls, Stars, useTexture } from '@react-three/drei';
import gsap from 'gsap';
import AxiosInstance from './Axios';
import ClearIcon from '@mui/icons-material/Clear';

const SphereWithTexture = ({ cloudTexture, currentModelIndex }) => {
    const cloudRef = useRef();

    useFrame(() => {
        if (cloudRef.current && currentModelIndex === 3) { // Earth index is 3
            if (cloudRef.current.rotation) {
                cloudRef.current.rotation.y += 0.0015; // Slower rotation for clouds
            }
        }
    });

    return (
        <mesh ref={cloudRef}>
            <sphereGeometry args={[5.03, 64, 64]} /> {/* Slightly larger radius for the cloud layer */}
            <meshStandardMaterial 
                map={cloudTexture} 
                transparent={true} 
                opacity={0.4} 
            />
        </mesh>
    );
}

function Model({ model, modelRef, currentModelIndex, ...props }) {
    const cloudTexture = useTexture('bgs/earthcloudmap.jpg'); // Replace with your cloud image path
   
    useFrame(() => {
        if (modelRef.current) {
            modelRef.current.rotation.y += 0.001;
        }
    });

    return (
        <>
            <primitive
                ref={modelRef}
                object={model.scene}
                {...props}
            />
            {currentModelIndex === 3 && ( // Show clouds only when Earth is active
                <SphereWithTexture cloudTexture={cloudTexture} currentModelIndex={currentModelIndex} />
            )}
        </>
    );
}

function CanvasModel({ modelList, modelRef, currentModelIndex }) {
    const environment = currentModelIndex === 3 ? 'studio' : 'night';
    
    return (
        <Canvas dpr={[1, 2]} camera={{ fov: 100, position: [0, 5, 10] }} className='w-screen h-screen ele z-10 top-0 fixed cursor-grab active:cursor-grabbing'>
            <Stars 
                radius={100} 
                depth={50}  
                count={3000} 
                factor={5}   
                saturation={0} 
                fade={true}  
            />
            <OrbitControls speed={0.1} global />
            <Stage environment={environment} shadows={false}>
                <Model
                    model={modelList[currentModelIndex]}
                    modelRef={modelRef}
                    currentModelIndex={currentModelIndex}
                    scale={0.01}
                />
            </Stage>
        </Canvas>
    );
}

const Space = () => {
    const modelRef = useRef();
    const [currentModelIndex, setCurrentModelIndex] = useState(0);
    const [dataDB, setDataDB] = useState([]);
    const [isAboutVisible, setIsAboutVisible] = useState(false);

    // Fetch data(dataDB)
    const getData = async () => {
        try {
            const res = await AxiosInstance.get('mymodels/');
            setDataDB(res.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }; 
    useEffect(() => {
        getData();
    }, []);    

    // Load all models initially(useGLTF)
    const models = [
        useGLTF('GLBs/0_Sun.glb'),
        useGLTF('GLBs/1_Mercury.glb'),
        useGLTF('GLBs/2_Venus.glb'),
        useGLTF('GLBs/3_Earth.glb'),
        useGLTF('GLBs/4_Mars.glb'),
        useGLTF('GLBs/5_Jupiter.glb'),
        useGLTF('GLBs/6_Saturn.glb'),
        useGLTF('GLBs/7_Uranus.glb'),
        useGLTF('GLBs/8_Neptune.glb'),
        useGLTF('GLBs/9_Pluto.glb'),
    ];

    // Animations(modelRef, currentModelIndex)
    const animateModelChange = (direction) => {
        if (modelRef.current) {
            gsap.timeline()
            // Animate the rotation
                .to(modelRef.current.rotation, {
                    y: modelRef.current.rotation.y + (direction === 'next' ? 6 : -6),
                    duration: 1.5,
                    ease: "power2.inOut",
                    onStart: closeAbout(),
                    onComplete: () => {
                        setCurrentModelIndex((prevIndex) => 
                            direction === 'next'
                                ? (prevIndex + 1) % models.length
                                : (prevIndex - 1 + models.length) % models.length
                        );
                    },
                })

            // Animate Data
                .fromTo('.html', {
                    y: '-50px',
                    opacity: 0,
                    stagger: 1,
                }, {
                    y: 0,
                    opacity: 1
                });
        }
    };

    const showNextModel = () => animateModelChange('next');
    const showPreviousModel = () => animateModelChange('previous');

    // Handle About(isAboutVisible)
    const openAbout = () => {
        setIsAboutVisible(true);
    }
    const closeAbout = () => {
        setIsAboutVisible(false);
    }

    return (
        <div className='h-screen w-screen z-0 flex'>
            <button onClick={showPreviousModel} className='absolute left-4 top-1/2 transform -translate-y-1/2 z-50'>
                Previous
            </button>
            <CanvasModel modelList={models} modelRef={modelRef} currentModelIndex={currentModelIndex} />
            <div className='absolute z-20 select-none pointer-events-none'>
                <h1 className='html absolute data text-[3vw] top-[20vh] left-[20vw] text-transparent bg-clip-text bg-gradient-to-br from-pink-600 via-violet-500 to-emerald-600 z-50'>
                    {dataDB.length > 0 && dataDB[currentModelIndex]?.name}
                </h1>
                <button onClick={openAbout} className='html absolute top-[30vh] left-[20vw] pointer-events-auto'>About</button>
                {dataDB.length > 0 && isAboutVisible && (
                    <div className='absolute pl-[30vw] pt-[30vh] text-[1.5vw] z-30 w-screen h-screen backdrop-blur-sm'>
                        <table className='text-transparent bg-clip-text bg-gradient-to-br from-pink-600 via-violet-500 to-emerald-600 border-collapse'>
                            <tbody>
                                {Object.entries(dataDB[currentModelIndex]?.data || {}).map(([key, value], index) => (
                                    <tr key={index}>
                                        <td className='border-b-[.2vh] px-4 py-2'>{key}<span className='text-white'>:</span></td>
                                        <td className='border-b-[.2vh] px-4 py-2'>
                                            {Array.isArray(value) ? value.join(', ') : value}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button onClick={closeAbout} className='absolute pointer-events-auto right-[18vw] top-[20vh] text-white'>
                            <ClearIcon />
                        </button>
                    </div>
                )}
            </div>
            <button onClick={showNextModel} className='absolute right-4 top-1/2 transform -translate-y-1/2 z-50'>
                Next
            </button>
        </div>
    );
}

export default Space;
