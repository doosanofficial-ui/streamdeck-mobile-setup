# 참고한 공개 예제

아래 프로젝트의 구조와 검증 방식을 참고했습니다. 이 저장소의 데모와 아이콘 없는 버튼 UI는 새로 작성했으며, 아래 프로젝트의 소스나 이미지 자산을 복사하지 않았습니다.

## Elgato 공식 SDK와 Counter

- [SDK](https://github.com/elgatosf/streamdeck)
- [예제 목록](https://github.com/elgatosf/streamdeck/blob/main/examples/README.md)
- [Counter 예제](https://github.com/elgatosf/streamdeck/tree/main/examples/counter)
- [MIT 라이선스](https://github.com/elgatosf/streamdeck/blob/main/LICENSE)

키 입력 처리와 표시 상태를 작은 단위로 나누는 방식을 참고합니다. 여기의 누름 횟수 데모는 브라우저 상태만 변경하며 SDK나 네이티브 키 이벤트를 사용하지 않습니다. 앞으로 네이티브 Counter를 추가할 때는 선택한 버전의 manifest, Node, Stream Deck 요구사항을 함께 검증해야 합니다. 현재 SDK 루트와 일부 예제의 버전 안내가 다르므로 문서의 숫자만 옮기지 않습니다.

## Itsyhome Stream Deck

- [프로젝트와 설명](https://github.com/nickustinov/itsyhome-streamdeck/blob/main/README.md)
- [MIT 라이선스](https://github.com/nickustinov/itsyhome-streamdeck/blob/main/LICENSE)
- [버튼 테스트](https://github.com/nickustinov/itsyhome-streamdeck/blob/main/tests/actions/toggle-device.test.ts)

동작, 외부 서비스 클라이언트, 설정 UI, 테스트를 분리하는 구조를 참고합니다. 이 저장소도 `demo/`, `profiles/`, `examples/`, `docs/`를 나누고, 모의 화면 상태를 실제 서비스 상태와 구분합니다. Itsyhome의 실제 연동에는 별도 제품과 로컬 서버가 필요하므로 기본 셋업에는 설치하거나 포함하지 않습니다. 이미지와 아이콘은 별도 출처 조건도 확인해야 합니다.

## Stream Deck Shell Executor

- [설명](https://github.com/MAR-GUEZ/stream-deck-shell-executor/blob/main/README.md)
- [패키지 정보](https://github.com/MAR-GUEZ/stream-deck-shell-executor/blob/main/package.json)

시간초과, 작업 디렉터리, 성공·오류 표시라는 검증 관점만 참고합니다. README와 패키지 메타데이터는 MIT를 표시하지만 조사 당시 루트 LICENSE 파일을 확인하지 못했습니다. 완전한 권리 고지를 확인하기 전에는 코드를 복사하지 않습니다. 임의 셸 실행, 파일 삭제, 네트워크 제어 기능은 이 저장소의 기본 데모에 넣지 않습니다.

## 이 저장소의 선택

기본 Website와 Open 동작으로 시작하면 새 플러그인, SDK 런타임, 인증, 명령 실행 권한 없이 설정을 시험할 수 있습니다. 네이티브 키의 제목·아이콘을 바꾸는 기능이 필요해질 때 별도 플러그인을 검토합니다.
