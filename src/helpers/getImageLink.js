function getImageLink(avatar)
{
    if (avatar) return process.env.REACT_APP_REST_URL + "/" + avatar
    else return avatar
}

export default getImageLink