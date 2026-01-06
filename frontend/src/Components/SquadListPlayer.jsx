import { useState } from "react";

function SquadListPlayer(props) {
  const [mouseEntered, setMouseEntered] = useState(false);
  const elementColor = props.isHome ? 'blue' : 'red';

  function selectPlayer() {
    if(props.isSelected(props.data["playerId"])) {
      props.deselectPlayer(props.data["playerId"]);
    }
    else {
      props.selectPlayer(props.data["playerId"]);
    }
  }

  return (
    <div className="squadlist-player"
      onMouseEnter={() => setMouseEntered(true)} 
      onMouseLeave={() => setMouseEntered(false)} 
      onMouseDown={() => selectPlayer()}
      style={{
        backgroundColor: (mouseEntered || props.isSelected(props.data['playerId'])) ? elementColor : 'black'
      }}
    >
      <p>{props.data["name"]}</p>
    </div>
  )
}

export default SquadListPlayer;
