import community_dragon
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from wiki.lanes import LANES

origins = ["http://localhost:5173"]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
