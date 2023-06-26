from sqlalchemy.exc import IntegrityError
from Server import create_app, db
from testConfig import TestConfig
import unittest


class UserTest(unittest.TestCase):
    """This class represents the user test case"""

    @classmethod
    def setUpClass(cls) -> None:
        """Define test variables and initialize app."""

        cls.app = create_app(TestConfig)
        cls.client = cls.app.test_client
        cls.db = db

        return super().setUpClass()
    

    @classmethod
    def tearDownClass(cls) -> None:
        with cls.app.app_context():
            cls.db.drop_all()

        return super().tearDownClass()
    

    def setUp(self):

        # binds the app to the current context
        with self.app.app_context():
            # cls.db = SQLAlchemy()
            # cls.db.init_app(cls.app)
            # create all tables
            self.db.create_all()

        #### TODO: Make the user admin or test with admin and no admin
        #### Create the user
        payload = {
            'username' : 'test_username',
            'email_address' : 'test@email.com',
            'password' : "Test1234"
                }
        
        res = self.client().post('/users/create', json=payload) 
        self.assertEqual(res.status_code, 201)

        #### Login the user
        payload_login = {
            "email_address" : "test@email.com",
            "password": "Test1234"
            }
        res_login = self.client().post('/users/login', json=payload_login) 
        self.assertEqual(res_login.status_code, 200)
        self.jwt = res_login.json['token']

        self.headers = {'Authorization' : f'bearer {self.jwt}'}


    def tearDown(self):
        """Executed after reach test"""
        with self.app.app_context():
            self.db.drop_all()

    """
    TODO
    Write at least one test for each test for successful operation and for expected errors.
    """

    def test_get_users(self):
        res = self.client().get('/users/', headers = self.headers)
        data = res.json

        self.assertEqual(res.status_code , 200)
        self.assertIsInstance(data, list)


    def test_get_one_user(self):
        res = self.client().get('/users/1', headers = self.headers)
        data = res.json

        self.assertEqual(res.status_code , 200)
        self.assertIsInstance(data, dict)
        self.assertTrue(data['id'])
        self.assertTrue(data['username'])
        self.assertTrue(data['email_address'])
        self.assertTrue(data['created_at'])

    
    def test_create_user(self):
        payload = {
            'username' : 'test_username_new',
            'email_address' : 'test_new@email.com',
            'password' : "Test1234"
                }
        
        res = self.client().post('/users/create', json=payload, headers = self.headers) 
        data = res.json

        self.assertEqual(res.status_code , 201)
        self.assertIsInstance(data, dict)

        self.assertTrue(data['id'])
        self.assertTrue(data['username'])
        self.assertTrue(data['created_at'])
        self.assertTrue(data['email_address'])

    def test_create_duplicate_user(self):
        payload = {
            'username' : 'test_username',
            'email_address' : 'test@email.com',
            'password' : "Test1234"
                }
        
        res = self.client().post('/users/create', json=payload) 
        self.assertRaises(IntegrityError)
        data = res.json

        self.assertEqual(res.status_code , 422)
        self.assertIsInstance(data, dict)
        self.assertTrue(data['code'])
        self.assertTrue(data['error'])
        self.assertTrue(data['message'])
        self.assertIn("IntegrityError", data['message'])

    def test_create_user_with_pass_lt_8(self):
        payload = {
            'username' : 'test_username',
            'email_address' : 'test@email.com',
            'password' : "Test"
                }
        
        res = self.client().post('/users/create', json=payload) 
        data = res.json

        self.assertEqual(res.status_code , 400)
        self.assertIsInstance(data, dict)
        self.assertTrue(data['code'])
        self.assertTrue(data['error'])
        self.assertTrue(data['message'])
        self.assertEqual(data['error']['password'][0], "Password length must be longer than 8")

    def test_create_user_with_pass_without_lower(self):
        payload = {
            'username' : 'test_username',
            'email_address' : 'test@email.com',
            'password' : "TEST1234"
                }
        
        res = self.client().post('/users/create', json=payload) 
        data = res.json

        self.assertEqual(res.status_code , 400)
        self.assertIsInstance(data, dict)
        self.assertTrue(data['code'])
        self.assertTrue(data['error'])
        self.assertTrue(data['message'])
        self.assertEqual(data['error']['password'][0], "Password must contain lower case")

    def test_create_user_with_pass_without_upper(self):
        payload = {
            'username' : 'test_username',
            'email_address' : 'test@email.com',
            'password' : "test1234"
                }
        
        res = self.client().post('/users/create', json=payload) 
        data = res.json

        self.assertEqual(res.status_code , 400)
        self.assertIsInstance(data, dict)
        self.assertTrue(data['code'])
        self.assertTrue(data['error'])
        self.assertTrue(data['message'])
        self.assertEqual(data['error']['password'][0], "Password must contain upper case")

    def test_create_user_with_missing_data(self):
        payload = {
            'email_address' : 'test@email.com',
            'password' : "test1234"
                }
        
        res = self.client().post('/users/create', json=payload) 
        data = res.json

        self.assertEqual(res.status_code , 400)
        self.assertIsInstance(data, dict)
        self.assertTrue(data['code'])
        self.assertTrue(data['error'])
        self.assertTrue(data['message'])
        self.assertEqual(data['error']['username'][0], "Missing data for required field.")
    


    def test_login_user(self):
        payload = {
            'email_address' : 'test@email.com',
            'password' : "Test1234"
                }
        
        res = self.client().post('/users/login', json=payload) 
        data = res.json

        self.assertEqual(res.status_code , 200)
        self.assertIsInstance(data, dict)
        #### Typo need to be fixed later
        # self.assertTrue(data['message'])

    def test_login_user_wrong_pass(self):
        payload = {
            'email_address' : 'test@email.com',
            'password' : "Test43221"
                }
        
        res = self.client().post('/users/login', json=payload) 
        self.assertEqual(res.status_code , 401)

    def test_login_user_wrong_email(self):
        payload = {
            'email_address' : 'test32423434@email.com',
            'password' : "Test1234"
                }
        
        res = self.client().post('/users/login', json=payload) 
        self.assertEqual(res.status_code , 404)

    def test_delete_user(self):
        res = self.client().delete('/users/1',  headers = self.headers) 
        self.assertEqual(res.status_code , 204)

    def test_delete_user_does_not_exist(self):
        res = self.client().delete('/users/1000', headers = self.headers) 
        self.assertEqual(res.status_code , 403)
    
# Make the tests conveniently executable
if __name__ == "__main__":
    unittest.main()