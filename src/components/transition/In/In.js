import { animated, useSpring } from 'react-spring'

const transitionRoutes = {
  from: { opacity: 0, transform: 'translateY(-10px)' },
  enter: { opacity: 1, transform: 'translateY(0)' },
  leave: { display: 'none', position: 'absolute' },
  config: {
    tension: 260,
  },
}

const TransitionIn = ({ children, config }) => {
  const props = useSpring({
    from: transitionRoutes.from,
    to: transitionRoutes.enter,
    config: transitionRoutes.config,
    ...config,
  })

  return <animated.div style={props}>{children}</animated.div>
}

export default TransitionIn
