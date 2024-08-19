import { Link } from "react-router-dom"
import { useState } from "react"
function Register() {
  const [formData, setFormData] = useState({})
  const [error, setError] = useState({ error: false, message: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError({ error: false, message: "" })
    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
      const data = await response.json()
      console.log(data)
      if (data.error) {
        setError({ error: true, message: data.message })
        return
      }
      // Redirect to login page
      window.location.href = "/login"
    } catch (error) {
      setError({ error: true, message: "An error occurred" })
      console.error(error)
    }
  }
  return (
    <div className="container container-fluid d-flex flex-column align-items-center justify-content-center border" style={{
      height: "90vh"
    }}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label fs-6">Username</label>
          <input type="text" className="form-control" id="username" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label fs-6">Email address</label>
          <input type="email" className="form-control" id="email" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label fs-6">Password</label>
          <input type="password" className="form-control" id="password" onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary w-100">Register</button>
      </form>
      {error.error && <p className="fs-6 text-danger" role="alert">
        {error.message} </p>}
      <div>
        <p>Already have an account? <Link to="/login">Login</Link> </p>
      </div>
    </div>
  )
}

export default Register