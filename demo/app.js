'use strict';
const base = 'https://github.com/doosanofficial-ui/streamdeck-mobile-setup';
const buttons = [
  { title: '저장소', description: '공개 프로젝트의 문서와 예시를 엽니다.', path: '' },
  { title: '설정 가이드', description: 'Mobile 연결과 기본 동작 6개를 설정하는 순서를 읽습니다.', path: '/blob/main/docs/mobile-setup.md' },
  { title: '참고 예제', description: '공식 SDK와 공개 예제에서 참고한 구조, 출처, 라이선스를 확인합니다.', path: '/blob/main/docs/references.md' },
  { title: '시험 목록', description: '모의 테스트와 실제 장치 시험을 구분해 확인합니다.', path: '/blob/main/docs/testing.md' },
  { title: '변경 기록', description: '이 저장소에 반영한 셋업 변경을 읽습니다.', path: '/blob/main/CHANGELOG.md' },
  { title: '로컬 데모', description: '기본 Open 동작으로 이 HTML 파일을 컴퓨터의 브라우저에서 엽니다.', path: null },
];
const keys = Array.from(document.querySelectorAll('.key'));
const byId = (id) => document.getElementById(id);
let state = StreamDeckPreview.createState();
function render() {
  const selected = state.selected === null ? null : buttons[state.selected - 1];
  keys.forEach((key) => key.setAttribute('aria-pressed', String(Number(key.dataset.key) === state.selected)));
  byId('total').textContent = state.total;
  byId('selected-count').textContent = state.selected === null ? 0 : state.counts[state.selected - 1];
  byId('detail-title').textContent = selected ? selected.title : '버튼을 눌러보세요';
  byId('detail-description').textContent = selected ? selected.description : '선택과 누름 횟수만 이 화면에서 바뀝니다. 외부 작업은 자동으로 실행되지 않습니다.';
  byId('action-type').textContent = !selected ? '선택 대기' : selected.path === null ? 'System → Open' : 'System → Website';
  const destination = byId('destination');
  destination.hidden = !selected || selected.path === null;
  if (selected && selected.path !== null) destination.href = base + selected.path;
  else destination.removeAttribute('href');
  byId('local-instruction').hidden = !selected || selected.path !== null;
}
function select(key) {
  state = StreamDeckPreview.pressKey(state, key);
  render();
  byId('status').textContent = `${key}번 ${buttons[key - 1].title} 선택 · 브라우저에서만 ${state.total}회`;
}
keys.forEach((key) => key.addEventListener('click', () => select(Number(key.dataset.key))));
byId('reset').addEventListener('click', () => {
  state = StreamDeckPreview.createState();
  render();
  byId('status').textContent = '미리보기 기록을 초기화했습니다';
});
document.addEventListener('keydown', (event) => {
  const editable = event.target instanceof HTMLElement && (event.target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName));
  if (editable || event.repeat || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
  if (/^[1-6]$/.test(event.key)) {
    event.preventDefault();
    select(Number(event.key));
  }
});
render();
