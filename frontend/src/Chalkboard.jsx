import { Navigate } from 'react-router-dom';
import Pitch from './Components/Pitch';
import './Chalkboard.css';
import { useEffect, useRef, useState } from 'react';
import useWindowDimension from './Window';
import SquadList from './Components/SquadList';

function getPasses(data) {
  console.log(data);
  const pass = data['matchCentreData']['events'].filter(type => type['type']['displayName'] === "Pass");
  return pass;
}

function getSquadList(data, isHome) {
  const squad = data['matchCentreData'][isHome ? 'home' : 'away']['players'];
  return squad
}

function Chalkboard(props) {
  const pitchContainerRef = useRef(null);
  const [pitchContainerRect, setPitchContainerRect] = useState({'width': 0, 'height': 0});
  const [passData, setPassData] = useState([]);
  const [homeSquadList, setHomeSquadList] = useState([]);
  const [awaySquadList, setAwaySquadList] = useState([]);
  const windowDimensions = useWindowDimension();
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  useEffect(() => {
    if (pitchContainerRef.current) {
      setPitchContainerRect(pitchContainerRef.current.getBoundingClientRect());
    }
    if(props.matchData){
      setPassData(getPasses(props.matchData));
      setHomeSquadList(getSquadList(props.matchData, true));
      setAwaySquadList(getSquadList(props.matchData, false));
    }
  }, [props.matchData]);

  if (!props.matchData || props.matchData["status"] == "FAIL") {
    if(props.matchData) {
      console.error(props.matchData["message"]);
    }
    return <Navigate to="/"/>
  }

  function selectPlayer(playerId) {
    const selected = selectedPlayers;
    selected.push(playerId);
    setSelectedPlayers(selected);
  }

  function deselectPlayer(playerId) {
    const selected = selectedPlayers;
    const filtered = selected.filter(item => item !== playerId); 
    setSelectedPlayers(filtered);
  }

  function clearSelectedPlayers() {
    setSelectedPlayers([]);
  }

  function isSelected(playerId) {
    return selectedPlayers.includes(playerId);
  }

  return (
    <div className='chalkboard-container' style={{
      display: 'grid',
      gridTemplateColumns: `calc((${windowDimensions.height}px - var(--WEBSITE_BORDER_SPACING)) * (65/105)) auto`,
    }}>
      <div ref={pitchContainerRef} className="pitch-outer-container">
        <Pitch window={windowDimensions} pitchContainerRect={pitchContainerRect} passData={passData} playerData={props.matchData['matchCentreData']['playerIdNameDictionary']}/>
      </div>
      <div>
        <SquadList 
          squadList={homeSquadList} 
          isHome={true} 
          selectPlayer={selectPlayer} 
          deselectPlayer={deselectPlayer}
          isSelected={isSelected}
        />
        <SquadList 
          squadList={awaySquadList} 
          isHome={false} 
          selectPlayer={selectPlayer} 
          deselectPlayer={deselectPlayer}
          isSelected={isSelected}
        />
        <button onClick={clearSelectedPlayers}>clear</button>
      </div>
    </div>
  );
}

export default Chalkboard;
