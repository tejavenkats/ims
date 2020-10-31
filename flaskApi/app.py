from flask import Flask, render_template, request, redirect
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
import requests
import json


app = Flask(__name__, static_folder='./build', static_url_path='/')
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///inventory.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)


class BookInfo(db.Model):
    api_book_id = db.Column(db.String, primary_key=True)
    book_title = db.Column(db.String, nullable=False)
    book_authors = db.Column(db.String, nullable=False)
    book_description = db.Column(db.String, nullable=False)
    book_thumbnail = db.Column(db.String, nullable=False)
    book_inventoryCount = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return "BookInfo" + str(self.api_book_id)


@app.route("/")
def index():
    return app.send_static_file('index.html')

# Route for the home page to list available books in the inventory


@app.route("/getAllBooks")
def get_all_books():
    no_of_books = len(BookInfo.query.all())
    res = []
    for book in range(no_of_books):
        obj = {
            "book_api_id": BookInfo.query[book].api_book_id,
            "book_title": BookInfo.query[book].book_title,
            "book_authors": BookInfo.query[book].book_authors,
            "book_description": BookInfo.query[book].book_description,
            "book_thumbnail": BookInfo.query[book].book_thumbnail,
            "book_inventoryCount": BookInfo.query[book].book_inventoryCount,
        }
        res.append(obj)
    return json.dumps(res)

# Route to Populate Database if no data is found or any error related to databases.


@app.route("/populateDatabaseOnce")
def populateDB():
    uri = "https://www.googleapis.com/books/v1/users/114336749099242522102/bookshelves/1001/volumes?q=maxResults=20&startIndex=3"
    r = requests.get(uri)
    responseObj = r.json()
    booksArrLen = len(responseObj["items"])
    db.create_all()
    for i in range(booksArrLen):
        db.session.add(BookInfo(
            api_book_id=responseObj["items"][i]["id"],
            book_title=responseObj["items"][i]["volumeInfo"]["title"],
            book_authors=",".join(
                responseObj["items"][i]["volumeInfo"]["authors"]),
            book_inventoryCount=2,
            book_description=responseObj["items"][i]["volumeInfo"]["description"],
            book_thumbnail=responseObj["items"][i]["volumeInfo"]["imageLinks"]["thumbnail"],
        ))
        db.session.commit()

    return str(BookInfo.query.all())


@app.route("/checkDB")
def checkDB():
    res = []
    for i in range(10):
        res.append(BookInfo.query[i].book_title)
    return str(res)


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))
