import { useEffect, useRef, useState } from 'react';
import './Pitch.css';
import PitchBackgroud from './PitchBackground';


function Pitch(props) {
  const pitchRef = useRef(null);
  const pitchContainerRef = useRef(null);
  const [pitchRect, setPitchRect] = useState({'height': 0});
  const [pitchContainerRect, setPitchContainerRect] = useState({'height': 0});
  
  useEffect(() => {
    if(pitchRef.current) {
      setPitchRect(pitchRef.current.getBoundingClientRect());
    }

    if(pitchContainerRef.current) {
      setPitchContainerRect(pitchContainerRef.current.getBoundingClientRect()); 
    }
  }, []);

  const style = {
    'left': ((pitchContainerRect.height - pitchRect.height) / 2) + 'px'
  }

  return (
    <div ref={pitchContainerRef} className="pitch-container">
      <div ref={pitchRef} style={style} className='pitch'>
        <PitchBackgroud/>
      </div>
    </div>
  )
}

export default Pitch;
