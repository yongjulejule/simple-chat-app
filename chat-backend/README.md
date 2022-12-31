# simple-chat-app backend

- 간단한 회원가입
- jwt 를 이용한 인증 (Authorization Header or Cookie)
- socket.io 를 이용한 유저 상태 표시, 채팅 서비스
- nest.js 의 Guard, Interceptor, Filter, Pipe 최대한 활용
- jest 를 이용한 unit-test, supertest 를 이용한 end-to-end(e2e) 테스트

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
