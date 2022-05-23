from flask import Flask, render_template, Blueprint

bp = Blueprint('detail', __name__, url_prefix='/detail')

@bp.route('/')
def show_detail():
    print('here')
    return render_template('detail.html')