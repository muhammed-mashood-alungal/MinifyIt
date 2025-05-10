import { useEffect, useState } from "react"
import { UrlServices } from "../../Services/url.services"
import { useParams } from "react-router-dom"

function UrlRedirectionPage() {
    const [loading , setLoading ]  = useState(true)
    const [pageNotFound , setPageNotFound] = useState(false)
    const params = useParams()
    const shortCode = params?.shortCode
    useEffect(()=>{
        const fetchOriginalUrl =async () =>{
           try {
            if(!shortCode) return
            const originalUrl = await UrlServices.getOrginalUrl(shortCode)
            if(originalUrl == undefined || originalUrl == "undefined"){
                setLoading(true)
                setPageNotFound(true)
            }
            window.location.href = originalUrl
            setLoading(false)
           } catch (error) {
            console.log(error)
            setLoading(false)
             setPageNotFound(true)
           }
        }
        fetchOriginalUrl()
    },[shortCode])
  return (
    <div className="flex justify-center">
       <p>{loading && "Redirecting......."}</p>
       <p>{pageNotFound && "Page Not Found"}</p>
    </div>
  )
}

export default UrlRedirectionPage