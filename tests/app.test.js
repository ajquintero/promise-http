const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/service/RickAndMortyApi.js', () => ({
  getCharacter() {
    return Promise.resolve({
      name: 'Rick Sanchez',
      species: 'Human',
      status: 'Alive'
    });
  },
  getCharacters() {
    return Promise.resolve([
      {
        name: 'Rick Sanchez',
        species: 'Human',
        status: 'Alive'
      },
      {
        name: 'Morty Smith',
        species: 'Human',
        status: 'Alive'
      }
    ]);
  }
}));


describe('app', () => {

  describe('post module.exports route', () => {
    it('has a POST route', () => {
      return request(app)
        .post('/characters')
        .send({ characterId: 1234, node: 'My favorite character' })
        .then(res => {
          expect(res.status).toEqual(204);
        });
    });
  });
});

