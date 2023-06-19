import { useEffect, useState } from "react";
import Champions from "./components/Champions";
import NavBar from "./components/NavBar";
import Roles from "./components/Roles";
function App() {
  let [champions, setChampions] = useState([]);

  const defaultRoles = [
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
  ];

  let localStorageRoles = localStorage.getItem("roles");
  let [roles, setRoles] = useState(
    localStorageRoles == null ? defaultRoles : JSON.parse(localStorageRoles)
  );

  function handleRoleClick(role) {
    let _roles = roles.slice();

    for (let i = 0; i < _roles.length; i++) {
      if (_roles[i].name == role) {
        _roles[i].enabled = !_roles[i].enabled;
        break;
      }
    }

    setRoles(_roles);
    setRolesLocalStorage();
    displayChampionsByRole(champions);
  }

  function displayChampionsByRole(champions) {
    let enabledRoles = roles
      .filter((el) => el.enabled)
      .map((el) => el.name.toUpperCase());
    let _champions = champions.slice();

    for (let i = 0; i < _champions.length; i++) {
      if (!_champions[i].lanes.some((el) => enabledRoles.indexOf(el) != -1)) {
        _champions[i].display = false;
      } else {
        _champions[i].display = true;
      }
    }

    setChampions(_champions);
  }

  function setRolesLocalStorage() {
    localStorage.setItem("roles", JSON.stringify(roles));
  }

  function getData() {
    if (champions.length == 0) {
      fetch("http://localhost:8000/championSummary")
        .then((r) => r.json())
        .then((d) => {
          const _champions = d.slice();
          for (let i = 0; i < _champions.length; i++) {
            _champions[i].enabled = true;
            _champions[i].display = true;
          }
          console.log(getEnabledRoles());
          const localStorageChampions = getLocalStorageChampions();
          if (localStorageChampions != null) {
            for (let i = 0; i < localStorageChampions.length; i++) {
              let championIndex = _champions.findIndex(
                (el) => el.name == localStorageChampions[i].name
              );
              if (championIndex != -1) {
                _champions[i].enabled = localStorageChampions[i].enabled;
              }
            }
          }
          setChampions(_champions);
          setLocalStorageChampions(_champions);
          displayChampionsByRole(_champions);
        });
    }
  }

  function getEnabledRoles() {
    return roles.filter((el) => el.enabled == true);
  }

  function handleChampionClick(championName) {
    let _champions = champions.slice();
    let championIndex = _champions.findIndex((el) => el.name == championName);
    if (championIndex != -1) {
      _champions[championIndex].enabled = !_champions[championIndex].enabled;
    }
    setChampions(_champions);
    setLocalStorageChampions(_champions);
  }

  function getLocalStorageChampions() {
    let localStorageChampions = localStorage.getItem("champions");
    if (localStorageChampions != null) {
      return JSON.parse(localStorageChampions);
    }
  }

  function setLocalStorageChampions(champions) {
    localStorage.setItem("champions", JSON.stringify(champions));
  }

  useEffect(() => getData());

  function reset() {
    let _champions = champions.slice();
    for (let i = 0; i < _champions.length; i++) {
      _champions[i].enabled = true;
      _champions[i].display = true;
    }

    let _roles = roles.slice();
    for (let i = 0; i < _roles.length; i++) {
      _roles[i].enabled = true;
    }

    setChampions(_champions);
    setRoles(_roles);
    setLocalStorageChampions(_champions);
    setRolesLocalStorage();
  }

  return (
    <>
      <NavBar></NavBar>
      <Roles
        roles={roles}
        handleRoleClick={handleRoleClick}
        handleResetClick={reset}
      ></Roles>
      <hr className="uk-divider-icon"></hr>
      <Champions
        champions={champions}
        handleChampionClick={handleChampionClick}
      ></Champions>
    </>
  );
}
export default App;
