from flask import Flask, Blueprint, render_template, request, jsonify, redirect, url_for, Blueprint, session
import jinja2
import jwt
import datetime
import hashlib

from api import login, detail
from pymongo import MongoClient
client = MongoClient('localhost', 27017)
db = client.jellymodi

SECRET_KEY = "JELLY"

bp = Blueprint('post', __name__, url_prefix='/post')



@bp.route('/api/post')
def post_page():
    print('here')
    return render_template('post.html')

