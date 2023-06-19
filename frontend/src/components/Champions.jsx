import Champion from "./Champion";

export default function Champions({ champions, handleChampionClick }) {
  const championElements = champions.map((champion) => (
    <Champion
      name={champion.name}
      key={champion.name}
      image={champion.squarePortraitPath}
      enabled={champion.enabled}
      handleClick={handleChampionClick}
      display={champion.display}
    ></Champion>
  ));

  return (
    <>
      <div className="uk-container">{championElements}</div>
    </>
  );
}
