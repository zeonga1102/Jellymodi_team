from flask import Flask, render_template, request, jsonify, redirect, url_for, Blueprint
from pymongo import MongoClient
from datetime import datetime
import jinja2

client = MongoClient('####')
db = client.dbjellymodi

# Flask 객체 인스턴스 생성
app = Flask(__name__)


@app.route('/')
def show_list():
    posts = list(db.posts.find({}).sort('date', -1))

    temp = {}
    for post in posts:
        try:
            temp[post['date'].strftime('%Y %B')].append(post)

        except:
            temp[post['date'].strftime('%Y %B')] = [post]

    return render_template('index.html', temp=temp)


if __name__ == "__main__":
    app.run(debug=True)
    # host 등을 직접 지정하고 싶다면
    # app.run(host="0.0.0.0", port="5000", debug=True)