import { useEffect, useState } from "react";
import { Search } from "./Search";

function App() {
  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    async function getImages() {
      try {
        let fetchAPI = await fetch(`https://kuze.neon-sole.ts.net/images`);
        let jsonHolder = await fetchAPI.json();
        setImageData(jsonHolder);
      } catch (err) {
        console.log(err);
      }
    }
    getImages();
  }, []);

  return (
    <>
      <br />
      <Search setImageData={setImageData} />
      <div className="flexMe">
        <div className="imageBox" key={imageData}>
          <p>{imageData.id}</p>
        </div>
      </div>
    </>
  );
}

export default App;
