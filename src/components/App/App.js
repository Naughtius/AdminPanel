import { Component } from 'react'
// Router
import Router from '@router/index'

class App extends Component {
  state = {
    error: false,
  }

  componentDidCatch() {
    this.setState({
      error: true,
    })
  }

  render() {
    if (this.state.error) {
      return <div>Что-то пошло не так!</div>
    } else {
      return <Router />
    }
  }
}

export default App
