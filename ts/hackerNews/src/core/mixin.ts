// //믹스인 기능 (targetClass에 baseClass배열의 class를 상속시킨다.)
// function applyApiMixins(targetClass: any, baseClass: any[]): void {
//     baseClass.forEach(baseClass => {
//         Object.getOwnPropertyNames(baseClass.prototype).forEach(name => {
//             const descriptor = Object.getOwnPropertyDescriptor(baseClass.prototype, name);

//             if (descriptor) {
//                 Object.defineProperty(targetClass.prototype, name, descriptor);
//             }
//         });
//     });
// }
// interface NewsFeedsApi extends Api {}
// interface NewsDetailApi extends Api {}
// applyApiMixins(NewsFeedsApi, [Api]);
// applyApiMixins(NewsDetailApi, [Api]);
