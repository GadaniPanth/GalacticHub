import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Stage, OrbitControls, Stars } from '@react-three/drei';
// import Arrow from '@mui/icons-material/KeyboardDoubleArrowRightTwoTone';
import RocketLaunchTwoToneIcon from '@mui/icons-material/RocketLaunchTwoTone';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Loading from './Loading';

function Model({ path, modelRef, ...props }) {
    const { scene } = useGLTF(path);

    useFrame(() => {
        if (modelRef.current) {
            modelRef.current.rotation.y += 0.002;
        }
    });

    return <primitive ref={modelRef} object={scene} {...props} />;
}

function CanvasModel({ path, modelRef }) {
    return (
        <Canvas dpr={[1, 2]} camera={{ fov: 75 }} className='w-screen h-screen ele z-10 top-0 fixed cursor-grab active:cursor-grabbing'>
            <OrbitControls speed={0.1} global />
            <Stage environment={'night'} shadows={false}>
                <Model path={path} modelRef={modelRef} scale={0.01} />
            </Stage>
            <Stars 
                radius={100} // Radius of the sphere around the camera where stars will appear
                depth={50}   // How deep the starfield is
                count={3000} // Number of stars
                factor={5}   // Star size factor (larger values mean bigger stars)
                saturation={0} // Saturation of stars (0 for no color, 1 for full color)
                fade={true}  // Whether the stars should fade out at the edges of the sphere
            />
        </Canvas>
    );
}

const Home = () => {
    const modelRef = useRef();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handelClick = (e) => {
        setLoading(true);
        e.preventDefault();
        setTimeout(() => {
            setLoading(false);
            // navigate('/space');
            navigate('/spacesingle');
        }, 4000);

        if (modelRef.current) {
            // Animate rotation and scale using GSAP
            gsap.timeline()
                .to(modelRef.current.rotation, {
                    y: modelRef.current.rotation.y + 6,
                    duration: 3,
                    ease: "power2.inOut",
                })
                .to(modelRef.current.scale, {
                    x: 0.05,
                    y: 0.05,
                    z: 0.05,
                    duration: 4.5,
                    ease: "power2.inOut",
                }, 0) // Start scale animation at the same time as rotation
                // .to(modelRef.current.scale, {
                //     x: 0.01, // Back to original scale
                //     y: 0.01,
                //     z: 0.01,
                //     duration: 1.5,
                //     ease: "power2.inOut",
                // }, "-=1.5");
            //Animate txt
            gsap.timeline()
                .to('.txt-wl',{
                    y:-1000,
                    opacity:0,
                    duration:2,
                    ease: "bounce.in",
                })
                .to('.txt-gh',{
                    y:-1000,
                    opacity:0,
                    duration:2,
                    ease: "bounce.in",
                },0.2)
                .to('.txt-to',{
                    y:-1000,
                    opacity:0,
                    duration:2,
                    ease: "bounce.in",
                },0.1)
        }
    };

    useGSAP(() => {
        gsap.fromTo('.txt-wl', {
            x: -500
        }, {
            x: 0,
            duration: 0.1,
            delay: 2
        });

        gsap.fromTo('.txt-to', {
            x: -500
        }, {
            x: 0,
            duration: 0.1,
            delay: 2.2
        });

        gsap.fromTo('.txt-gh', {
            opacity: 0,
            y: 500
        }, {
            opacity: 1,
            y: 0,
            duration: 0.2,
            delay: 2.3
        });
    });

    return (<>
        {loading ? (
            <Loading />
        ) : (
            <div className='h-screen w-screen z-0'>
                <CanvasModel path="GLBs/0_Sun.glb" modelRef={modelRef} />   
                <div className='home-txt z-10 fixed top-0 pointer-events-none select-none'>
                    <h1 className='text-[4.5vw] txt txt-wl absolute top-[30vh] text-red-300'>Welcome</h1>
                    <h1 className='text-[4.5vw] txt txt-to absolute top-[40vh] ml-[18vw] text-red-400'>To</h1>
                    <h1 className='text-[10vw] txt txt-gh absolute top-[25vh] ml-[25vw] text-transparent bg-clip-text bg-gradient-to-br from-black via-orange-500 to-black'>GalacticHub</h1>
                    <div>
                        {/* <Link to='/space' onClick={handelClick}> */}
                        <Link to='/spacesingle' onClick={handelClick}>
                            <button className='text-[1.5vw] btn btn-as pointer-events-auto select-auto flex absolute w-[15vw] h-auto space-x-2 items-center top-[85vh] ml-[65vw] p-2 border rounded-lg border-solid border-violet-800 hover:bg-violet-900 transition-all active:bg-violet-800 hover:border-t-8 hover:border-l-8 duration-300 ease-linear'>
                                <RocketLaunchTwoToneIcon /><h1>About Space</h1>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>)
        }
    </>);
};

export default Home;
