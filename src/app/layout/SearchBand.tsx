import { useState } from "react";
import style from "./SearchBand.module.css";
import Card from "../components/Card";

export default function SearchBand() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [response, setResponse] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [empty, setEmpty] = useState<boolean>(false);

  const handleClick = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setEmpty(false)

    setIsLoading(true);
    fetch(`https://api.srgssr.ch/mx3/v2/bands?query=${searchQuery}`, {
      headers: {
        accept: "application/json",
        authorization: "Bearer 6AEY5cPdzGPUwCNW5kSQQkSSXGkS",
      },
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data.response.bands);
        setResponse(data.response.bands);
        setIsLoading(false);
        testEmpty(data.response.bands)
      })
      .catch((reason) => {
        setIsLoading(false);
        console.log(reason);
        alert("There has been an Error!");
      });
  };

  function testEmpty(response: string | any[]) {
    if (response.length == 0) {
      setEmpty(true)
    } else {
      setEmpty(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleClick}>
        <input type="text" onChange={(e) => setSearchQuery(e.target.value)} />
        <button type="submit" onClick={handleClick}>
          Search
        </button>
      </form>

      {isLoading && (
        <img
          src="https://i.gifer.com/ZKZg.gif"
          alt="Loading"
          width={"50rem"}
          style={{ filter: "invert(100%)" }}
        />
      )}
      {response && (
          <div className={style.response}>
            {response.map((band: any) => (
              <Card image={band.image} title={band.name} category={band.categories} link={band.permalink}></Card>
            ))}
          </div>
      )}
      {empty ? 
        <p>Nothing found.</p> :
        <p></p>
      }
    </div>
  );
}
