import os
from flask import Flask
from flask_socketio import SocketIO, join_room, leave_room, send, emit
from models.Teensy import Teensy
from models.Instrument import Guitar
import sys
sys.path.append(".")


app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("FLASK_SECRET")
socketio = SocketIO(app)

sensor = Teensy("/dev/ttyACM0", 2000000)
instrument = Guitar(6, 24, "E")


@app.route("/")
def hello_world():
    conn = sensor.connect()
    instrument.build_dict_freatboard(round_freq=False)
    about = instrument.print_info()
    return f"Connection: {conn}\nAbout Instrument: {about}"


@socketio.on('connect')
def test_connect():
    emit('my response', {'data': 'Connected'})


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
