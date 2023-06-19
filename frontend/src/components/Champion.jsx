export default function Champion({ name, image, enabled, handleClick }) {
  const style = {
    filter: enabled ? "grayscale(0)" : "grayscale(1)",
  };
  return (
    <>
      <a>
        <img
          src={image}
          alt={name}
          title={name}
          height="50"
          width="50"
          style={style}
          onClick={handleClick}
        ></img>
      </a>
    </>
  );
}
