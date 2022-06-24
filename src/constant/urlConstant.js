const urlConstant = {
    home: "/",

    login: "/login",
    loginVerifyCode: parameter => `/login/enter-code/${parameter}`,

    showProfile: "/profile",
    editInformation: "/edit",
    setting: `/setting`,
    editInformationAfterSignup: "/edit/after-signup",
}

export default urlConstant