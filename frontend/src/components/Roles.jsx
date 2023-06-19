import { useEffect, useState } from "react";
import Role from "./Role";
export default function Roles() {
  let [roles, setRoles] = useState([
    {
      name: "Bottom",
      enabled: true,
      imageEnabled: "src/assets/icon-position-bottom.png",
      imageDisabled: "src/assets/icon-position-bottom-disabled.png",
    },
    {
      name: "Jungle",
      enabled: true,
      imageEnabled: "src/assets/icon-position-jungle.png",
      imageDisabled: "src/assets/icon-position-jungle-disabled.png",
    },
    {
      name: "Middle",
      enabled: true,
      imageEnabled: "src/assets/icon-position-middle.png",
      imageDisabled: "src/assets/icon-position-middle-disabled.png",
    },
    {
      name: "Top",
      enabled: true,
      imageEnabled: "src/assets/icon-position-top.png",
      imageDisabled: "src/assets/icon-position-top-disabled.png",
    },
    {
      name: "Support",
      enabled: true,
      imageEnabled: "src/assets/icon-position-utility.png",
      imageDisabled: "src/assets/icon-position-utility-disabled.png",
    },
  ]);

  function handleClick(role) {
    let _roles = roles.slice();

    for (let i = 0; i < _roles.length; i++) {
      if (_roles[i].name == role) {
        _roles[i].enabled = !_roles[i].enabled;
        break;
      }
    }

    setRoles(_roles);
    setData();
  }

  function getData() {
    let localRoles = localStorage.getItem("roles");
    if (localRoles != null) {
      setRoles(JSON.parse(localRoles));
    }
  }

  function setData() {
    localStorage.setItem("roles", JSON.stringify(roles));
  }

  useEffect(() => getData());

  const roleComponents = roles.map((role) => (
    <Role
      key={role.name}
      name={role.name}
      enabled={role.enabled}
      imageEnabled={role.imageEnabled}
      imageDisabled={role.imageDisabled}
      handleClick={handleClick}
    ></Role>
  ));

  return (
    <>
      <h3 class="uk-text-center">Select Roles</h3>
      <div class="uk-container uk-column">
        <div class="uk-container uk-flex uk-flex-center">{roleComponents}</div>
        <hr class="uk-divider-icon"></hr>
        <div class="uk-container uk-flex uk-flex-center">
          <button class="uk-button">Roll</button>
        </div>
      </div>
    </>
  );
}
