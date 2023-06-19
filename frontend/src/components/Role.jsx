export default function Role({
  name,
  enabled,
  imageEnabled,
  imageDisabled,
  handleClick,
}) {
  return (
    <>
      <a>
        <img
          key={name}
          src={enabled ? imageEnabled : imageDisabled}
          alt={name}
          title={name}
          height="80"
          width="80"
          onClick={() => handleClick(name)}
        ></img>
      </a>
    </>
  );
}
