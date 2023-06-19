import Role from "./Role";
export default function Roles({ roles, handleRoleClick, handleResetClick }) {
  const roleComponents = roles.map((role) => (
    <Role
      key={role.name}
      name={role.name}
      enabled={role.enabled}
      imageEnabled={role.imageEnabled}
      imageDisabled={role.imageDisabled}
      handleClick={handleRoleClick}
    ></Role>
  ));

  return (
    <>
      <h3 className="uk-text-center">Select Roles</h3>
      <div className="uk-container uk-column">
        <div className="uk-container uk-flex uk-flex-center">
          {roleComponents}
        </div>
        <hr className="uk-divider-icon"></hr>
        <div className="uk-container uk-flex uk-flex-center">
          <button className="uk-button uk-margin-right">Roll</button>
          <button
            className="uk-button uk-margin-left"
            onClick={handleResetClick}
          >
            Reset
          </button>
        </div>
      </div>
    </>
  );
}
