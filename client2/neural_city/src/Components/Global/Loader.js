import React, { useState, useEffect } from 'react';

const Loader = () => {
  const [loadingText, setLoadingText] = useState('Initializing...');
  useEffect(() => {
    const stages = ['Preprocessing data', 'Training model', 'Evaluating performance'];
    let stageIndex = 0;
    const interval = setInterval(() => {
      setLoadingText(stages[stageIndex]);
      stageIndex = (stageIndex + 1) % stages.length;
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex bg-violet-50 flex-col justify-center items-center h-screen">
      <img src="https://duet-cdn.vox-cdn.com/thumbor/0x0:2040x1360/2048x1365/filters:focal(1020x680:1021x681):no_upscale():format(webp)/cdn.vox-cdn.com/uploads/chorus_asset/file/10082777/for_animation.gif" alt="Loader" className={`rounded-lg h-52 mb-4`}/>
      <p className="text-gray-600 text-2xl">{loadingText}</p>
    </div>
  );
};

export default Loader;
