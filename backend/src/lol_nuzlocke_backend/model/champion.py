from __future__ import annotations

from typing import List

from pydantic import BaseModel


class Champion(BaseModel):
    id: int
    name: str
    alias: str
    squarePortraitPath: str
    roles: List[str]
