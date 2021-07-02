import json

import requests


class Api:

    def __init__(self):
        self.headers = {"Content-Type": "application/json",
                        "Accept": "application/json"}
        self.baseUrl = "http://devlight.local"

    def sendCustom(self, pattern, *id):
        r = None
        if id[0]:
            r = requests.patch(f'{self.baseUrl}/lights/{id[0]}/custom', data=json.dumps({"data": pattern}),
                               headers=self.headers)
        else:
            r = requests.patch(f'{self.baseUrl}/tags/ambilight/custom', data=json.dumps({"data": pattern}),
                               headers=self.headers)
        return r.status_code
