# -*- coding: utf-8 -*-
import json
import requests
import duolingo

get_header = {
    "host": "www.duolingo.com",
    "User-Agent": "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36", 
    "Accept": 'application/json, text/javascript, */*; q=0.01', 
    "Accept-Language": 'en-US,en;q=0.5', 
    "Accept-Encoding": 'gzip, deflate', 
    "DNT": '1', 
    "X-Requested-With": 'XMLHttpRequest', 
    "Referer": 'https://www.duolingo.com/practice', 
    "Cookie": 'lang=en; duo_ab="7cfeab6c3812b8936973933a88b058db12969d02eyJjb3Vyc2VfdGl0bGVfZXhwZXJpbWVudCI6IGZhbHNlLCAic2Nob29sc19zcGxhc2hfZXhwZXJpbWVudCI6ICJjb250cm9sIiwgImNvdXJzZV9idXR0b25fZXhwZXJpbWVudDIiOiB0cnVlLCAic2lnbnVwX21vZGFsX2J1dHRvbnNfZXhwZXJpbWVudCI6IGZhbHNlLCAibG9naW5fbW9kYWxfZXhwZXJpbWVudCI6IGZhbHNlfQ\075\075"; wuuid=02814935-0141-43fa-9a19-ee32895f5158; auth_tkt="417c3876268c646aef62e1ea1491009555fd97e43111651!userid_type:int"',
    "Connection": 'keep-alive'
}

url = "https://www.duolingo.com/sessions/588730680758?language=eo&web_speech_enabled=false&kc_strength_model_version=3&type=global_practice&speak_capable=true&_=1442691915911"

r = requests.get(url, headers = get_header)
r_json = json.loads(r.text)

print (r_json)

for session_element in range (0, len(r_json['session_elements'])):
    element = r_json["session_elements"][session_element]
    if element["type"] == "translate": 
        print "Please translate: " + element["sentence"]
        return_sentence = raw_input()
    else:
        print "Skipping non-translation problem."

print "The quiz completed successfully."



def post_answer(answer, element):
    post_data = {
        "session_element":{
            "sentence": element["sentence"],
            "solution_key": element["solution_key"],
            "source_language":"eo",
            "target_language_name":"English",
            "wrong_tokens":null,
            "unknown_words":[      ],
            "activity_uuid": element["activity_uuid"],
            "specific_type":"translate",
            "unknown":false,
            "generator_id": element["generator_id"],
            "text": element["sentence"],
            "type":"translate",
            "new_explanation_ids":[],
            "teaches_lexeme_ids":[
                "6bdf85dbf40e09338dd51a301633734e"
            ],
            "tokens":null,
            "sentence_id":"b953b7ae194a425e1a82d4acfa473f14",
            "translation_key":null,
            "known":true,
            "tts_id":"b953b7ae194a425e1a82d4acfa473f14",
            "has_tts":true,
            "has_accents":false,
            "context":"",
            "highlight":[

      ],
            "knowledge_components":[
                "6bdf85dbf40e09338dd51a301633734e"
            ],
            "explanations":{

      },
            "target_language":"en",
            "hovered_words":[],
            "hovered_lexeme_ids":{

      }
        },
        "value":"Our nephew buys apples for us.",
        "use_report_messages":true,
        "time_taken":13508,
        "learning_language":"eo",
        "session_type":"practice",
        "from_language":"en",
        "type":"translate",
        "solution_key":"b953b7ae194a425e1a82d4acfa473f14"
    }
