const express = require('express')
const app = express()
const port = 3000

// Middleware para receber dados em JSON
app.use(express.json())

// Array de usuários
let users = [
  { id: 1, name: 'João', email: 'joao@gmail.com' },
  { id: 2, name: 'Maria', email: 'maria@gmail.com' },
  { id: 3, name: 'Pedro', email: 'pedro@gmail.com' }
]

// Rota para listar todos os usuários
app.get('/users', (req, res) => {
  res.json(users)
})

// Rota para buscar um usuário pelo id
app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const user = users.find(u => u.id === id)
  if (user) {
    res.json(user)
  } else {
    res.status(404).send('Usuário não encontrado')
  }
})

// Rota para cadastrar um novo usuário
app.post('/users', (req, res) => {
  const user = req.body
  user.id = users.length + 1
  users.push(user)
  res.json(user)
})

// Rota para atualizar um usuário pelo id
app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const index = users.findIndex(u => u.id === id)
  if (index !== -1) {
    users[index] = req.body
    users[index].id = id
    res.json(users[index])
  } else {
    res.status(404).send('Usuário não encontrado')
  }
})

// Rota para excluir um usuário pelo id
app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const index = users.findIndex(u => u.id === id)
  if (index !== -1) {
    const user = users[index]
    users.splice(index, 1)
    res.json(user)
  } else {
    res.status(404).send('Usuário não encontrado')
  }
})

// Inicia o servidor na porta especificada
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})
