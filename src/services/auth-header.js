export default function authHeader() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.response) {
        return { "Authorization": "Bearer " + user.response };
    }
    else {
        return {};
    }

}