import logging
import sys
from os import environ

import community_dragon.api as data_dragon
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend
from fastapi_cache.decorator import cache
from redis import asyncio as aioredis
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
logging.basicConfig(stream=sys.stdout, level=logging.INFO)
logger = logging.getLogger(__name__)


@cache
@app.get("/champions")
async def champions():
    return data_dragon.get_champion_summary()


@cache
@app.get("/summonerChampions")
async def summoner_champions(region: str, summoner_name: str):
    summoner = lol.summoner.by_name(region, summoner_name)
    summoner_id = summoner["id"]
    return lol.champion_mastery.by_summoner(region, summoner_id)


@app.on_event("startup")
async def startup():
    redis = aioredis.from_url(
        "redis://localhost", encoding="utf8", decode_responses=True
    )
    FastAPICache.init(RedisBackend(redis), prefix="fastapi-cache")


if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)
