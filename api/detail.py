from flask import Flask, render_template, Blueprint
from bson.objectid import ObjectId

from pymongo import MongoClient

bp = Blueprint('detail', __name__, url_prefix='/detail')

@bp.route('/<post_id>')
def show_detail(post_id):
    post_info = db.posts.find_one({'_id': ObjectId(post_id)})
    post_info['_id'] = str(post_info['_id'])
    return render_template('detail.html', post_info=post_info)