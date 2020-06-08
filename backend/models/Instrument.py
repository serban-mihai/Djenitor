# The software is supposed to work just with metal strings instruments
# that use Pickups as sound transporters, generally Electric Guitars
# and Electric Basses but other instruments should be compatible such
# as Acoustic Guitars and Banjos, but not Classical Guitars due to their
# nylon strings whom vibrations won't be detected by the coils

import numpy as np

# SHIFTED: These tunings are derived by systematic increases or decreases of
# the standard tuning.
# "Tuning Name": [6_string, 7_string, 8_string]
TUNING_FREQ = {
    "E":  [82.41, 61.74, 46.26],
    "Eb": [77.78, 58.27, 43.65],
    "D":  [73.42, 55.00, 41.20],
    "Db": [69.30, 51.91, 38.89],
    "C":  [65.41, 49.00, 36.71],
    "B":  [61.74, 46.26, 34.65],
    "Bb": [58.27, 43.65, 32.70],
    "A":  [55.00, 41.20, 30.87],
    "Ab": [51.91, 38.89, 29.14],
    "G":  [49.00, 36.71, 27.50],
    "Gb": [46.26, 34.65, 25.96],
    "F":  [43.65, 32.70, 24.50]
}


class Instrument(object):
    def __init__(self, strings, frets):
        super().__init__()
        self.strings = strings
        self.frets = frets + 1


class Guitar(Instrument):
    def __init__(self, strings, frets, tuning):
        super().__init__(strings, frets)
        self.tuning = tuning
        self.fretboard = self.build_dict_freatboard(round_freq=True)

    def build_fretboard(self, round_freq=False):
        SEMITONE_STEP = 2 ** (1/12)
        string_steps = [5, 5, 5, 4, 5]
        if(self.strings == 6):
            LOW_E_FREQ = TUNING_FREQ[self.tuning][0]
        elif(self.strings == 7):
            LOW_E_FREQ = TUNING_FREQ[self.tuning][1]
            string_steps[:0] = [5]
        elif(self.strings == 8):
            LOW_E_FREQ = TUNING_FREQ[self.tuning][2]
            string_steps[:0] = [5, 5]
        fret_freqs = []
        fret_freqs.append([LOW_E_FREQ * (SEMITONE_STEP ** n)
                           for n in range(self.frets)])
        for tuning_fret in string_steps:
            base_freq = fret_freqs[-1][tuning_fret]
            fret_freqs.append([base_freq * (SEMITONE_STEP ** n)
                               for n in range(self.frets)])
        fretboard = np.matrix(fret_freqs)
        if(round_freq):
            return fretboard.astype(int)
        else:
            return fretboard

    def build_dict_freatboard(self, round_freq=True):
        SEMITONE_STEP = 2 ** (1/12)
        string_steps = [5, 5, 5, 4, 5]
        if(self.strings == 6):
            LOW_E_FREQ = TUNING_FREQ[self.tuning][0]
            string_names = ["El", "Bl", "G", "D", "A", "Eh"]
        elif(self.strings == 7):
            LOW_E_FREQ = TUNING_FREQ[self.tuning][1]
            string_steps[:0] = [5]
            string_names = ["El", "Bl", "G", "D", "A", "Eh", "Bh"]
        elif(self.strings == 8):
            LOW_E_FREQ = TUNING_FREQ[self.tuning][2]
            string_steps[:0] = [5, 5]
            string_names = ["El", "Bl", "G", "D", "A", "Eh", "Bh", "F#"]
        fret_freqs = []
        fretboard = dict()
        fret_freqs.append([LOW_E_FREQ * (SEMITONE_STEP ** n)
                           for n in range(self.frets)])
        for tuning_fret in string_steps:
            base_freq = fret_freqs[-1][tuning_fret]
            fret_freqs.append([base_freq * (SEMITONE_STEP ** n)
                               for n in range(self.frets)])
        fret_swap = list(reversed(fret_freqs))
        for counter, name in enumerate(string_names, 0):
            if(round_freq):
                fretboard[name] = [int(freq) for freq in fret_swap[counter]]
            else:
                fretboard[name] = [freq for freq in fret_swap[counter]]
        return fretboard

    def print_info(self):
        info = f"About Guitar:\nStrings: {self.strings}\nTuning: {self.tuning}"
        info += f"FretBoard:\n{self.fretboard}"
        return info
