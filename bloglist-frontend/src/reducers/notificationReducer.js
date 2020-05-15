const reducer = (state='', action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return action.content
  
    case 'CLEAR_MESSAGE':
      return ''
    default:
      return state
  }
}

let timeoutIdArray = []
export const setNotification = (content, duration) => {
  return async (dispatch) => {
    let timeoutID
    dispatch(setNotificationMessage(content))
    timeoutID = setTimeout(() => {
      dispatch(clearNotificationMessage())
    }, duration * 1000)
    timeoutIdArray.push(timeoutID)
    if(timeoutIdArray.length === 2) {
      clearTimeout(timeoutIdArray[0])
      timeoutIdArray.shift()
    }
  }
}

const setNotificationMessage = (content) => {
  return {
    type: 'SET_MESSAGE',
    content
  }
}

const clearNotificationMessage = () => {
  return {
    type: 'CLEAR_MESSAGE'
  }
}

export default reducer