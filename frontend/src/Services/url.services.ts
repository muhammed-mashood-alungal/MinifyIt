import { urlInstance } from "../Axios/createInstances"

export const UrlServices ={
    createShortUrl : async (originalUrl : string , userId : string) =>{
        try {
            const response = await urlInstance.post('/create' , {originalUrl  , userId})
            return response.data?.shortedUrl
        } catch (error : any) {
            throw new Error((error as Error).message || "Something went Wrong")
        }
    },
    getOrginalUrl : async (shortCode:string) =>{
        try {
            const response = await urlInstance.get(`/${shortCode}`)
            return response.data?.originalUrl
        } catch (error : any) {
            throw new Error((error as Error).message || "Something went Wrong")
        }
    },
     getMyLinks : async (userId:string) =>{
        try {
            const response = await urlInstance.get(`/my-links/${userId}`)
            return response.data?.links
        } catch (error : any) {
            throw new Error((error as Error).message || "Something went Wrong")
        }
    },
}