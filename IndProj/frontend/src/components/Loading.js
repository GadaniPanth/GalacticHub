import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

function Loading() {  
    const progressBarRef = useRef(null);

    useEffect(() => {
        gsap.timeline()
            .fromTo(
            ".svg path",
            { strokeDashoffset: "0"},
            { strokeDasharray: "4500", strokeDashoffset: "4500" , duration: 2, ease: "circ.out", delay:1 },
            )
            .fromTo(
                progressBarRef.current,
                { width: "0%" },
                { width: "100%", duration: 3, ease: "linear"},0
            );
      }, []);
  return (
    <>
        <div className='bg-black w-screen h-screen absolute pt-[25vh] pl-[40vw] space-y-14 text-black'>
            <svg viewBox="0 0 369.57894736842104 90.08728573274055" class="svg fill-none stroke-current looka-1j8o68f">
                <defs id="SvgjsDefs1662">
                <linearGradient id="SvgjsLinearGradient1667"><stop id="SvgjsStop1668" stop-color="#26275f" offset="0">
                    </stop>
                    <stop id="SvgjsStop1669" stop-color="#813e96" offset="0.14"></stop><stop id="SvgjsStop1670" stop-color="#2e64af" offset="0.29">
                    </stop>
                    <stop id="SvgjsStop1671" stop-color="#3faa49" offset="0.5"></stop><stop id="SvgjsStop1672" stop-color="#f2e64a" offset="0.71">
                    </stop>
                    <stop id="SvgjsStop1673" stop-color="#f2903b" offset="0.86"></stop>
                    <stop id="SvgjsStop1674" stop-color="#ed4533" offset="1"></stop>
                </linearGradient>
                <linearGradient id="SvgjsLinearGradient1675">
                    <stop id="SvgjsStop1676" stop-color="#7f00ff" offset="0"></stop>
                    <stop id="SvgjsStop1677" stop-color="#e100ff" offset="1"></stop>
                </linearGradient>
                </defs>
                <g id="SvgjsG1663" featurekey="xG21Y3-0" transform="matrix(1.4120261013201025,0,0,1.4120261013201025,-11.744585163683674,-21.603999619520174)" fill="url(#SvgjsLinearGradient1667)">
                <g xmlns="http://www.w3.org/2000/svg"><polygon points="73.7,57.7 73.7,57.7 73.7,57.7  ">
                    </polygon>
                    <path d="M74.5,58C74.5,58,74.5,58,74.5,58C74.5,58,74.5,58,74.5,58L74.5,58z">
                    </path>
                </g>
                <g xmlns="http://www.w3.org/2000/svg"><path d="M92.1,42.5c-0.9-5-8.8-7.9-21.7-8.1c-4.6-5.9-11.9-9.7-19.9-9.7c-11.4,0-21,7.5-24.2,17.9C14,47.5,7.5,53.1,8.4,58   c0.7,3.9,5.8,6.6,14.4,7.7c2.5,0.3,5.2,0.5,8.2,0.5c4.8,5.8,11.9,9.1,19.5,9.1c10.9,0,20.5-6.9,24-17.3c0,0,0,0,0-0.1l0,0   C86.6,53.2,93,47.5,92.1,42.5z M50.5,26.3c12.6,0,23.2,10.1,23.7,22.7c-0.5,0.3-1,0.6-1.5,0.9c-5.1,2.7-12.8,5.2-21.1,6.8   c-7.7,1.4-15.1,1.9-20.9,1.4c-0.2,0-0.4,0-0.6-0.1c-0.6-0.1-1.3-0.2-1.8-0.2c-0.9-2.5-1.3-5.1-1.3-7.8   C26.8,36.9,37.4,26.3,50.5,26.3z M30.5,59.7c1.5,0.1,3.2,0.2,5,0.2c4.9,0,10.5-0.5,16.3-1.6c9.7-1.8,18.5-4.8,23.7-8.1   c3.5-2.2,5-4.4,4.6-6.4c-0.4-2.1-2.6-3.5-6.6-4.4c-0.1-0.4-0.3-0.7-0.5-1c7,0.7,11.4,2.5,11.9,5.1c0.5,2.7-3.4,6.2-10.4,9.5   c-6,2.8-14,5.2-22.3,6.8c-9.4,1.7-18.4,2.3-25.4,1.5c-6.5-0.7-10.6-2.6-11-5c-0.5-2.6,3.2-6,9.8-9.2c0,0.4-0.1,0.7-0.1,1.1   c-3.8,2.3-5.5,4.6-5.2,6.8C20.6,57.4,24.2,59.1,30.5,59.7z M74.2,41.2c2.5,0.7,4,1.7,4.2,2.8c0.2,1.1-0.8,2.5-2.7,4   C75.5,45.6,75,43.4,74.2,41.2z M21.7,54.5c-0.2-1.2,1-2.8,3.5-4.5c0,2.5,0.4,5,1.1,7.4C23.6,56.7,21.9,55.7,21.7,54.5z M50.5,73.7   c-6.6,0-12.8-2.7-17.3-7.5c6.1-0.1,12.8-0.8,19.6-2c7-1.3,13.8-3.1,19.6-5.3C68.9,67.7,60.2,73.7,50.5,73.7z M73.7,57.7L73.7,57.7   L73.7,57.7L73.7,57.7z M73.9,56.4c-2.5,1-5.1,1.9-7.9,2.8c-4.2,1.3-8.8,2.4-13.5,3.3c-4.7,0.9-9.2,1.5-13.6,1.8c0,0,0,0,0,0   c-5.8,0.4-11.2,0.3-15.8-0.2c-7.7-1-12.4-3.2-12.9-6.3c-0.7-3.8,5.2-8.7,15.6-13c0,0.1,0,0.2-0.1,0.3c-8.3,3.8-12.5,7.9-11.8,11.6   c0.6,3.3,4.9,5.5,12.5,6.3c2.2,0.2,4.5,0.4,7,0.4c5.7,0,12.2-0.6,18.9-1.9c8.5-1.6,16.6-4,22.8-6.9v0c8-3.7,12-7.8,11.4-11.4   c-0.7-3.6-5.8-5.9-14.5-6.5c-0.1-0.1-0.2-0.2-0.2-0.4c10.9,0.4,18,2.9,18.8,6.7C91.1,46.8,84.8,52,73.9,56.4z">
                    </path>
                </g>
                <g xmlns="http://www.w3.org/2000/svg"><path d="M32.7,26.1c-2.3,0-3.9-1.6-3.9-3.9c0-0.4-0.4-0.8-0.8-0.8c-0.5,0-0.8,0.4-0.8,0.8c0,2.3-1.6,3.9-3.9,3.9   c-0.5,0-0.8,0.4-0.8,0.8s0.4,0.8,0.8,0.8c2.3,0,3.9,1.6,3.9,3.9c0,0.5,0.4,0.8,0.8,0.8c0.4,0,0.8-0.4,0.8-0.8   c0-2.3,1.6-3.9,3.9-3.9c0.5,0,0.8-0.4,0.8-0.8S33.1,26.1,32.7,26.1z M27.9,28.7c-0.4-0.7-1-1.3-1.7-1.7c0.7-0.4,1.3-1,1.7-1.7   c0.4,0.7,1,1.3,1.7,1.7C28.9,27.4,28.3,28,27.9,28.7z">
                    </path>
                </g>
                <g xmlns="http://www.w3.org/2000/svg"><path d="M80.4,72.8c-2.3,0-3.9-1.6-3.9-3.9c0-0.5-0.4-0.8-0.8-0.8c-0.5,0-0.8,0.4-0.8,0.8c0,2.3-1.6,3.9-3.9,3.9   c-0.5,0-0.8,0.4-0.8,0.8c0,0.4,0.4,0.8,0.8,0.8c2.3,0,3.9,1.6,3.9,3.9c0,0.4,0.4,0.8,0.8,0.8c0.5,0,0.8-0.4,0.8-0.8   c0-2.3,1.6-3.9,3.9-3.9c0.5,0,0.8-0.4,0.8-0.8C81.2,73.2,80.9,72.8,80.4,72.8z M75.7,75.3c-0.4-0.7-1-1.3-1.7-1.7   c0.7-0.4,1.3-1,1.7-1.7c0.4,0.7,1,1.3,1.7,1.7C76.7,74.1,76.1,74.6,75.7,75.3z">
                    </path>
                </g>
                <g xmlns="http://www.w3.org/2000/svg"><path d="M63.3,15.3c-1.3,0-2.4,1.1-2.4,2.4c0,1.3,1.1,2.4,2.4,2.4c1.3,0,2.4-1.1,2.4-2.4C65.7,16.4,64.6,15.3,63.3,15.3z    M63.3,18.5c-0.4,0-0.8-0.3-0.8-0.8c0-0.4,0.3-0.8,0.8-0.8c0.4,0,0.8,0.3,0.8,0.8C64.1,18.1,63.7,18.5,63.3,18.5z">
                    </path>
                </g>
                <g xmlns="http://www.w3.org/2000/svg"><path d="M23.1,72.2c-1.2,0-2.2,1-2.2,2.2c0,1.2,1,2.2,2.2,2.2c1.2,0,2.2-1,2.2-2.2C25.4,73.2,24.4,72.2,23.1,72.2z M23.1,75.1   c-0.3,0-0.6-0.3-0.6-0.6c0-0.3,0.3-0.6,0.6-0.6c0.3,0,0.6,0.3,0.6,0.6C23.7,74.8,23.5,75.1,23.1,75.1z">
                    </path>
                </g>
                <g xmlns="http://www.w3.org/2000/svg">
                    <path d="M81.9,59.8c-1.4,0-2.6,1.2-2.6,2.6c0,1.4,1.2,2.6,2.6,2.6c1.4,0,2.6-1.1,2.6-2.6C84.5,60.9,83.3,59.8,81.9,59.8z    M81.9,63.3c-0.5,0-0.9-0.4-0.9-0.9c0-0.5,0.4-0.9,0.9-0.9c0.5,0,0.9,0.4,0.9,0.9C82.8,62.9,82.4,63.3,81.9,63.3z">
                    </path>
                </g>
                </g>
            </svg>
            <div className="w-full max-w-[20vw] h-2 rounded-full overflow-hidden">
                <div
                    ref={progressBarRef}
                    className="h-full bg-gradient-to-r from-violet-500 via-indigo-500 via-blue-500 via-green-600 via-yellow-500  to-orange-500 animate-progress"
                ></div>
            </div>
        </div>
    </>
    // <div className="flex justify-center items-center min-h-screen bg-gray-100">
    //   <div className="flex space-x-2">
    //     <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
    //     <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
    //     <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
    //   </div>
    // </div>
  );
}

export default Loading;
