
from flask import request, session
from account_logic import create_timestamp
import data_manager


def manage_vote():
    """Manage votes. If user voted on selected planet already,
    then remove vote, if not yet, then add vote.
    """
    planet_name = request.form.get('planet_name')
    user_name = session.get('user_name')
    user_id = get_user_id(user_name)

    if vote_exists(user_id, planet_name):
        remove_vote(user_id, planet_name)
    else:
        add_vote(user_id, planet_name)


def get_user_id(user_name):
    """Get id by user_name from accounts table."""
    sql = """SELECT id FROM accounts WHERE user_name = %s;"""
    parameters = (user_name,)
    fetch = 'cell'

    return data_manager.query(sql, parameters, fetch)


def vote_exists(user_id, planet_name):
    """Check if certain user already voted on certain planet."""
    sql = """SELECT id FROM planet_votes WHERE account_id = %s AND planet_name = %s;"""
    parameters = (user_id, planet_name)
    fetch = 'cell'

    try:
        return data_manager.query(sql, parameters, fetch)
    except TypeError as err:
        return None


def remove_vote(user_id, planet_name):
    """Remove vote from planet_votes table."""
    sql = """DELETE FROM planet_votes WHERE account_id = %s AND planet_name = %s;"""
    parameters = (user_id, planet_name)
    fetch = None

    data_manager.query(sql, parameters, fetch)


def add_vote(user_id, planet_name):
    """Add vote to planet_votes table."""
    sub_time = create_timestamp()

    sql = """INSERT INTO planet_votes (planet_name, account_id, sub_time)
             VALUES (%s, %s, %s);"""
    parameters = (planet_name, user_id, sub_time)
    fetch = None

    data_manager.query(sql, parameters, fetch)


def get_vote_statistics():
    """Return vote statistics as a list of dictionaries."""
    sql = """SELECT planet_name, COUNT(planet_name) as vote_count
             FROM planet_votes
             GROUP BY planet_name
             ORDER BY vote_count DESC;"""
    parameters = None
    fetch = 'all'

    return data_manager.query(sql, parameters, fetch)
