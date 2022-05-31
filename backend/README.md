# REST APIs for Grab Bootcamp 2022 - NER

## **Prerequisite**
MongoDB is installed

## **Install**
``` 
pip install -r requirements.txt 
```

## **Run the server**
``` 
python app.py 
```

## **Get NER prediction from text**

Request: **POST**: [/ner]()
```json 
{  
    "text": <str>  
}
```
Response:
```json
{
    "entities_count": {
        "LOC": <int>,
        "MISC": <int>,
        "ORG": <int>,
        "PER": <int>
    },
    "predictions": [
        {
            "color": <hexadecimal color>,
            "start": <int>,
            "end": <int>,
            "entity_group": <str>,
            "score": <float64>,
            "word": <str>
        },
        ...
    ],
    "processed_text": <str>
},
200
```

## **Register**

Request: **POST**: [/register]()
```json 
{  
    "username": <str>,
    "email": <str>,
    "password": <str>  
}
```
Response:
```
'User created successfully', 200
```
or
```
'Email is not valid', 401
```
or
```
'Email is already used', 409
```
or
```
'Error in creating new user', 500
```

## **Login**

Request: **POST**: [/login]()
```json 
{  
    "email": <str>,
    "password": <str>  
}
```
Response:
```json
{
    "access_token": <str, JSON Web Tokens>
},
200
```
or
```
'The email or password is incorrect', 403
```

## **Get all annotations histories of a user**

Request: **GET**: [/histories]()
- Header must contains ```Authentication: {access_token}```

Response:
```json
{
    "histories": [
        {
            "time": <str, datetime>,
            "user_annotated": [
                {
                    "color": <hexadecimal color>,
                    "start": <int>,
                    "end": <int>,
                    "entity_group": <str>,
                    "score": <float64>,
                    "word": <str>
                },
                ...
            ],
            "model_predicted": <same format as user_annotated>,
            "processed_text": <str>
        },
        ...
    ]
},
200
```
or
```
'Annotations histories not found', 404
```
or
```
'Error in retrieving annotations histories', 400
```

## **Add new annotation to histories of a user**

Request: **POST**: [/histories]()
- Header must contains ```Authentication: {access_token}```
```json 
{  
    "user_annotated": [
        {
            "color": <hexadecimal color>,
            "start": <int>,
            "end": <int>,
            "entity_group": <str>,
            "score": <float64>,
            "word": <str>
        },
        ...
    ],
    "model_predicted": <same format as user_annotated>
}
```

Response:
```
'Update annotation histories successfully', 201
```
or 
```
'model_predicted or user_annotated is missing', 201
```
or
```
'Error in adding annotation to histories', 500
```