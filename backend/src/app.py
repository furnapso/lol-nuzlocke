from os import environ

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from riotwatcher import LolWatcher

app = FastAPI()
origins = ["http://localhost:3000", "localhost:3000"]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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


# @app.get("/championImage")
# async def champion_image(image_id):
#     return lol.da


if __name__ == "__main__":
    profile_icons = lol.data_dragon.profile_icons
    print("Hello")
    # uvicorn.run(app, host="localhost", port=8000)
