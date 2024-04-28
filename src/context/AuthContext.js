import { createContext, useReducer, useEffect } from 'react'
import { projectAuth, projectFirestore } from '../firebase/config'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload }
    case 'LOGOUT':
      return { ...state, user: null }
    case 'AUTH_IS_READY':
      return { user: action.payload, authIsReady: true }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
    user: null,
    authIsReady: false
  })

  useEffect(() => {
    const unsub = projectAuth.onAuthStateChanged( async user => {

      const uid = user.uid
      const docByUid = projectFirestore.collection('users').doc(uid)
      const storeUser = await (await docByUid.get()).data()

      dispatch({ type: 'AUTH_IS_READY', payload: {...user, hashIMG: storeUser?.hashIMG} })
      unsub()
    })
  }, [])

  // console.log('AuthContext state:', state)
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )

}