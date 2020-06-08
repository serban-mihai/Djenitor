import os
import time
import json
from colorama import Fore, Style
from flask import Flask
from threading import Thread
from flask_cors import CORS
from flask_socketio import SocketIO, join_room, leave_room, send, emit
from .models.Teensy import Teensy
import sys
sys.path.append(".")

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("FLASK_SECRET")
socketio = SocketIO(app, cors_allowed_origins="*")

teensy = Teensy("/dev/ttyACM0", 2000000)


@socketio.on('connect')
def handle_connect():
    print("New client connected!")
    emit('connected', {'data': 'Connected'})

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')


if(__name__ == "__main__"):
    socketio.run(app, debug=True)
