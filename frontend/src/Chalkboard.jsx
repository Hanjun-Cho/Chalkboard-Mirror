import { Navigate } from 'react-router-dom';
import Pitch from './Components/Pitch';
import Window from './Window';

function Chalkboard(props) {
  if (!props.matchData) {
    return <Navigate to="/"/>
  }

  return (
    <div className="chalkboard-container">
      <Pitch window={Window}/>
      <h1>{props.matchData["matchCentreData"]["home"]["name"]}</h1>
      <h1>{props.matchData["matchCentreData"]["away"]["name"]}</h1>
    </div>
  );
}

export default Chalkboard;
