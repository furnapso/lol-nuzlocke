export default function RollResult({ champion, handleLoss }) {
  const style = {
    filter: champion.enabled ? "grayscale(0)" : "grayscale(1)",
  };
  return (
    <>
      <div className="uk-container uk-flex uk-flex-middle uk-flex-column">
        <h3 className="uk-title">{champion.name}</h3>
        <img src={champion.squarePortraitPath} style={style}></img>
        <div className="uk-container uk-margin uk-flex uk-flex-center uk-flex-space-between">
          <button
            className="uk-button uk-button-danger"
            onClick={() => handleLoss(champion.name)}
          >
            Loss
          </button>
        </div>
      </div>
    </>
  );
}
