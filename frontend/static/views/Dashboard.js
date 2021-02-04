import AbstractView from "./AbstractView";

export default class extends AbstractView {
    constructor () {
        this.setTitle('Dashboard');
    }

    async getHtml() {
        return `
            <h1>Welcome back, Dom</h1>
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum aliquid unde distinctio architecto tempore. Modi ipsum eum molestiae error expedita, vel est aliquid libero id officiis. Modi unde aperiam esse.
            </p>
            <p>
                <a href="/posts" data-link>View recent posts</a>
            </p>
        `
    }
}