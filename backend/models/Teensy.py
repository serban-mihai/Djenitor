from colorama import Fore, Style
import serial
import json


class Teensy(object):
    def __init__(self, port, baudrate=2000000):
        super().__init__()
        self.port = port
        self.baudrate = baudrate
        self.teensy = None

    def connect(self):
        try:
            teensy = serial.Serial(self.port, self.baudrate, timeout=5)
            return "Connected!"
        except Exception as err:
            print(f"{Fore.RED}Exception: {Fore.YELLOW}{err}{Style.RESET_ALL}")
            return "Failed Connecting!"

    def disconnect(self):
        if(self.teensy):
            self.teensy = None
            return "Disconnected!"
        else:
            return "Already Disconnected!"

    def json_read(self):
        if(self.teensy):
            try:
                return json.loads(self.teensy.readline())
            except Exception as err:
                return {"Status": "Error", "Message": f"{err}"}
