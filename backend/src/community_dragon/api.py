import requests

from .constants import CHAMPION_DATA, CHAMPION_IMAGE, CHAMPION_SUMMARY


def get_champion_summary() -> dict:
    return requests.get(CHAMPION_SUMMARY).json()


def get_champion_image(id: int):
    return f"{CHAMPION_IMAGE}{id}.png"


def get_champion_by_name(name: str) -> dict:
    champion_summary = get_champion_summary()
    name = name.upper().trim()
    for champion in champion_summary:
        if (
            champion["name"].upper().trim() == name
            or champion["alias"].upper().trim() == name
        ):
            found_champion = champion

    if found_champion is not None:
        return requests.get(CHAMPION_DATA + champion["id"] + ".json")


def get_champion_by_id(id: int) -> dict:
    champion_summary = get_champion_summary()
    for champion in champion_summary:
        if champion["id"] == id:
            found_champion = champion

    if found_champion is not None:
        return requests.get(CHAMPION_DATA + champion["id"] + ".json")
