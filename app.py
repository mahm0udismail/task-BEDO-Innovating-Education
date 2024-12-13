from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array
import numpy as np
import os
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

model = load_model('CatAndDogClassifier.h5')

def preprocess_image(image_path, target_size=(150, 150)):
    img = load_img(image_path, target_size=target_size)
    img_array = img_to_array(img)
    img_array = img_array / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

@app.route('/predict', methods=['POST'])
def predict_image():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    filepath = os.path.join('uploads', file.filename)
    file.save(filepath)

    img_array = preprocess_image(filepath)
    prediction = model.predict(img_array)
    
    class_label = 'Dog' if prediction[0] > 0.5 else 'Cat'
    confidence = float(prediction[0][0]) if class_label == 'Dog' else 1 - float(prediction[0][0])

    return jsonify({
        'class': class_label,
        'confidence': round(confidence, 2)
    })

if __name__ == '__main__':
    app.run(debug=True)
