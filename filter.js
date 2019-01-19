/* 
============ 
사용법: 파일 내용을 전부 복사해 브라우저 콘솔에 넣고 실행해주세요~!
============
 */

filter();

/* 
============ 
DOM 조작 코드
============
 */
function filter() {
  const option = prompt(
    "문제 정렬 옵션을 입력해 주세요\n1) 숨기고 오름차순\n2) 숨기고 내림차순\n3) 숨기지 않고 오름차순\n4) 숨기지 않고 내림차순",
    "예: 3"
  );
  const hideCleared = option <= 2 ? true : false;
  const sortOrder = option % 2 ? true : false;
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
