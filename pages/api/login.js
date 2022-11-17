export default function handler(req, res) {
  const body = req.body

  if (!body.usern || !body.pass) {
    // Sends a HTTP bad request error code
    return res.status(400).json({ data: 'Username or password not found! This... should not be possible.' })
  }
  if (body.usern == "Brainstorm4266" && body.pass == "testpass") {
    return res.status(200).json({ loginSuccess: true, username: 'Brainstorm4266', token: 'testtoken' })
  } else {
    return res.status(400).json({ loginSuccess: false, error: "Incorrect username or password"})
  }
}
