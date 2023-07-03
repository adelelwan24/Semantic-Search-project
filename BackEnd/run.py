from Server import create_app, db

app = create_app()

# try:
#     with app.app_context():
#         db.create_all()
# except:
#     print(f'FAiLED TO CREATE TABLES IN DB')


#### For Development Only
@app.route('/')
def hello():
    return '<h1>Welcome To Search Mate</h1>'

if __name__ == '__main__':
    app.run(debug=True, host= '0.0.0.0', port=5000, )
