import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Stars, Stage, PositionPoint } from '@react-three/drei';
import AxiosInstance from './Axios';
import ClearIcon from '@mui/icons-material/Clear';

function Model({ model, modelRef, onClick, position, scale }) {
    useFrame(() => {
        if (modelRef.current) {
            modelRef.current.rotation.y += 0.001; // Slowly rotate the model
        }
    });

    return (
        <primitive
            ref={modelRef}
            object={model.scene}
            position={position}
            scale={scale}
            onClick={onClick} // Add click event handler
        />
    );
}

function CanvasModel({ models, onClickModel, modelRefs }) {
    return (
        <Canvas dpr={[1, 2]} camera={{ fov: 75, position: [0, 0, 200] }} className='w-screen h-screen z-10'>
            <Stars 
                radius={3} 
                depth={1000}  
                count={10000} 
                factor={15}   
                saturation={0} 
                fade={true}  
            />
            <Stars 
                radius={3} 
                depth={1000}  
                count={10000} 
                factor={5}   
                saturation={0} 
                fade={true}  
            />
            <ambientLight />
            <OrbitControls
                speed={5} 
                global
            />  
            <Stage shadows={false}>
                {models.map((model, index) => (
                    <Model
                        key={index}
                        model={model}
                        modelRef={modelRefs[index]} // Use refs array for each model
                        onClick={() => onClickModel(index)} // Pass index to identify which model was clicked
                        position={[index * 160, 0, 0]} // Position the models linearly along the X-axis with more spacing
                        scale={index === 0 ? [0.15, 0.15, 0.15] : [0.09, 0.09, 0.09]} // Make the Sun larger than planets
                    />
                ))}
            </Stage>
        </Canvas>
    );
}

const SpaceSingle = () => {
    const [currentModelIndex, setCurrentModelIndex] = useState(null);
    const [dataDB, setDataDB] = useState([]);
    const [isAboutVisible, setIsAboutVisible] = useState(false);

    // Create an array of refs for each model
    const modelRefs = useRef([
        React.createRef(),
        React.createRef(),
        React.createRef(),
        React.createRef(),
        React.createRef(),
        React.createRef(),
        React.createRef(),
        React.createRef(),
        React.createRef(),
        React.createRef()
    ]);

    // Fetch data for models (e.g., planet details)
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

    // Load all models inside a list
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

    // Handle model click to display its details
    const handleClickModel = (index) => {
        setCurrentModelIndex(index);
        setIsAboutVisible(true);
    };  
    const closeAbout = () => {
        setIsAboutVisible(false);
    };

    return (
        <div className='h-screen w-screen z-0 flex'>
            <CanvasModel models={models} onClickModel={handleClickModel} modelRefs={modelRefs.current} />
            <div className='absolute z-20 select-none'>
                {dataDB.length > 0 && isAboutVisible && (
                    <div className='absolute pl-[30vw] pt-[30vh] text-[1.5vw] z-30 w-screen h-screen backdrop-blur-sm'>
                        <h1 className='html absolute data text-[3vw] top-[20vh] left-[20vw] text-transparent bg-clip-text bg-gradient-to-br from-pink-600 via-violet-500 to-emerald-600 z-50'>
                            {dataDB[currentModelIndex]?.name}
                        </h1>   
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
        </div>
    );
};

export default SpaceSingle;
