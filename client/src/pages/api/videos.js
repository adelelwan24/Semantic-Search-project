export default async function handler(req, res) {
  const data = await fetch('http:localhost:5030')
    .then(response => response.json())
    .catch(error => console.error(error))

  res.status(200).json({ data })
}


export default async function handler(req, res) {
  const data = await fetch('https://api.example.com/videos')
    .then(response => response.json())
    .catch(error => console.error(error))

  res.status(200).json({ data })
}
