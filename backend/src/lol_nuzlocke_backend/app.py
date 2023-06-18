import community_dragon
from fastapi import FastAPI
from wiki.roles import ROLES

app = FastAPI()


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
    return ROLES
