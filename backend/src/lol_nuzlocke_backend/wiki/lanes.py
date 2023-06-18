from enum import Enum
from typing import List, NamedTuple

import requests
from bs4 import BeautifulSoup, Tag
from constants import LOL_WIKI_ROLES_PATH, REQUEST_TIMEOUT
from pydantic import BaseModel


class Lane(NamedTuple):
    name: str
    row_index: int


class Lanes(Enum):
    TOP = Lane("TOP", 1)
    JUNGLE = Lane("JUNGLE", 2)
    MID = Lane("MID", 3)
    BOTTOM = Lane("BOTTOM", 4)
    SUPPORT = Lane("SUPPORT", 5)


class ChampionLanes(BaseModel):
    champion_name: str
    roles: List[str]


response = requests.get(LOL_WIKI_ROLES_PATH, timeout=REQUEST_TIMEOUT)
LANES: List[ChampionLanes] = []


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
            for lane in Lanes:
                if "data-sort-value" in cells[lane.value.row_index].attrs.keys():
                    champion_roles.append(lane.value.name)
            LANES.append(
                ChampionLanes(champion_name=champion_name, roles=champion_roles)
            )
