from enum import Enum
from typing import List, NamedTuple

import requests
from bs4 import BeautifulSoup, Tag
from constants import LOL_WIKI_ROLES_PATH, REQUEST_TIMEOUT
from pydantic import BaseModel


class Role(NamedTuple):
    name: str
    row_index: int


class Roles(Enum):
    TOP = Role("TOP", 1)
    JUNGLE = Role("JUNGLE", 2)
    MID = Role("MID", 3)
    BOTTOM = Role("BOTTOM", 4)
    SUPPORT = Role("SUPPORT", 5)


class ChampionRole(BaseModel):
    champion_name: str
    roles: List[str]


response = requests.get(LOL_WIKI_ROLES_PATH, timeout=REQUEST_TIMEOUT)
ROLES: List[ChampionRole] = []


if response.status_code == 200:
    soup = BeautifulSoup(response.content, "html.parser")
    champion_table = soup.find("table", attrs={"class": "article-table"})
    if isinstance(champion_table, Tag):
        for index, row in enumerate(champion_table.find_all("tr")):
            if index == 0:
                continue
            cells = row.find_all("td")
            champion_name = cells[0]["data-sort-value"]
            champion_roles: List[str] = []
            for role in Roles:
                if "data-sort-value" in cells[role.value.row_index].attrs.keys():
                    champion_roles.append(role.value.name)
            ROLES.append(
                ChampionRole(champion_name=champion_name, roles=champion_roles)
            )
