import { useEffect, useState } from "react";
import Champions from "./components/Champions";
import NavBar from "./components/NavBar";
import Roles from "./components/Roles";
import RollResult from "./components/RollResult";
function App() {
  let BASE_URL = "";
  if (process.env.NODE_ENV == "development") {
    BASE_URL = "http://localhost:8000";
  }
  let [champions, setChampions] = useState([]);
  let [rolledChampion, setRolledChampion] = useState();
  let [roles, setRoles] = useState([
    {
      name: "Bottom",
      enabled: true,
      imageEnabled: "/images/icon-position-bottom.png",
      imageDisabled: "/images/icon-position-bottom-disabled.png",
    },
    {
      name: "Jungle",
      enabled: true,
      imageEnabled: "/images/icon-position-jungle.png",
      imageDisabled: "/images/icon-position-jungle-disabled.png",
    },
    {
      name: "Middle",
      enabled: true,
      imageEnabled: "/images/icon-position-middle.png",
      imageDisabled: "/images/icon-position-middle-disabled.png",
    },
    {
      name: "Top",
      enabled: true,
      imageEnabled: "/images/icon-position-top.png",
      imageDisabled: "/images/icon-position-top-disabled.png",
    },
    {
      name: "Support",
      enabled: true,
      imageEnabled: "/images/icon-position-utility.png",
      imageDisabled: "/images/icon-position-utility-disabled.png",
    },
  ]);

  useEffect(function getChampions() {
    fetch(BASE_URL + "/championSummary")
      .then((r) => r.json())
      .then((d) => {
        const _champions = d.slice();
        for (let index in _champions) {
          _champions[index].enabled = true;
          _champions[index].display = true;
        }

        let localChampions = localStorage.getItem("champions");
        if (localChampions != null) {
          localChampions = JSON.parse(localChampions);
          for (let champion in localChampions) {
            const index = _champions.findIndex(
              (el) => el.name == localChampions[champion].name
            );
            if (index != -1) {
              _champions[index].enabled = localChampions[champion].enabled;
              _champions[index].display = localChampions[champion].display;
            }
          }
        }
        setChampions(_champions);
        displayChampionsByRole();
      });
  }, []);

  useEffect(function getLocalRoles() {
    let rolesLocal = localStorage.getItem("roles");
    if (rolesLocal != null) {
      rolesLocal = JSON.parse(rolesLocal);
    }
    if (rolesLocal != null && rolesLocal.length > 0) {
      let _roles = roles.slice();
      for (let role in rolesLocal) {
        const roleIndex = _roles.findIndex(
          (r) => r.name == rolesLocal[role].name
        );
        if (roleIndex != -1) {
          _roles[roleIndex].enabled = rolesLocal[role].enabled;
        }
        setRoles(_roles);
      }
    }
  }, []);

  useEffect(
    function saveRoles() {
      if (roles != null && roles.length > 0) {
        localStorage.setItem("roles", JSON.stringify(roles));
      }
    },
    [roles]
  );

  useEffect(
    function saveChampions() {
      if (champions != null && champions.length > 0) {
        localStorage.setItem("champions", JSON.stringify(champions));
      }
    },
    [champions]
  );

  useEffect(displayChampionsByRole, [roles]);

  function handleChampionClick(championName) {
    const _champions = champions.slice();
    for (let champion in _champions) {
      if (championName == _champions[champion].name) {
        _champions[champion].enabled = !_champions[champion].enabled;
        break;
      }
    }
    setChampions(_champions);
  }

  function reset() {
    const _champions = champions.slice();
    for (let champion in _champions) {
      _champions[champion].enabled = true;
      _champions[champion].display = true;
    }

    const _roles = roles.slice();
    for (let role in _roles) {
      _roles[role].enabled = true;
    }

    setChampions(_champions);
    setRoles(_roles);
    setRolledChampion(null);
  }

  function rollChampion() {
    const enabledChampions = champions
      .slice()
      .filter((el) => el.enabled && el.display);
    const randomNumber = Math.floor(Math.random() * enabledChampions.length);
    setRolledChampion(enabledChampions[randomNumber]);
  }

  function handleLoss(championName) {
    const _champions = champions.slice();
    for (let champion in champions) {
      if (champions[champion].name == championName) {
        champions[champion].enabled = false;
        setRolledChampion(champions[champion]);
        break;
      }
    }
    setChampions(_champions);
  }

  function handleRoleClick(roleName) {
    const _roles = roles.slice();
    for (let role in _roles) {
      if (_roles[role].name == roleName) {
        _roles[role].enabled = !_roles[role].enabled;
        break;
      }
    }
    setRoles(_roles);
  }

  function displayChampionsByRole() {
    if (
      champions != null &&
      champions.length > 0 &&
      roles != null &&
      roles.length > 0
    ) {
      debugger;
      const enabledRoles = roles
        .filter((el) => el.enabled)
        .map((el) => el.name.toUpperCase());
      const _champions = champions.slice();
      for (let champion in _champions) {
        _champions[champion].display = _champions[champion].lanes.some(
          (el) => enabledRoles.indexOf(el) != -1
        );
      }
      setChampions(_champions);
    }
  }

  return (
    <>
      <NavBar></NavBar>
      <Roles
        roles={roles}
        handleRoleClick={handleRoleClick}
        handleResetClick={reset}
        handleRollClick={rollChampion}
      ></Roles>
      {rolledChampion != null && (
        <>
          <hr className="uk-divider-icon"></hr>
          <RollResult
            champion={rolledChampion}
            handleLoss={handleLoss}
          ></RollResult>
        </>
      )}
      <hr className="uk-divider-icon"></hr>
      <Champions
        champions={champions}
        handleChampionClick={handleChampionClick}
      ></Champions>
    </>
  );
}
export default App;
