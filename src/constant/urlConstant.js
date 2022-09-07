const urlConstant = {
    home: "/",

    login: "/login",
    loginVerifyCode: parameter => `/login/enter-code/${parameter}`,

    addFile: packId => `/pack/${packId}`,

    showProfile: "/profile",
    editInformation: "/edit",
    setting: `/setting`,
    editInformationAfterSignup: "/edit/after-signup",

    reviewCarts: "/review-carts",
}

export default urlConstant