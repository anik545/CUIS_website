#!/usr/bin/python
import sys
sys.path.insert(0,'~/.local/lib/python2.7/site-packages')

from wsgiref.handlers import CGIHandler
from app import app
CGIHandler().run(app)

