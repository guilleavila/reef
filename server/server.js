const express = require('express')
const path = require('path')

const app = express()
const publicPath = path.join(__dirname, '..', 'dist')

const PORT = 3000

app.use(express.static(publicPath))

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'))
})

app.listen(port, () => {
    console.log('Server running on port' + PORT)
})