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

          let localChampions = localStorage.getItem("champions");
          if (localChampions != null) {
            localChampions = JSON.parse(localChampions);
            for (let i = 0; i < localChampions.length; i++) {
              let championIndex = _champions.findIndex(
                (el) => el.name == localChampions[i].name
              );
              if (championIndex != -1) {
                _champions[championIndex].enabled = localChampions[i].enabled;
              }
            }
          }

          setChampions(_champions);
          localStorage.setItem("champions", JSON.stringify(_champions));
        });
    }
  }

  function handleClick(champion) {
    let _champions = champions.slice();
    let championIndex = _champions.findIndex((el) => el.name == champion);
    if (championIndex != -1) {
      _champions[championIndex].enabled = !_champions[championIndex].enabled;
    }
    setChampions(_champions);
    localStorage.setItem("champions", JSON.stringify(_champions));
  }

  useEffect(() => getData());

  const championElements = champions.map((champion) => (
    <Champion
      name={champion.name}
      key={champion.name}
      image={champion.squarePortraitPath}
      enabled={champion.enabled}
      handleClick={handleClick}
    ></Champion>
  ));

  return (
    <>
      <div className="uk-container">{championElements}</div>
    </>
  );
}
