import { check, group } from "k6"
import http from "k6/http"
import { User } from "../http-api/Model/userModel"




export const options = {
    stages: [
        //Duration and target
        {duration: '10m', target: 100}
    ],
    thresholds: {
        http_req_duration: ['p(95)<500'], //95% of transaction must happen under 500ms,
        http_req_failed: ['rate<0.01'] //Less than 1 % failure rate]
    }
}

//1. Signup

const signup = (userData: Omit<User, "id">) => {
    const payload = JSON.stringify({...userData})
    console.log(payload)

    const params = {
        headers: {
            "Content-Type": 'application/json',
            
        }
    }

    const res = http.post(`http://localhost:3000/api/v1/users/createusers`, payload, params)

    check(res, {
        "signup succesful": (r) => r.status === 201
    })

}

export default function(){
    group("Signup Performance Test", function() {
        //__VU = virtual user id - randomise value 
        const username = `ashan123${__VU}`
        const password = `password`
        const email = `email${__VU}@email.com`
        const mobile = `075672941${__VU}`

            signup({email, password, username, mobile})
    })
}