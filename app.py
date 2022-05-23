from flask import Flask, render_template, request, jsonify
from datetime import datetime
import tensorflow as tf
import numpy as np
import os


app = Flask(__name__)


@app.route('/')
def home():
    return render_template('index.html')


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)




# 학습시킨 모델 불러오기 (0이면 고양이, 1이면 강아지)
model = tf.keras.models.load_model('static/model/model.h5')
app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload():
    file = request.files['file_give']
    title = request.form['title_give']
    extension = file.filename.split('.')[-1]
    today = datetime.now()
    mytime = today.strftime('%Y-%m-%d-%H-%M-%S')
    filename = f'{mytime}'
    save_to = f'static/img/catdog/{title}_{filename}.{extension}'
    file.save(save_to)

    return jsonify({'result':'success'})

@app.route('/search', methods=['POST'])
def search():
    title = request.form['title_give']
    filenames = os.listdir('static/img/catdog')
    matched_files = ['static/img/catdog/'+filename for filename in filenames if title in filename]
    result_dict = []
    for index, matched_file in enumerate(matched_files):
        image = tf.keras.preprocessing.image.load_img(matched_file, target_size=(256, 256))
        input_arr = tf.keras.preprocessing.image.img_to_array(image)
        input_arr = np.array([input_arr])
        predictions = model.predict(input_arr)
        if predictions[0][0] > 0.5:
            result = '강아지'
        else:
            result = '고양이'
        result_dict.append({'index': index, 'path':matched_file, 'result':result})
    return jsonify({'predictions': result_dict})



@app.route("/saveImage", methods=["POST"])
def web_post():
    sample_receive = request.form['sample_give']
    print(sample_receive)







if __name__ == '__main__':
    app.run('0.0.0.0', port=8000, debug=True)
