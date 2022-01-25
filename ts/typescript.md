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

### mixin 기법

-   class에서 extends를 하지 않고 function으로서 클래스를 상속시키는 기술
-   다중상속이 가능하다.
-   클래스와 클래스간의 상속을 유연적으로 변경할 수 있다.

```javascript
//mixin 함수
function applyApiMixins(targetClass: any, baseClass: any[]): void {
    baseClass.forEach(baseClass => {
        Object.getOwnPropertyNames(baseClass.prototype).forEach(name => {
            const descriptor = Object.getOwnPropertyDescriptor(baseClass.prototype, name);

            if (descriptor) {
                Object.defineProperty(targetClass.prototype, name, descriptor);
            }
        });
    });
}
// 컴파일러에 서로간의 상속을 알려줌
interface NewsFeedsApi extends Api {}
interface NewsDetailApi extends Api {}

//함수 상속
applyApiMixins(NewsFeedsApi, [Api]);
applyApiMixins(NewsDetailApi, [Api]);
```
