'use client'

import Gigs from "./layout/Gigs";
import SearchBand from "./layout/SearchBand";

export default function Home() {
  return (
    <div>
      <h1>Nach Band suchen</h1>
      <SearchBand></SearchBand>
    </div>
  );
}
