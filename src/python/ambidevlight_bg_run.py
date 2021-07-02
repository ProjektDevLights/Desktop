import sys
import threading

from api import Api
from imageReader import ImageReader
from mss import mss
from PIL import Image

api = Api()
sct = mss()


def showMonOnStrip(mon, leds, id):
    sct_img = sct.grab(mon)
    img = Image.frombytes('RGB', sct_img.size, sct_img.bgra, "raw", "BGRX")
    imr = ImageReader(img, leds)
    colors = imr.getEdgeArray()
    data = [{'repeat': 1, 'leds': colors}]
    api.sendCustom(data, id)


def loop(mon, leds, id):
    ticker = threading.Event()
    while not ticker.wait(0.1):
        showMonOnStrip(mon, leds, id)


# args: file x y width height leds_horizontal leds_vertical id
show_mon = {"left": int(sys.argv[1]), "top": int(sys.argv[2]),
            "width": int(sys.argv[3]), "height": int(sys.argv[4])}
loop(show_mon, (int(sys.argv[5]), int(sys.argv[6])), sys.argv[7])
