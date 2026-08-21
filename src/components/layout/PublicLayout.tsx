import { Link, Outlet } from 'react-router-dom'

function PublicLayout() {
  return (
    <div>
      <header>
        <nav>
          <Link to="/">Operator Portal</Link>

          <div>
            <Link to="/">Home</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        </nav>
      </header>

      <Outlet />

      <footer>
        <p>© 2026 Operator Portal</p>
      </footer>
    </div>
  )
}

export default PublicLayout