import React, { useState, useEffect } from 'react';
import Timer from './Timer';
import Banner from './Banner';
import './PPDTTest.css';
import { FullScreen, useFullScreenHandle } from "react-full-screen";

// Import all images from assets directory
const importAll = (r) => r.keys().map(r);
const imageContext = require.context('../assets', false, /\.(png|jpe?g|svg)$/);
const allImages = importAll(imageContext);

const PPDTTest = () => {
  const fullscreenHandle = useFullScreenHandle();
  const [testPhase, setTestPhase] = useState('selection'); // selection, ready, viewing, writing, completed
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);
  
  useEffect(() => {
    try {
      if ((testPhase === 'writing' || testPhase === 'viewing') && fullscreenHandle.active === false) {
        fullscreenHandle.enter();
      } else if (testPhase !== 'writing' && testPhase !== 'viewing' && fullscreenHandle.active) {
        fullscreenHandle.exit();
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  }, [testPhase, fullscreenHandle]);


  useEffect(() => {
    // Process images on component mount
    const loadedImages = allImages.map((img, index) => ({
      id: index + 1,
      name: `image-${index + 1}`,
      url: img
    }));
    setImages(loadedImages);
  }, []);




  const handleImageSelect = (image) => {
    setSelectedImage(image);
    setTestPhase('ready');
  };

  const startTest = () => {
    setTestPhase('viewing');

    setTimeout(() => {
      new Audio('/sounds/bell.mp3').play();
      setTestPhase('transition');

      setTimeout(() => {
        setTestPhase('writing');

        setTimeout(() => {
          new Audio('/sounds/bell.mp3').play();
          setTestPhase('completed');
        }, 240000); // 4 mins
      }, 5000); // Delay for transition (3s)
      
    }, 30000); // viewing duration (3s)
  };


  const handleCompleteWriting = () => {
    setTestPhase('completed');
  };

  return (
    <div className="ppdt-container">
      {testPhase === 'selection' && (
        <div className="image-selection">
          <h1>Select an Image for PPDT Test</h1>
          <div className="image-list">
            {images.map((image) => (
              <div 
                key={image.id} 
                className={`image-item ${selectedImage?.id === image.id ? 'selected' : ''}`}
                onClick={() => handleImageSelect(image)}
              >
                {image.name}
              </div>
            ))}
          </div>
          {selectedImage && (
            <button className="start-button" onClick={() => setTestPhase('ready')}>
              Confirm Selection
            </button>
          )}
        </div>
      )}

      {testPhase === 'ready' && (
        <div className="ready-screen">
          
          <h1>PPDT Test</h1>
          <p>You selected: <code>{selectedImage.name}</code></p>
          <p style={{ textAlign : 'left'}}>
            1. You will be shown image; without timer <br />
            2. after 30 seconds bell will ring. (use earphone; if possible!) <br />
            3. 4 minute timer will be started on the screen. <br />
            4. after time ends a bell will ring. <br />
          </p>

          
          <button className="start-button" onClick={startTest}>Start Test</button>
        </div>
      )}

      <FullScreen handle={fullscreenHandle}>
        {testPhase === 'viewing' && selectedImage && (
          <img 
            src={selectedImage.url} 
            alt="PPDT Test Image" 
            className="fullscreen-image" 
          />
        )}

        {testPhase === 'transition' && (
          <Banner message="START Writing your story, timer is being started." />
        )}

        {testPhase === 'writing' && (
          <div className="writing-phase">
            <Banner message="STORY WRITING TIME" />
            <Timer duration={240} onComplete={handleCompleteWriting} playSound={true} />
          </div>
        )}
      </FullScreen>

      {testPhase === 'completed' && (
        <div className="completed-screen">
          <h2>Test Completed!</h2>
          <p>Thank you for completing the PPDT test with {selectedImage.name}.</p>
        </div>
      )}
    </div>
  );
};

export default PPDTTest;