import sys
import platform
import os
import shutil
import psutil
from threading import active_count
from time import time
from string import printable
from json import dumps

Mb = 1024 * 1024
Gb = Mb * 1024

computer_name = platform.node()

user_spec = f'{os.getlogin()} ({os.path.expanduser("~")})'

disk_usage = shutil.disk_usage('/')
disk_usage_total = round(disk_usage.total / Gb, 2)
disk_usage_used = round(disk_usage.used / Gb, 2)
disk_usage_free = round(disk_usage.free / Gb, 2)

memory_usage = psutil.virtual_memory()
memory_usage_total = round(memory_usage.total / Gb, 2)
memory_usage_used = round(memory_usage.used / Gb, 2)
memory_usage_free = round(memory_usage.free / Gb, 2)

cpu_spec = f'{psutil.cpu_percent()}% ({os.cpu_count()})'

def performance_test():
    start_time = time()
    for _ in range(Mb): pass
    performance = int(100 - (time() - start_time) * 1000)
    return performance if performance > 0 else 0

print(dumps([
    computer_name,
    user_spec,
    f'T: {disk_usage_total} Gb - U: {disk_usage_used} Gb - F: {disk_usage_free} Gb',
    f'T: {memory_usage_total} Gb - U: {memory_usage_used} Gb - F: {memory_usage_free} Gb',
    str(f'{cpu_spec}'),
    str(performance_test())
]))

sys.stdout.flush()