# 검증과 실제 장치 시험

현재 자동 테스트 43개, JavaScript 구문 검사, JSON/YAML 파싱을 통과했습니다. 브라우저 화면 검증과 실제 Mobile 연결·프로필 적용·키 입력 시험은 미완료입니다. 아래 체크리스트의 미체크 항목은 통과 기록이 아닙니다.

## 자동 테스트

저장소 루트에서 Node.js 24로 실행합니다.

```sh
node --check demo/model.js
node --check demo/app.js
node --check examples/vpn-plan-only/guard-contract.mjs
node --check examples/vpn-plan-only/guard-contract.test.mjs
node --test
```

43개 테스트는 브라우저 데모의 상태 전이 14개, 설정 예시의 안전 조건 3개, VPN 모의 명세 26개로 구성됩니다. 테스트가 통과해도 실제 Mobile 연결이나 키 입력을 입증하지 않습니다.

## 브라우저 미리보기 점검

- [ ] 내려받은 `demo/index.html`이 로컬 파일로 열립니다.
- [ ] 여섯 버튼 모두 설명과 기본 동작을 정확히 표시합니다.
- [ ] 반복 누름 횟수가 바뀌고 초기화하면 0으로 돌아갑니다.
- [ ] 키보드 1–6이 선택되고, 조합 키와 키를 길게 누른 반복 입력은 추가 선택을 만들지 않습니다.
- [ ] 문서는 별도 링크를 눌렀을 때만 열립니다. 로컬 데모 키에는 외부 이동 링크가 없습니다.
- [ ] 좁은 화면에서도 가로 넘침이나 겹침이 없습니다.
- [ ] 새로고침하면 누름 기록이 초기화됩니다. 개인정보나 기록을 브라우저 저장소에 저장하지 않습니다.

## 실제 Stream Deck Mobile 점검

이 목록은 실행 절차이며 통과 기록이 아닙니다.

- [ ] 컴퓨터의 Stream Deck 앱에서 실제 Mobile 기기가 연결된 것으로 표시됩니다.
- [ ] 기존 프로필을 비공개로 백업하고 별도의 시험 프로필을 만듭니다.
- [ ] Website 5개와 Open 1개를 [설정 가이드](mobile-setup.md)대로 지정합니다.
- [ ] 휴대폰에서 각 키를 눌러 올바른 컴퓨터 브라우저 페이지 또는 로컬 파일이 열리는지 확인합니다.
- [ ] 연속 누름 때 열리는 창·탭 수를 확인하고 의도하지 않은 반복 동작이 없는지 확인합니다.
- [ ] Mobile 재연결 후 프로필과 버튼이 유지됩니다.
- [ ] 기존 프로필로 돌아가 이전 버튼이 바뀌지 않았는지 확인합니다.
- [ ] 필요하면 앱에서 프로필을 내보내 비공개로 보관합니다. 실제 사용자 경로가 든 파일은 공개하지 않습니다.

실기기 결과에는 확인한 앱·운영체제 버전, 성공·실패 조건을 기록합니다. 계정, 장치 이름, 회사 정보, 내부 주소, 개인 화면은 공개 기록에서 제외합니다. 아직 실행하지 않은 단계는 미실행으로 남깁니다.

## CI

[활성 워크플로](../.github/workflows/ci.yml)는 `main` push, pull request, 수동 실행에서 다음을 검사합니다.

- JavaScript 소스·테스트 파일 6개의 구문
- `examples/buttons.example.json`, `profiles/mobile-starter.example.json` 파싱
- `node --test`로 전체 43개 모의 테스트

[GitHub Actions 실행 목록](https://github.com/doosanofficial-ui/streamdeck-mobile-setup/actions/workflows/ci.yml)에서 해당 커밋의 실행 결과를 확인합니다. 워크플로 파일이 있다는 것만으로 실행 성공을 뜻하지 않습니다. 브라우저 화면이나 실제 Mobile 장치 시험은 수행하지 않습니다.

### 권한과 실행 범위

- 표준 `ubuntu-latest` 러너 한 개, Node.js 24, 작업 제한 5분. 같은 브랜치의 새 실행은 진행 중인 이전 실행을 취소합니다.
- GitHub 공식 checkout/setup-node 액션을 검토한 전체 커밋 SHA로 고정합니다. Node 설치·저장소 checkout에는 GitHub 또는 공식 배포 경로의 네트워크 접근이 필요할 수 있습니다.
- `contents: read`만 허용하고 checkout 인증정보를 작업 공간에 남기지 않습니다. GitHub가 발급하는 일회성 작업 토큰 외에 사용자 시크릿·API 키는 요구하지 않습니다.
- 추가 패키지 설치, 모델 호출, 캐시·아티팩트 업로드, 외부 서비스 전송, 배포, 실제 기기·회사 시스템 접속은 하지 않습니다. CI 로그는 이 공개 저장소에서 누구나 볼 수 있으므로 입력과 출력에 개인정보를 넣지 않습니다.
- `pull_request_target`이나 자체 호스팅·유료 대형 러너를 사용하지 않습니다. 공개 저장소의 표준 러너만 사용하며 결제·사용량 설정은 변경하지 않습니다.
- `examples/ci-mock.yml.example`은 참조용 사본입니다. 실제 실행은 `.github/workflows/ci.yml` 한 곳에서 관리합니다.
