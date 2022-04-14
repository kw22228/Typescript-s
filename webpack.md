# webpack (bundler)

https://webpack.js.org/

webpack setting 관련 -> webpack boilerplate 검색!

1. Entry

-   실행할때 가장 최초의 진입점 파일
    ex) index.js

2. Output

-   어떻게 Output 파일을 만들꺼다, 어떤 디렉토리에 파일을 출력할꺼다.

3. Loaders (Entry에 적용되는 소프트웨어)

-   webpack이 모든 번들링과정을 다 실행할까? NO
    여러가지 작은 프로그램을 통해 번들링 작업진행.
-   webpack만의 Loader라는 프로그램 구조가있다.
    Loader는 작은 프로그램을 웹팩안에 주입할 수 있다. (많은 Loader중에 어떤 기능을 사용할꺼다. 라고 설정가능)
-   ex) babel같은 트랜스파일러

4. Plugins (Output에 적용되는 소프트웨어)

-   Loader가 어떤 프로그램을 어떻게 사용할꺼다 라는 소프트웨어라면,
    Plugin은 Loader로 처리된 파일들을 어떻게 출력 결과로 만들거다 라는 소프트웨어.
-   ex) 이미지 최적화, 소스코드 압축, 등등...
