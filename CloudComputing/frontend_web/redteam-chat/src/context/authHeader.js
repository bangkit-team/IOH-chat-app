export default function authHeader(){
    const token = JSON.parse(localStorage.getItem("token"))
    const id = JSON.parse(localStorage.getItem("id"))

    if(token){
        return {
            "token": token,
            "id": id
        };
    }else{
        return {};
    }
}