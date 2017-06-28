
from os import urandom

from flask import (Flask, abort, flash, json, jsonify, redirect,
                   render_template, request, session, url_for)

import account_logic as account
import planet_logic as planet
import vote_logic as vote

app = Flask(__name__)
app.secret_key = 'fixed_secret_key'


# Before Requests:

@app.before_request
def check_before_request():
    """Before request, refresh session time and check for valid request method."""
    account.make_session_permanent(app)
    account.check_for_valid_request()


# Error Handlers:

@app.errorhandler(404)
def page_not_found(error):
    return render_template('404.html'), 404


@app.errorhandler(405)
def not_allowed_method(error):
    return render_template('405.html'), 405


# Routing Endpoints:

@app.route('/')
def redirect_root():
    """Redirection of root."""
    return redirect(url_for('planets'))


@app.route('/planets')
def planets():
    """Show requested planets page."""
    planets, page = planet.get_planets()

    return render_template('index.html', planets=planets, page=page)


@app.route('/register', methods=['GET', 'POST'])
@account.not_loggedin
def register():
    if request.method == 'POST':
        return account.register_account()

    return render_template('register.html')


@app.route('/login', methods=['GET', 'POST'])
@account.not_loggedin
def login():
    if request.method == 'POST':
        return account.login_user()

    return render_template('login.html')


@app.route('/logout')
@account.login_required
def logout():
    session.pop('user_name', None)
    flash("Successfully logged out.", "success")

    return redirect(url_for('planets'))


# API Endpoints:


@app.route('/api/manage-vote', methods=['POST'])
@account.login_required
def manage_vote():
    vote.manage_vote()

    return json.dumps({'status': 'OK'})


@app.route('/api/vote-statistics')
def get_vote_statistics():
    vote_stats = vote.get_vote_statistics()

    return jsonify(vote_stats=vote_stats)
