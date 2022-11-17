export default function handler(req, res) {
    const body = req.body
  
    if (!body.token) {
      // Sends a HTTP bad request error code
      return res.status(400).json({ data: 'No token!' })
    }
    if (body.token === "testtoken") {
      return res.status(200).json({ tokenValid: true, username: 'Brainstorm4266' })
    } else {
      return res.status(400).json({ tokenValid: false })
    }
  }
