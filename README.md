# chelpis-hw
這個專案使用express.js實作，然而這個框架非常精簡，
可以說只有路由跟middleware，要使用還需要花些心思規畫專案目錄架構，
所以我有參考一些文章將專案拆出service layer, data access layser，
以及規劃route, controller, 請求參數驗證等。

### Getting Started
#### Prerequisites

- node.js 12

#### config .env
```
cp .env.example .env
```

#### Install
```
npm install
```
#### Start server
```
npm start
```


#### Running the tests

```
npm test
```


### Getting Started With Docker
```
docker-compose up -d
```

### API Document
```
http://localhost:3000/v1/api-docs/
```

### Directory Architecture
```sh
├── bin # 啟動目錄
├── config # 配置設定
├── constant # 常數設定
├── controllers
├── libs # 放一些公用程式
├── middlewares
├── models # DB models
├── public # 公開資源目錄
├── routes # 路由定義檔
├── services # 所有商業邏輯
├── swagger # api文件
├── public # 公開資源目錄
├── test # 測試目錄
├── views # 框架自帶樣板目錄
├── .dockerignore
├── .env.example
├── .gitignore
├── app.js
├── docker-compose.yml
├── Dockerfile
├── package.json

```

### Reference Resources


- [Node Service-oriented Architecture](https://www.codementor.io/@evanbechtol/node-service-oriented-architecture-12vjt9zs9i "Node Service-oriented Architecture")




- [Separation of Concerns](https://medium.com/machine-words/separation-of-concerns-1d735b703a60 "Separation of Concerns")




- [Bulletproof node.js project architecture](https://softwareontheroad.com/ideal-nodejs-project-structure/ "Bulletproof node.js project architecture")




- [RESTful API Design: 13 Best Practices to Make Your Users Happy](https://florimond.dev/blog/articles/2018/08/restful-api-design-13-best-practices-to-make-your-users-happy/ "RESTful API Design: 13 Best Practices to Make Your Users Happy")


