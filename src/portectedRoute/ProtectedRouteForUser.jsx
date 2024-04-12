/* eslint-disable react/prop-types */
import { Navigate } from "react-router"

export const ProtectedRouteForUser = ({children}) => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      return children
    }
    else {
      return <Navigate to={'/login'}/>
    }
}