const { api } = require('./user_helper')
const initialBlogs = [
  {
    title: 'blogDesdeJest1',
    author: 'Pancho Villa',
    url: 'https://blog/pancho-villa-blogs',
    likes: 241214
  },
  {
    title: 'blogDesdeJest2',
    author: 'Franco el Franco',
    url: 'https://blog/franco-blogs',
    likes: 10
  },
  {
    title: 'blogDesdeJest3',
    author: 'Zaira',
    url: 'https://blog/mi-amor-no-correspondido-estado:sad',
    likes: 3245
  }
]

const getToken = async () => {
  const response = await api.post('/api/login').send({ username: 'MemoRoot', password: 'contraseñaSegura' })
  return response.body.token
}

module.exports = {
  initialBlogs,
  getToken
}
