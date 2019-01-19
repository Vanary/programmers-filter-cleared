/* 
============ 
사용법 : 
아래 함수의 옵션을 수정한 후, 파일 내용을 전부 복사해 브라우저 콘솔에 넣고 실행해주세요~!
============
 */

filter({
  hideCleared: 1, // 푼 문제 숨김: 1  ||  삭제 안함: 0
  sortOrder: 0 // 오름차순: 1  ||  내림차순: 0
});

/* 
============ 
DOM 조작 코드 - 아래 코드는 수정하시면 안돼요~!
============
 */
function filter({ hideCleared, sortOrder }) {
  // 보이는 페이지의 문제 목록을 변수에 저장
  const list = document.querySelector("div.algorithm-list > .row");
  let questions = [...document.querySelectorAll("div.col-item")];

  // 문제의 '언어 목록'에 풀이완료 표시(파란 원) 있으면 삭제하는 함수
  function remover(el, idx) {
    const bCleared = el.querySelector(".ic-added-circle");
    return bCleared ? false : true;
  }

  // 문제 목록 순서 정렬용 함수
  function sorter(el1, el2) {
    const numOfEl1Finish = el1
      .querySelector(".finished-count")
      .innerText.match(/\d+/g);
    const numOfEl2Finish = el2
      .querySelector(".finished-count")
      .innerText.match(/\d+/g);

    return numOfEl2Finish * 1 - numOfEl1Finish * 1;
  }

  // 사용자 설정에 따라 푼 문제는 숨김
  if (hideCleared) {
    questions = questions.filter(el => remover(el));
  }

  // 문제 목록을 푼 인원 순으로 정렬
  const descQuestions = [...questions].sort(sorter);
  const orderedQuestions = sortOrder ? descQuestions.reverse() : descQuestions;

  // 정렬된 문제 목록을 화면에 새로고침
  list.innerHTML = orderedQuestions.reduce(
    (acc, el) => `${acc}<div class="col-item">${el.innerHTML}</div>`,
    ""
  );
}
