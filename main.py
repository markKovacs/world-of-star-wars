
from flask import Flask, render_template, request, url_for, jsonify, redirect
from werkzeug.security import generate_password_hash, check_password_hash
import requests

app = Flask(__name__)


@app.route('/')
def redirect_root():
    """Redirection of root."""
    return redirect(url_for('planets'))


@app.route('/planets')
def planets():
    """Show a planets page."""
    if request.args.get('page'):
        page_number = request.args['page']
        response = requests.get('http://swapi.co/api/planets/?page={}'.format(page_number)).json()
    else:
        page_number = '1'
        response = requests.get('http://swapi.co/api/planets/').json()

    if response.get('detail') == 'Not found':
        return 'Page not found'

    planets = response['results']

    start = (int(page_number) - 1) * 10 + 1
    end = start + len(planets) - 1
    displayed_planets = '{} - {}'.format(start, end)

    page = {
        'current': page_number,
        'next': response['next'],
        'prev': response['previous'],
        'displayed_planets': displayed_planets,
        'total': response['count']
        }

    return render_template('index.html', planets=planets, page=page)

# new1 = generate_password_hash('password1', method='pbkdf2:sha512:80000', salt_length=8)

# @app.route('/_get_current_user')
# def get_current_user():
#     return jsonify(username=g.user.username,
#                    email=g.user.email,
#                    id=g.user.id)

if __name__ == '__main__':
    app.run(debug=True)
