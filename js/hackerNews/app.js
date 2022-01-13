const ajax = new XMLHttpRequest();

ajax.open('GET', 'https://api.hnpwa.com/v0/news/1.json', false);
ajax.send();

const newsFeeds = JSON.parse(ajax.response);
const root = document.getElementById('root');

root.innerHTML = `
    <ul>
        <li>${newsFeeds[0].title}</li>
        <li>${newsFeeds[1].title}</li>
        <li>${newsFeeds[2].title}</li>
    </ul>
`;
