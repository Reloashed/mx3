import { useState } from "react";

export default function SearchBand() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [response, setResponse] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    setIsLoading(true);
    fetch(`https://api.srgssr.ch/mx3/v2/bands?query=${searchQuery}`, {
      headers: {
        accept: "application/json",
        authorization: "Bearer II0z0AlUb59tahAHLUWlGsSX89UK",
      },
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data.response.bands);
        setResponse(data.response.bands);
        setIsLoading(false);
      })
      .catch((reason) => {
        setIsLoading(false)
        console.log(reason)
        alert("There has been an Error!")
      })
  };

  return (
    <div>
      <form onSubmit={handleClick}>
        <input type="text" onChange={(e) => setSearchQuery(e.target.value)} />
        <button type="submit">Search</button>
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
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Genre</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {response.map((band: any, idx: number) => (
              <tr key={idx}>
                <td>{band.name}</td>
                <td>
                  {band.categories.map((category: any) =>
                    <p>{category.name}</p>
                  )}
                </td>
                <td>
                  <a href={band.permalink}>{band.permalink}</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
