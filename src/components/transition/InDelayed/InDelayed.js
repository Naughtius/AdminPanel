import DelayedRender from '@components/DelayedRender'

import TransitionIn from '../In'

const TransitionInDelayed = ({ delay = 300, config, children }) => (
  <DelayedRender delay={delay}>
    <TransitionIn config={config}>{children}</TransitionIn>
  </DelayedRender>
)

export default TransitionInDelayed
