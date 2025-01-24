const express = require('express')
const app = express()
const path = require('path')

const multer = require('multer') // File upload middleware
const upload = multer({ dest: 'uploads/' }) // Store uploaded files in 'uploads' folder
const { mergePdf } = require('./merge') // Import custom PDF merge function

app.use('/static', express.static('public')) // Serve static files from 'public' folder

const port = 3000

// Serve the HTML file for the home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "templates/index.html"))
})

// Handle PDF merge request
app.post('/merge', upload.array('pdfs', 2), async (req, res) => {
  console.log(req.files) // Log uploaded files
  let d = await mergePdf(
    path.join(__dirname, req.files[0].path),
    path.join(__dirname, req.files[1].path)
  )
  res.redirect(`http://localhost:3000/static/${d}.pdf`) // Redirect to the merged PDF
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
