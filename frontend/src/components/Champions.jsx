import { useEffect, useState } from "react";
import Champion from "./Champion";

export default function Champions() {
  let [champions, setChampions] = useState([]);

  function getData() {
    if (champions.length == 0) {
      fetch("http://localhost:8000/championSummary")
        .then((r) => r.json())
        .then((d) => {
          let _champions = d.slice();
          for (let i = 0; i < _champions.length; i++) {
            _champions[i].enabled = true;
          }
          setChampions(_champions);
        });
    }
  }

  useEffect(() => getData());

  const championElements = champions.map((champion) => (
    <Champion
      name={champion.name}
      key={champion.name}
      image={champion.squarePortraitPath}
      enabled={champion.enabled}
    ></Champion>
  ));

  return (
    <>
      <div className="uk-container">{championElements}</div>
    </>
  );
}
