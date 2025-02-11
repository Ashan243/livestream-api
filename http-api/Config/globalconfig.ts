


export default{

    REFRESH_TOKEN_CONFIG: {
        httpOnly: true,
        sameSite: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,//Conversion to seconds
        secure: process.env.NODE_ENV === "production",
    },


    BASE_URL: "http://localhost:3000/api/v1"
}

