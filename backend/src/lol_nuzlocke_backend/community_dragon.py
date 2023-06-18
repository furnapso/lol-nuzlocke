from typing import List

from cdragon.client import client
from constants import CHAMPION_DETAIL_PATH, CHAMPION_ICON_PATH, CHAMPION_SUMMARY_PATH
from exceptions import CommunityDragonException
from model.champion import Champion
from model.champion_detail import ChampionDetail
from pydantic import parse_obj_as
from wiki.lanes import LANES


def get_champion_summary() -> List[Champion]:
    response = client.get(CHAMPION_SUMMARY_PATH)
    if response.status_code != 200:
        raise CommunityDragonException(
            "Failed to get champion summary from community dragon"
        )

    return parse_obj_as(List[Champion], response.json())


def get_champion_detail(champion_id: int) -> ChampionDetail:
    response = client.get(CHAMPION_DETAIL_PATH.format(champion_id))
    if response.status_code != 200:
        raise CommunityDragonException(
            f"Failed to get champion detail from community dragon for champion id {champion_id}"
        )

    champion_detail = parse_obj_as(ChampionDetail, response.json())

    for lane in LANES:
        if lane.champion_name.lower() == champion_detail.name.lower():
            champion_detail.lanes = lane.roles

    return champion_detail


def get_champion_icon_url(champion_id: int) -> str:
    return CHAMPION_ICON_PATH.format(champion_id)
