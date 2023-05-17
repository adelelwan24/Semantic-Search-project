from Server import create_app
from testConfig import TestConfig
import unittest


class SearchTest(unittest.TestCase):
    """This class represents the search test case"""

    @classmethod
    def setUpClass(cls) -> None:
        """Define test variables and initialize app."""

        cls.app = create_app(TestConfig)
        cls.client = cls.app.test_client

        return super().setUpClass()
    

    @classmethod
    def tearDownClass(cls) -> None:
        # with cls.app.app_context():
        #     cls.db.drop_all()

        return super().tearDownClass()
    

    def setUp(self):
        pass



    def tearDown(self):
        pass

    """
    TODO
    Write at least one test for each test for successful operation and for expected errors.
    """

    def test_search_videos(self):
        res = self.client().get('/videos/search?query=hello world')

        self.assertEqual(res.status_code , 200)
        self.assertTrue(res.is_json)

        data = res.json
        self.assertIsInstance(data, list)
        if data:
            keys = data[0].keys()
            self.assertIn('id', keys)
            self.assertIn('video_id', keys)
            self.assertIn('text', keys)
            self.assertIn('start_time', keys)

    def test_search_papers(self):
        res = self.client().get('/papers/search?query=hello world')

        self.assertEqual(res.status_code , 200)
        self.assertTrue(res.is_json)

        data = res.json
        self.assertIsInstance(data, list)
        if data:
            keys = data[0].keys()
            self.assertIn('id', keys)
            self.assertIn('video_id', keys)
            self.assertIn('text', keys)

    
# Make the tests conveniently executable
if __name__ == "__main__":
    unittest.main()