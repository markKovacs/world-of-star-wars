
import requests
from flask import abort, request, session

import data_manager
from vote_logic import get_user_id, vote_exists


def get_planets():
    """Get requested planet page from SWAPI."""

    if request.args.get('page'):
        page_number = request.args['page']
        response = requests.get('http://swapi.co/api/planets/?page={}'.format(page_number)).json()
    else:
        page_number = '1'
        response = requests.get('http://swapi.co/api/planets/').json()

    if response.get('detail') == 'Not found':
        return abort(404)

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

    if session.get('user_name'):
        user_id = get_user_id(session['user_name'])
        for i in range(len(planets)):
            if vote_exists(user_id, planets[i]['name']):
                planets[i]['voted'] = 'voted'

    return planets, page
