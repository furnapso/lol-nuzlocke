import logging
import os
from typing import Optional

import community_dragon
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from wiki.lanes import LANES

ENVIRONMENT = os.getenv("NUZLOCKE_ENVIRONMENT")
ORIGINS_HOST = os.getenv("NUZLOCKE_ORIGINS_HOST")
origins: Optional[list[str]] = None

app = FastAPI()
logging.basicConfig()

logger = logging.getLogger("app.py")


@app.get("/championSummary")
async def champion_summary():
    return community_dragon.get_champion_summary()


@app.get("/championDetail/{champion_id}")
async def champion_detail(champion_id: int):
    return community_dragon.get_champion_detail(champion_id)


@app.get("/championIcon/{champion_id}")
async def champion_icon(champion_id: int):
    return community_dragon.get_champion_icon_url(champion_id)


@app.get("/championRoles")
async def champion_roles():
    return LANES


if ENVIRONMENT == "PROD":
    logger.info("Environment is PROD, mounting static files")
    app.mount("/", StaticFiles(directory="frontend", html=True), name="static")

    if ORIGINS_HOST is not None:
        logger.info("Adding origins host for prod server")
        origins = [ORIGINS_HOST]

else:
    logger.info(
        "Environment is non-prod, adding cross-origins configuration for node dev server"
    )
    origins = ["http://localhost:5173"]

if origins is not None and len(origins) > 0:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
