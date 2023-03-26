import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(state => {
    // console.log(state, "Here is state")
    return state.notification.message
  })
  const show = useSelector(state => state.notification.show)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if(!show) return null
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification