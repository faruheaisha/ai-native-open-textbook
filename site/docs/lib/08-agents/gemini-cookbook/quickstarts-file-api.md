---
title: "Gemini File API Sample Client Code"
sourceId: "08-agents/gemini-cookbook"
sourceTitle: "Gemini API Cookbook"
sourceKind: "官方资料集"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/google-gemini/cookbook"
entryUrl: "https://github.com/google-gemini/cookbook/blob/a1b990c859a34823c982f70edaff35b830511c64/quickstarts/file-api/README.md"
sourceRel: "quickstarts/file-api/README.md"
rawUrl: "/raw/08-agents/gemini-cookbook/quickstarts/file-api/README.md"
sourceSha256: "4034ee5ced67ee5dc5d27484d495ba94bb179535e1ca0af4e1c3a37a59ad9a4a"
pageSha256: "4034ee5ced67ee5dc5d27484d495ba94bb179535e1ca0af4e1c3a37a59ad9a4a"
contentMode: "local-full"
zh: ""
---

# Gemini File API Sample Client Code

## Background
The Gemini File API provides a simple way for developers to upload files and use them with the Gemini API in multimodal scenarios. This repository shows how to use the File API to upload an image and include it in a `GenerateContent` call to the Gemini API.


> [!IMPORTANT]
> The File API is currently in beta and is [only available in certain regions](https://ai.google.dev/available_regions).

## Quickstarts
Ready to get started? Learn the essentials of uploading files and using them in GenerateContent requests to the Gemini API:

[File API Colab](https://github.com/google-gemini/cookbook/blob/main/quickstarts/File_API.ipynb)

[Audio Colab](https://github.com/google-gemini/cookbook/blob/main/quickstarts/Audio.ipynb)

[Video Colab](https://github.com/google-gemini/cookbook/blob/main/quickstarts/Video_understanding.ipynb)


## Python Sample
```
# Prepare a virtual environment for Python.
python3 -m venv venv
source venv/bin/activate

# Add API key to .env file
touch .env
echo "GOOGLE_API_KEY='YOUR_API_KEY'" >> .env

# Install dependencies.
pip3 install -U -r requirements.txt

# Run the sample code.
python3 sample.py
```

## Node.js Sample
```
# Make sure npm is installed first. 

# Add API key to .env file
touch .env
echo "GOOGLE_API_KEY='YOUR_API_KEY'" >> .env

# Install dependencies.
npm install

# Run the sample code.
npm start
```

## cURL Bash Script Sample
The following script will upload a file given the file path.
```
bash ./sample.sh -a "&lt;YOUR_KEY>" -i "sample_data/gemini_logo.png" -d "Gemini logo"
```
