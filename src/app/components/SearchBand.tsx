import { Key, useEffect, useState } from "react";

export default function SearchBand() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [response, setResponse] = useState();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    setIsLoading(true);
    fetch(`https://api.srgssr.ch/mx3/v2/bands?query=${searchQuery}`, {
      headers: {
        accept: "application/json",
        authorization: "Bearer qbFdIAMIK9gGA9f2vWKFWieIvpxb",
      },
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data.response.bands);
        setResponse(data.response.bands);
        setIsLoading(false);
      });
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
            {response.map((band, idx) => (
              <tr key={idx}>
                <td>{band.name}</td>
                <td>
                  {band.categories.map((category) =>
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
