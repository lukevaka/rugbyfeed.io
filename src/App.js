import { useState } from "react";

import Header from "./UI/Header/Header";
import SeasonStandings from "./components/SeasonStandings/SeasonStandings";

// const SEASON_STANDINGS = [
//   {
//     rank: 1,
//     team: "TOR",
//     record: "3-3",
//     points: 15,
//     pointsDiff: 58,
//   },
//   {
//     rank: 2,
//     team: "RUG",
//     record: "3-3",
//     points: 15,
//     pointsDiff: 17,
//   },
//   {
//     rank: 3,
//     team: "RUG",
//     record: "3-2",
//     points: 15,
//     pointsDiff: -43,
//   },
//   {
//     rank: 4,
//     team: "NOL",
//     record: "2-2",
//     points: 14,
//     pointsDiff: 11,
//   },
//   {
//     rank: 5,
//     team: "OLD",
//     record: "2-2",
//     points: 12,
//     pointsDiff: -5,
//   },
//   {
//     rank: 6,
//     team: "NEW",
//     record: "2-3",
//     points: 11,
//     pointsDiff: 4,
//   },
// ];

function App() {
  const [seasonStandings, setSeasonStandings] = useState([]);

  async function fetchSeasonStandingsHandler() {
    const response = await fetch(
      "http://api.sportradar.us/rugby-union/trial/v3/en/seasons/sr:season:82154/standings.json?api_key=8y3cv5swzhqczzs38cm92x5g"
    );
    const data = await response.json();
    console.log(response.json);

    const conferences = data.standings[0].groups.length;
    console.log(conferences);
    for (let i = 0; i < conferences; i++) {
      let transformedStandings = data.standings[0].groups[i].standings.map(
        (e) => {
          return {
            key: Math.random(),
            rank: e.rank,
            team: e.competitor.name,
            abb: e.competitor.abbreviation,
            record: `${e.win} - ${e.loss}`,
            points: e.points,
            pointsDiff: e.points_diff,
          };
        }
      );
      console.log(transformedStandings);
      setSeasonStandings((prevStandings) => 
        [transformedStandings, ...prevStandings]);
    }

    
  }
  return (
    <div className="background">
      <Header />
      <SeasonStandings
        onfetchSeasonStandings={fetchSeasonStandingsHandler}
        data={seasonStandings}
      />
    </div>
  );
}

export default App;
