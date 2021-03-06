export default class Store {
    #token; //login token
    #userProfile; //user profile array
    #userPosts; // user posts array

    constructor() {
        this.#token = '';
        this.#userProfile = null;
    }

    set userProfile(profille) {
        this.#userProfile = profille;
    }

    get userProfile() {
        return this.#userProfile;
    }

    set userPosts(posts) {
        this.#userPosts = posts;
    }

    get userPosts() {
        return this.#userPosts;
    }

    set token(token) {
        this.#token = token;
    }

    get token() {
        return this.#token;
    }
}
