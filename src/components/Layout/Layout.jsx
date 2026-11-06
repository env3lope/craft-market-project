import Header from '../Header/Header'
import PropTypes from 'prop-types'

export default function Layout({ onNavigate, children }) {
  return (
    <div className="layout">
      <Header onNavigate={onNavigate} />
      <main className="layout__main">{children}</main>
    </div>
  )
}

Layout.propTypes = {
  onNavigate: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}
