<p align="center"><img src="https://user-images.githubusercontent.com/104331479/185329655-95f41df4-dec5-4e94-b6b8-471a0ef2deba.png" width="80%" height="80%"></p>

# <img src="https://user-images.githubusercontent.com/104331479/185330319-86af99b3-0eb2-4a75-a0c4-2b36808a3734.png" width="30" height="30"/> Jellymodi
Object detection을 사용해 얼굴을 인식하고 인식한 얼굴에서 표정을 분류해 해당하는

젤리 아이콘으로 바꿔주는 mood tracker 기법의 일기 작성 웹사이트

# 🍮Intro
* mood tracker 기법을 사용하는 일기 작성 서비스
* 사물 인식을 이용해 사람 얼굴을 인식
* 전이학습을 적용해 만든 한국인 얼굴 표정 분류 모델로 인식한 사람의 표정을 분류
* **개발 기간**: 2022.05.18 ~ 2022.05.24
* **개발 인원(4명)**: 김동근, 노을, 이정아, 이현경
* **Team Repository** <a href="https://github.com/cmjcum/Jellymodi_team"><img src="https://img.shields.io/badge/Github-000000?style=flat-square&logo=github&logoColor=white"/></a>
* **S.A** <a href="https://cold-charcoal.tistory.com/68">블로그로 이동(☞ﾟヮﾟ)☞</a>

# 📆Project
### 사용 기술
* Python 3.8
* Flask
* MongoDB

### 핵심 기능
사진에서 얼굴을 인식하고 제작한 모델을 이용해 표정을 분류해서 알맞은 젤리 아이콘으로 변경하고 일기 작성
* 사진에서 얼굴 인식 및 표정 분류
* 작성한 일기 CRUD
* JWT 이용한 로그인
* 반응형 웹

### 맡은 부분
<details>
<summary>데이터 전처리</summary>

AIHub에서 데이터를 받아오긴 했지만 총 7개의 감정이 있었고 살펴보니 분류가 잘 되지 않은 사진도 있고 대부분 배경이 많이 보이는 사진이었습니다. 따라서 사진을 올바르게 분류하고 각 사진들에서 얼굴만 잘라내는 작업이 필요했습니다. 얼굴 검출에는 openCV의 캐스케이드 분류기를 사용했습니다.
```python
import cv2
import glob

# haarcascade 불러오기
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
images = glob.glob('images/*')
result_list = []
for i in images:
    temp = i.replace("\\", "/")
    result_list.append(temp)
print("result_list = ", end=""), print(result_list)

# 이미지 불러오기
for image in result_list:
    if "jpg" in image:
        ori_img = cv2.imread(image)
        ori_img = cv2.resize(ori_img, dsize=(0, 0), fx=0.4, fy=0.4, interpolation=cv2.INTER_AREA)
        gray = cv2.cvtColor(ori_img, cv2.COLOR_BGR2GRAY)
        
        # 얼굴 찾기
        faces = face_cascade.detectMultiScale(gray, 1.2 , minSize=(200,200))
        
        cnt = 0
        for (x, y, w, h) in faces:
            img_x1 = x
            img_x2 = x + w
            img_y1 = y
            img_y2 = y + h
            img = ori_img[img_y1:img_y2, img_x1:img_x2]
            image_file_name = image.split('.')
            
            file_name = image_file_name[0]
            extension = image_file_name[1]
            file_name += str(cnt)
            filename = 'images/face/' + file_name + '.' + extension
            
            cv2.imwrite(filename, img)
            cnt += 1
```
왼쪽 이미지가 오른쪽과 같이 저장됩니다.
![image](https://user-images.githubusercontent.com/71905164/186595107-144c6550-f160-41ed-8904-466bb57bb55b.png)
</details>
<details>
<summary>표정 분류 모델 제작</summary>

데이터셋은 라벨이 총 7개였는데 우리는 학습의 정확도를 높이기 위해 기쁨, 분노, 슬픔, 중립 4개의 라벨만을 사용하기로 했습니다. 전이학습을 이용했습니다. 정확도는 약 0.90입니다.
```python
from tensorflow.keras.applications.inception_v3 import InceptionV3

input = Input(shape=(224, 224, 3))
base_model = InceptionV3(weights='imagenet', include_top=False, input_tensor=input, pooling='max')

x = base_model.output
x = Dropout(rate=0.25)(x)
x = Dense(64, activation='relu')(x)
x = Dense(256, activation='relu')(x)
x = Dense(64, activation='relu')(x)
x = Dense(32, activation='relu')(x)
x = Dense(8, activation='relu')(x)
output = Dense(4, activation='softmax')(x)

model = Model(inputs=base_model.input, outputs=output)
model.compile(loss='categorical_crossentropy', optimizer=Adam(lr=0.001), metrics=['acc'])
```
</details>
<details>
<summary>사용자가 입력한 사진 젤리 아이콘으로 변경 <a href="https://github.com/zeonga1102/Jellymodi_team/blob/master/api/post.py#L35">📑코드</a></summary>

사용자가 사진을 선택하면 그 사진에서 얼굴을 검출하고 제작한 모델로 표정을 분류해서 젤리 아이콘으로 바꿔 보여줍니다.
</details>
<details>
<summary>일기 작성 <a href="https://github.com/zeonga1102/Jellymodi_team/blob/master/api/post.py#L51">📑코드</a></summary>

사용자가 작성한 일기 내용과 사진, 얼굴 표정에 알맞은 젤리 아이콘을 저장합니다.
</details>
<details>
<summary>일기 조회, 삭제, 수정 <a href="https://github.com/zeonga1102/Jellymodi_team/blob/master/api/detail.py#L11">📑코드</a></summary>

사용자가 작성한 일기의 상세 정보를 조회하고 수정과 삭제를 합니다.<br>
단 수정은 일기의 내용만 할 수 있고 첨부한 사진이나 젤리 아이콘은 수정할 수 없습니다.
</details>

### ERD
![image](https://user-images.githubusercontent.com/71905164/186601476-8fe8385d-8390-4747-9240-915795ca906c.png)

# 🛠Troubleshooting

# 🖋회고

# ✍Credit
* 한국인 감정인식을 위한 복합 영상 [AIHub](https://aihub.or.kr/aihubdata/data/view.do?currMenu=115&topMenu=100&aihubDataSe=realm&dataSetSn=82)
