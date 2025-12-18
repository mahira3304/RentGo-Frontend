import { Outlet, useNavigate } from "react-router"
import { useEffect } from "react"

function Authentication({backendURL,pageURL}){
    const navigate = useNavigate()
    
      useEffect(() => {
        async function checkAuth(){
           try {
            const res =await fetch(backendURL,{credentials:"include"})
            if(!res.ok){
              navigate(pageURL)
            }
          }
          catch(error){
            navigate(pageURL)
          }
        }
        checkAuth()
      }, [navigate])
    
    return <Outlet/>
}
export default Authentication