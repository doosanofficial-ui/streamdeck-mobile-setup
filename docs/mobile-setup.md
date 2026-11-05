# Mobile Setup Starter

추가 플러그인 없이 기본 Website 5개와 Open 1개로 시작하는 시험 구성입니다. VPN이나 인증 동작은 포함하지 않습니다.

## 먼저 확인

- 컴퓨터에 Stream Deck 앱, 휴대폰에 Stream Deck Mobile이 필요합니다.
- [공식 연결 안내](https://help.elgato.com/hc/en-us/articles/16786832942221-Elgato-Stream-Deck-Mobile-2-0-Getting-Started)에 따라 같은 로컬 네트워크에서 연결합니다. 무료 Mobile 구성을 기준으로 6개 키를 사용합니다.
- 기존 프로필을 비공개 위치에 백업하고, `Mobile Setup Starter`라는 별도의 시험 프로필을 만듭니다. 기존 버튼을 덮어쓰지 않습니다.

## 브라우저 데모 먼저 보기

1. 이 저장소의 Code → Download ZIP으로 파일을 내려받아 압축을 풉니다.
2. `demo/index.html`을 브라우저로 엽니다. 설치, 계정 연결, 서버 실행은 필요하지 않습니다.
3. 6개 버튼 선택, 키보드 1–6, 반복 누름과 초기화를 시험합니다.
4. 버튼 선택은 이 화면의 상태만 바꿉니다. 문서 이동은 `공개 문서 열기`를 따로 눌렀을 때만 실행됩니다.

GitHub의 HTML 파일 화면은 소스 보기입니다. 데모가 직접 실행되는 웹 주소나 GitHub Pages 배포는 제공하지 않습니다. 파일 열기 정책에 따라 브라우저가 로컬 스크립트를 제한하면 보안 설정을 낮추지 말고 다른 기본 브라우저에서 확인하거나 미리보기 시험을 미완료로 기록합니다.

## 실제 Mobile에 6개 버튼 설정

컴퓨터의 Stream Deck 앱에서 연결된 Mobile 기기와 새 시험 프로필을 선택합니다. 각 버튼의 제목은 아래와 같이 지정합니다. 실제 메뉴 이름은 앱 언어에 따라 다를 수 있습니다.

1. **저장소**: System → Website, `https://github.com/doosanofficial-ui/streamdeck-mobile-setup`
2. **설정 가이드**: System → Website, `https://github.com/doosanofficial-ui/streamdeck-mobile-setup/blob/main/docs/mobile-setup.md`
3. **참고 예제**: System → Website, `https://github.com/doosanofficial-ui/streamdeck-mobile-setup/blob/main/docs/references.md`
4. **시험 목록**: System → Website, `https://github.com/doosanofficial-ui/streamdeck-mobile-setup/blob/main/docs/testing.md`
5. **변경 기록**: System → Website, `https://github.com/doosanofficial-ui/streamdeck-mobile-setup/blob/main/CHANGELOG.md`
6. **로컬 데모**: System → Open, 내려받은 폴더의 `demo/index.html` 파일을 파일 선택기로 지정합니다. 셸 명령을 넣지 않습니다.

Website의 **GET request in background** 옵션이 있으면 끕니다. 목표는 백그라운드 요청이 아니라 컴퓨터의 브라우저에서 페이지를 여는 것입니다. Open은 파일의 기본 연결 앱을 사용하므로 HTML의 기본 연결 앱이 브라우저인지 확인합니다. 이 저장소가 기본 앱 설정을 바꾸지는 않습니다.

휴대폰에서 키를 한 번씩 누르고 컴퓨터에 올바른 페이지가 열리는지 확인합니다. 6번은 컴퓨터의 로컬 파일을 열며 iPhone에서 자체 실행되는 웹 앱이 아닙니다. [시험 목록](testing.md)에 따라 재연결과 기존 프로필 보존도 확인합니다.

## 프로필 파일의 범위

`profiles/mobile-starter.example.json`은 위 구성을 읽기 쉽게 기록한 설명용 JSON입니다. 가져오기 가능한 `.streamDeckProfile`이 아닙니다. 실제 기기에서 검증한 뒤 앱이 내보낸 프로필만 네이티브 프로필로 취급합니다. 내보낸 프로필에는 로컬 경로와 사용자 정보가 들어갈 수 있으므로 바로 공개하지 않습니다.

참고: [Elgato 기본 System 동작](https://help.elgato.com/hc/en-us/articles/360028234471-Elgato-Stream-Deck-System-Actions-Hotkey-Open-Website-Multimedia), [공식 프로필 안내](https://docs.elgato.com/stream-deck/profiles/getting-started/).
