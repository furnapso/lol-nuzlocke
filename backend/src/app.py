from os import environ

import uvicorn
from fastapi import FastAPI
from riotwatcher import LolWatcher

app = FastAPI()

RIOT_API_KEY = environ.get("RIOT_API_KEY")
lol = LolWatcher(RIOT_API_KEY)


@app.get("/champions")
async def champions(region):
    versions = lol.data_dragon.versions_for_region(region)
    champions_version = versions["n"]["champion"]
    return lol.data_dragon.champions(champions_version)


@app.get("/summonerChampions")
async def summoner_champions(region: str, summoner_name: str):
    summoner = lol.summoner.by_name(region, summoner_name)
    summoner_id = summoner["id"]
    return lol.champion_mastery.by_summoner("oc1", summoner_id)


if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)
