# Typescript

### type alias

-   일반 타입

```javascript
type News = {
    id: number,
    time_ago: string,
    title: string,
    url: string,
    user: string,
    content: string,
};
```

-   배열타입

```javascript
interface Store {
    currentPage: number;
    feeds: NewsFeeds[];
}
```

-   인터섹션

```javascript
type NewsFeeds = News & {
    comments_count: number,
    points: number,
    read?: boolean, // ?속성 : 있을때도 있고 없을때도 있음.
};
```

### interface && readonly

```javascript
interface News {
    //readonly를 하면 id의 값을 바꾸지못함.
    readonly id: number;
    readonly time_ago: string;
    readonly title: string;
    readonly: string;
    readonly user: string;
    readonly content: string;
}
```

-   extends

```javascript
interface NewsFeeds extends News {
    readonly comments_count: number;
    readonly points: number;
    read?: boolean; // ?속성 : 있을때도 있고 없을때도 있음.
}
```
