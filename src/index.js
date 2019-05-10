const server = require('./server')

// Utiliza uma variável ambiente para ver se tem alguma porta disponível
// senão utiliza a 3000
server.listen(process.env.PORT || 3000)
