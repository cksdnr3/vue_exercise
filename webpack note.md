```javascript
const VueLoaderPlugin = require('vue-loader/lib/plugin')

// 남의 js를 가져올 때 언제는  rquire를 쓰고 언제는 import from을 쓸까??
// 기본적으로 node 환경은  require를 쓰고 vue 환경에서는 import from을 쓴다.
// path는 노드가 만들어둔 경로 모듈이다.
// path 경로설정하는 것을 도와준다. 여기선 output에서 사용중
const path = require('path');

// 노드의 모듈을 만들었다는 뜻
// 이 객체가 웹팩이 웹팩처리를 할 때 사용한다.
// 웹팩 설정을 넣는다.
// 크게 4가지 설정이 있다.
// entry, module, plugins, output
// 웹팩을 쓰는이유 웹사이트의 사이즈가 커짐에 따라 스크립트의 양이 커지는데
// 그것을 하나로 합치기 위해 사용한다.
// 그렇다면 많은 스크립트들을 하나의 스크립트로 관리한다는 것이고 entry에
// 통합 스크립트 하나를 정의한다. 그것이 main.js 이다.
module.exports = {
    // 개발 할 때는 development 배포할 때는 production
    mode: 'development',
    // 개발할때는 eval 배포할 때는 hidden-source-map을 쓴다. eval이 속도가 빨라짐.
    devtool: 'eval',
    resolve: {
        // import시에 확장자를 뺄 수 있다. 알아서 처리해줌
        extensions: ['.js', 'vue']
    },
    entry: {
        // 프로퍼티 app은 main에서 하나로 관리될 여러개의 스크립트들이 app.js로 합쳐진다.
        // 컴포넌트 .vue 파일은 사실 js다 수많은 컴포넌트들을 합친다고 보면된다.
        app: './main.js',
    },
    module: {
        rules: [{
            // 정규표현식 아래는 .vue 로 끝나는 파일을 선택하는 것
            test: /\.vue$/,
            // 로더는 새로 다운받아야 한다! vue-loader를!
            // vue-loader가 .vue 파일을 대신 읽어주는 규칙이 생긴다.
            // 그것을 js로 바꿔주어 메인에 임포드 될수 있다.
            // 자바스크립트가 아닌 것들을 읽을 때마다 로더를 설치해줘야한다.
            use: 'vue-loader',
        }],
    },
    plugins: [
        new VueLoaderPlugin(),
    ],
    output: {
        // dist라는 폴더에 app.js가 최종적으로 나올 것임
        // [name].js 로 동적으로 받을 수도 있다.
        filename: 'app.js',
        // join():
        // 아래처럼 사용하면 경로를 찾아준다.
        // 이 경로는 절대경로 여야한다.
        path: path.join(__dirname, 'dist'),
    },
}
```
진행
entry -> module -> plugins -> output



entry: 자바스크립트 파일들을 하나로 묶어 관리할 js(main.js) 파일을 정의하는 곳 main.js를 통해서 합쳐지고  app.js가 만들어져 이곳에 관리된다. 



module: js파일이 아닌 파일들을 js로 바꿔주는 loader를 정의하는 곳



plugins: module의 부수적인 부분을 처리하는 곳



output: 합쳐진 js파일의 결과물을 뿌리는 곳을 정의하는 곳
webpack dev server를 이용하면 dist 폴더의 app.js가 생기지 않는데
이는 실제 폴더, 파일을 생성하는 것이 아닌 메모리상에 생성되어 관리된다.