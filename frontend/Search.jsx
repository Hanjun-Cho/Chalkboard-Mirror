import { useRef, useState } from "react";
import { Navigate } from "react-router-dom";

function Search(props) {
  const urlRef = useRef(null);
  const [hasSubmittedData, setHasSubmittedData] = useState(false);

  async function submitURL() {
    const options = {
      method: 'GET',
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}get_chalkboard_data?url=${urlRef.current?.value}`, options);
      const data = await res.json();
      props.setMatchData(data);
      setHasSubmittedData(true);
    }
    catch(err) {
      console.error(err);
    }
  }

  if (hasSubmittedData) {
    return <Navigate to="/chalkboard"/>
  }

  return (
    <div className="search-container">
      <h1>Enter Whoscored URL</h1>
      <input ref={urlRef} placeholder='whoscored url'/>
      <button onClick={submitURL}>Submit</button>

    </div>
  );
}

export default Search;
