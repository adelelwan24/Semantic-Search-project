import sys


def Exception_Info(len: int = 80):
    print('#' * len, sys.exc_info(), '#' * len, sep='\n')
