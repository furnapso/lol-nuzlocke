import requests
from constants import COMMUNITY_DRAGON_BASE_URL, REQUEST_TIMEOUT


class Client:
    base_url: str

    def __init__(self, base_url: str) -> None:
        self.base_url = base_url

    def get(self, endpoint: str) -> requests.Response:
        return requests.get(self.base_url + endpoint, timeout=REQUEST_TIMEOUT)


client = Client(COMMUNITY_DRAGON_BASE_URL)
