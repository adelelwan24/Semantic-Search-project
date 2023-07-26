from youtube_transcript_api import YouTubeTranscriptApi

def captions_processing(cap):
    it = 0 
    length = len(cap)
    new = []
    i = 0
    while(i < length): 

        cap[i]['text'] =  cap[i]['text'].replace("\n"," ")

        if cap[i]["text"][-1] == '.' or cap[i]["text"][-1] == "?":
            dic={}
            dic['text'] = cap[it]['text']
            dic['start'] = cap[it]['start']
            dic['duration'] = cap[it]['duration']
            for j in range(it+1,i+1): 
                dic['text'] += " " + cap[j]['text']
                dic['duration'] += cap[j]['duration']

            cap[it] = dic 

            for j in range(it+1,i+1): 
                cap.pop(it+1)


            i = it
            it +=1
            length = len(cap)
            if i >= length :
                break
        i+=1     
    return cap

def merge_with_stride(captions, merge_size, stride_size):
    current = 0
    len_captions = len(captions)
    new_captions = []

    while(current < len_captions):
        new_caption = {}

        end = min(current + merge_size, len_captions)

        text = ""
        start = captions[current]['start']
        last_caption_start = captions[end- 1]['start']
        duration = last_caption_start - start + captions[end - 1]['duration']

        for i in range(current, end):
            text += captions[i]['text']

        new_caption['text'] = text
        new_caption['start'] = start
        new_caption['duration'] = duration

        new_captions.append(new_caption)

        current = current + merge_size - stride_size 
    return new_captions

def get_captions(video_id):
    captions = YouTubeTranscriptApi.get_transcript(video_id)
    captions = captions_processing(captions)
    captions = merge_with_stride(captions, 6, 0)
    return captions




