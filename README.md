# Stream Deck Mobile Setup

Stream Deck Mobile의 버튼 구성, 설정 방법, 자동화 예시를 정리하고 계속 업데이트하기 위한 저장소입니다. 웹사이트 열기, 앱 실행, 작업 흐름 단축처럼 여러 용도로 확장할 수 있습니다. VPN은 가능한 예시 중 하나입니다.

## 6버튼 데모

**검증 상태:** 구문·설정·보안 검토와 자동 테스트 43개를 통과했습니다. 브라우저 화면 검증과 실제 Stream Deck Mobile 시험은 아직 완료하지 않았습니다. 데모는 미리보기 초안입니다. CI 실행 상태는 [GitHub Actions](https://github.com/doosanofficial-ui/streamdeck-mobile-setup/actions/workflows/ci.yml)에서 확인할 수 있습니다.

[Mobile Setup Starter 설정 가이드](docs/mobile-setup.md)를 따라 기본 Website 5개와 Open 1개로 시험할 수 있습니다. 추가 플러그인이나 인증은 사용하지 않습니다.

Code → Download ZIP으로 내려받아 압축을 푼 뒤 `demo/index.html`을 열면 6개 버튼의 설명, 선택 상태, 누름 횟수와 초기화를 미리 볼 수 있습니다. 이 화면은 **브라우저 미리보기이며 실제 Stream Deck 기기에 연결되지 않습니다.** GitHub의 HTML 소스 화면은 실행 가능한 웹 데모가 아닙니다.

- [설정 레시피](profiles/mobile-starter.example.json): 설명용 JSON, 네이티브 프로필 가져오기용이 아님
- [참고한 프로젝트와 라이선스](docs/references.md)
- [실제 Mobile 시험 체크리스트](docs/testing.md)
- [변경 기록](CHANGELOG.md)

## 현재 제공하는 것

- 버튼 구성을 설명하는 사람이 읽을 수 있는 JSON 예시
- 기존 설정을 보존하며 변경하는 [설정 가이드](docs/setup.md)
- 공개 전에 확인할 [보안·개인정보 체크리스트](docs/publishing-checklist.md)
- 실제 작업을 실행하지 않는 VPN 상태 판정 모의 예시와 26개 테스트
- 사용자가 등록한 비밀값 없이 구문·JSON·모의 테스트를 실행하는 GitHub Actions CI

이 저장소는 Elgato의 Stream Deck Mobile 앱, 공식 플러그인 또는 가져오기 가능한 프로필 패키지가 아닙니다. JSON 예시는 이 저장소의 설명용 형식이며 Stream Deck으로 직접 가져올 수 없습니다. 현재 장치 연결, 명령 실행, 웹 로그인, VPN 접속을 수행하는 구현은 포함하지 않습니다. 데모의 외부 문서 링크는 사용자가 별도로 눌렀을 때만 열립니다.

## 시작하기

1. [설정 가이드](docs/setup.md)를 읽습니다.
2. [버튼 예시](examples/buttons.example.json)를 참고해 필요한 버튼을 고릅니다. 모든 예시는 비활성 상태이며 실제 설정은 개인 컴퓨터에서 따로 관리합니다.
3. 기존 프로필을 비공개로 백업한 뒤 버튼 하나씩 적용하고 실제 동작을 확인합니다.
4. 공유할 내용은 [공개 체크리스트](docs/publishing-checklist.md)에 따라 별도로 검토합니다.

## 모의 테스트

Node.js 24에서 외부 패키지 설치 없이 실행합니다.

```sh
node --check demo/model.js
node --check demo/app.js
node --check examples/vpn-plan-only/guard-contract.mjs
node --check examples/vpn-plan-only/guard-contract.test.mjs
node --test
```

전체 자동 테스트는 43개입니다. 이 중 VPN 모의 명세 26개는 합성 상태 값만 받아 판정 문자열을 반환합니다. `.invalid` 예약 도메인과 가짜 탭 ID를 사용하며, 모든 조건이 맞아도 `PLAN_ONLY_READY`만 반환합니다. 실제 Stream Deck 버튼, 브라우저, 인증, VPN의 동작을 검증하지 않습니다. 1초의 관측 유효기간도 예시 값입니다.

[CI 워크플로](.github/workflows/ci.yml)는 `main` push, pull request, 수동 실행에서 구문 검사, JSON 두 개 파싱, 전체 모의 테스트를 실행합니다. 표준 Ubuntu 러너 한 개와 Node.js 24를 사용하며, 작업 제한은 5분입니다. 자세한 범위와 제한은 [검증 문서](docs/testing.md#ci)를 확인하세요. `examples/ci-mock.yml.example`은 참조용 사본이며 별도로 실행되지 않습니다.

## 변경 원칙

- 범용 설명과 합성 예시를 공개하고, 실제 환경별 값은 별도로 관리합니다.
- 실기기에서 확인한 결과와 모의 테스트 결과를 구분합니다.
- 회사 주소, 계정, 인증 정보, 실제 프로필, 개인 작업 기록을 넣지 않습니다.
- 실제 동작이나 권한이 필요한 예시를 추가할 때는 영향과 복구 방법을 먼저 문서화합니다.

이 프로젝트는 Elgato와 제휴하거나 공식 지원을 받는 프로젝트가 아닙니다.

## 공식 자료

- [Stream Deck Mobile 시작하기](https://help.elgato.com/hc/en-us/articles/16786832942221-Elgato-Stream-Deck-Mobile-2-0-Getting-Started)
- [Stream Deck 플러그인 실행 구조](https://docs.elgato.com/streamdeck/sdk/introduction/plugin-environment/)
