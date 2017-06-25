
from flask import Flask, render_template, request, url_for, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import requests

app = Flask(__name__)


@app.route('/')
def index_page():
    """Show index page."""
    return render_template('index.html')

# new1 = generate_password_hash('password1', method='pbkdf2:sha512:80000', salt_length=8)

# @app.route('/_get_current_user')
# def get_current_user():
#     return jsonify(username=g.user.username,
#                    email=g.user.email,
#                    id=g.user.id)

if __name__ == '__main__':
    app.run(debug=True)
