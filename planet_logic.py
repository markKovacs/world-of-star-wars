from math import ceil
import requests
from flask import abort, request, session

import data_manager
from vote_logic import get_user_id, vote_exists


def get_planets():
    """Get requested planet page from SWAPI."""

    if request.args.get('page'):
        page_number = int(request.args['page'])
        response = requests.get('http://swapi.co/api/planets/?page={}'.format(page_number)).json()
    else:
        page_number = 1
        response = requests.get('http://swapi.co/api/planets/').json()

    if response.get('detail') == 'Not found':
        return abort(404)

    planets = response['results']

    for i in range(len(planets)):
        if planets[i]['diameter'] != 'unknown':
            planets[i]['diameter'] = '{:,} km'.format(int(planets[i]['diameter']))
        if planets[i]['surface_water'] != 'unknown':
            planets[i]['surface_water'] = planets[i]['surface_water'] + ' %'
        if planets[i]['population'] != 'unknown':
            planets[i]['population'] = '{:,}'.format(int(planets[i]['population']))

    start = (page_number - 1) * 10 + 1
    end = start + len(planets) - 1
    displayed_planets = '{} - {}'.format(start, end)

    chunk_size = 10
    last_page = ceil(response['count']/chunk_size)

    page = {
        'current': page_number,
        'next': response['next'],
        'prev': response['previous'],
        'displayed_planets': displayed_planets,
        'total': response['count'],
        'last': last_page
        }

    if session.get('user_name'):
        user_id = get_user_id(session['user_name'])
        for i in range(len(planets)):
            if vote_exists(user_id, planets[i]['name']):
                planets[i]['voted'] = 'voted'

    return planets, page
