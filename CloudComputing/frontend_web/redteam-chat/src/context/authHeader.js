export default function authHeader(){
    const token = JSON.parse(localStorage.getItem("token"))
    const _id = JSON.parse(localStorage.getItem("_id"))

    if(token){
        return {
            "token": token,
            "_id": _id
        };
    }else{
        return {};
    }
}