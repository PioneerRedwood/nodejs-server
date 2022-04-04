# nodejs-server
Node.js로 구현하는 서버
@express @child_process @...



## NodeJS_Panzoom

- panzoom 사용한 이미지 처리 간단 서버



## NodeJS_TargetServer

- 접속 폭파 테스트용 간단 서버
- 아직 폭파를 테스트해보지 않았으나 딱히 폭파의 큰 의미가 없을 것 같아 중단 😒



## LSPM

- Local Server Process Manager
  - 일종의 서버 프로세스가 실행되는 상태를 감독하는 프로비저닝 시스템
- 원격 명령을 리스닝하다가 요청 시 서버 프로세스를 띄우고 이들 프로세스를 모니터링하여 해당 머신에 어떤 프로세스가 구동되고 있는지 감시하는 것이다.
- 전체 코드는 [여기](https://github.com/PioneerRedwood/MultiplayerBook/blob/master/Chapter%2013/localServerProcessManager/routes/api.js)에 있다.
- 서버 프로세스의 원격 명령을 대기한다는 것이 원격으로 명령을 내리면 또다른 자식 프로세스를 실행하는 부분이 들어있음을 의미했다. 나는 이 부분에 대해서 궁금한 것이 있어 여러가지를 찾았었던 [과거](https://github.com/PioneerRedwood/JavaPractice/tree/main/JSPWorks/service)가 있다.
  - [node js child process options](https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options)
  - [node js child process spawn](https://nodejs.org/api/child_process.html#child_process_event_spawn)
- 추천하는 HTTP 솔루션; MS사의 오픈 소스 크로스 플랫폼 [C++ REST SDK 라이브러리 Git repo](https://github.com/microsoft/cpprestsdk)
- vs code에서 한글이 깨지는 것을 막아주는 code runner 플러그인을 경험했다.
  <img src="https://user-images.githubusercontent.com/45554623/130902563-69c8782f-3cfe-4bca-8e00-15403a501ffb.png">



### 마치며

게임 서버를 nodejs로 띄울 수 있다는 어느 출처를 알 수 없는 글을 시작으로 해당 레포지토리를 만들었었다. 하지만 그것이 아니라 클라우드 서비스에 게임 서버를 올리는 환경에서 서버 인스턴스의 상태를 관리 및 감독하는 시스템이 nodejs로 동작한다는 것이었다. 
=> 출처를 알 수 없는 글은 다시 한번 확인해보자

비록 nodejs기반 게임 서버를 HTTP 기반으로 서버 상태를 확인할 수 있는 다양한 기술을 알 수 있었다.👍


😊
#### 🐱‍👤TO BECOME JEDI GRAND MASTER PROGRAMMER🐱‍👤
