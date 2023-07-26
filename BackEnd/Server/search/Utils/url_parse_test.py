import unittest
from url_parse import url_to_id

class URLParseTest(unittest.TestCase):

    # Test all types of urls
    def test_urls(self):
        urls = [
        'http://youtu.be/SA2iWivDJiE',
        'http://www.youtube.com/watch?v=_oPAwA_Udwc&feature=feedu',
        'http://www.youtube.com/embed/SA2iWivDJiE',
        'http://www.youtube.com/v/SA2iWivDJiE?version=3&amp;hl=en_US',
        'https://www.youtube.com/watch?v=v6r69BBtWOA&list=PLG6SEm50Uv-AGbPoCesZTl79_FhTkGtmK&index=1&t=1s',
        ]
        video_ids=[
            'SA2iWivDJiE',
            '_oPAwA_Udwc',
            'SA2iWivDJiE',
            'SA2iWivDJiE',
            'v6r69BBtWOA'
        ]
        for i, url in enumerate(urls):
            self.assertEqual(video_ids[i], url_to_id(url))

