import os
from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO, join_room, leave_room, send, emit
from models.Teensy import Teensy
from models.Instrument import Guitar
import sys
sys.path.append(".")


app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("FLASK_SECRET")
socketio = SocketIO(app, cors_allowed_origins="*")
CORS(app)

sensor = Teensy("/dev/ttyACM0", 2000000)
instrument = Guitar(6, 24, "E")

conn = sensor.connect()


@socketio.on('connect')
def test_connect():
    print("New client connected!")
    emit('notes', {'data': 'Connected'})


@socketio.on('disconnect')
def test_disconnect():
    print('Client disconnected')


@socketio.on('join')
def on_join(data):
    username = data['username']
    room = data['room']
    join_room(room)
    send(username + ' has entered the room.', room=room)


@socketio.on('leave')
def on_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    send(username + ' has left the room.', room=room)


if(__name__ == "__main__"):
    socketio.run(app, debug=True)
