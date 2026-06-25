(function () {


    'use strict';
  
  
    /* ─── 상태 ─── */
  
  
    const STATE_KEY = 'sdiBingoState';
  
  
    let flippedSet = new Set(); // 뒤집힌 칸 인덱스
  
  
    /* ─── DOM ─── */
  
  
    const cards        = document.querySelectorAll('.bingo-card');
  
  
    const countEl      = document.getElementById('completed-count');
  
  
    const lineMsgEl    = document.getElementById('bingo-line-msg');
  
  
    const boardEl      = document.getElementById('bingo-board');
  
  
    /* ─── 빙고 라인 정의 (인덱스 0~8, 3×3 기준) ─── */
  
  
    const BINGO_LINES = [
  
  
      [0, 1, 2], // 1행
  
  
      [3, 4, 5], // 2행
  
  
      [6, 7, 8], // 3행
  
  
      [0, 3, 6], // 1열
  
  
      [1, 4, 7], // 2열
  
  
      [2, 5, 8], // 3열
  
  
      [0, 4, 8], // 대각선 ↘
  
  
      [2, 4, 6], // 대각선 ↙
  
  
    ];
  
  
    /* ─── 저장된 상태 복원 ─── */
  
  
    function loadState() {
  
  
      try {
  
  
        const raw = localStorage.getItem(STATE_KEY);
  
  
        if (raw) {
  
  
          const arr = JSON.parse(raw);
  
  
          if (Array.isArray(arr)) {
  
  
            flippedSet = new Set(arr);
  
  
          }
  
  
        }
  
  
      } catch (_) { /* 무시 */ }
  
  
    }
  
  
    function saveState() {
  
  
      try {
  
  
        localStorage.setItem(STATE_KEY, JSON.stringify([...flippedSet]));
  
  
      } catch (_) { /* 무시 */ }
  
  
    }
  
  
    /* ─── 카드 플립 토글 ─── */
  
  
    function flipCard(card) {
  
  
      const idx = parseInt(card.dataset.index, 10);
  
  
      // 이미 뒤집힌 카드 클릭 → 되돌리기 (선택적으로 주석 처리 가능)
  
  
      if (flippedSet.has(idx)) {
  
  
        flippedSet.delete(idx);
  
  
        card.classList.remove('flipped');
  
  
      } else {
  
  
        flippedSet.add(idx);
  
  
        card.classList.add('flipped');
  
  
      }
  
  
      saveState();
  
  
    }
  
  
  
    /* ─── 초기화 ─── */
  
  
    function init() {
  
  
      loadState();
  
  
      // 저장된 상태 반영
  
  
      cards.forEach((card, idx) => {
  
  
        if (flippedSet.has(idx)) {
  
  
          card.classList.add('flipped');
  
  
        }
  
  
      });
  
  
      // 이벤트 바인딩
  
  
      cards.forEach(card => {
  
  
        card.addEventListener('click', () => flipCard(card));
  
  
        card.addEventListener('keydown', (e) => {
  
  
          if (e.key === 'Enter' || e.key === ' ') {
  
  
            e.preventDefault();
  
  
            flipCard(card);
  
  
          }
  
  
        });
  
  
      });
  
  
    }
  
  
    init();
  
  
  })();