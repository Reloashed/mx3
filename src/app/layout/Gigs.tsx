import { useEffect, useState } from "react";
import Card from "../components/GigCard";
import style from './Gigs.module.css'

export default function Gigs() {
  const [response, setResponse] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
    fetch(`https://api.srgssr.ch/mx3/v2/gigs?state_code=ZH`, {
      headers: {
        accept: "application/json",
        authorization: "Bearer 6AEY5cPdzGPUwCNW5kSQQkSSXGkS",
      },
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data.response.performances);
        setResponse(data.response.performances);
        setIsLoading(false);
      })
      .catch((reason) => {
        setIsLoading(false);
        console.log(reason);
        alert("There has been an Error!");
      });
    }, [])    

    return (
      <div>
        {isLoading && (
          <img
            src="https://i.gifer.com/ZKZg.gif"
            alt="Loading"
            width={"50rem"}
            style={{ filter: "invert(100%)" }}
          />
        )}
            <div className={style.response}>
            {response.map((performance: any) => (
                <Card image={performance.band.url_for_image_thumb} date={performance.date} location={performance.location} stage={performance.stage_name} title={performance.band_name} category={performance.band.categories}></Card>
            ))}
            </div>
        
      </div>
    );
  }

