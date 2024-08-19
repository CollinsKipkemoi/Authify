import { Link } from "react-router-dom"
function Register() {
  return (
    <div className="container container-fluid d-flex flex-column align-items-center justify-content-center border" style={{
      height: "90vh"
    }}>
      <h1>Register</h1>
      <form action="">
        <div className="mb-3">
          <label htmlFor="username" className="form-label fs-6">Username</label>
          <input type="text" className="form-control" id="username" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label fs-6">Email address</label>
          <input type="email" className="form-control" id="email" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label fs-6">Password</label>
          <input type="password" className="form-control" id="password" />
        </div>
        <button type="submit" className="btn btn-primary w-100">Register</button>
      </form>
      <div>
        <p>Already have an account? <Link to="/login">Login</Link> </p>
      </div>
    </div>
  )
}

export default Register