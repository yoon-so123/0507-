import { catsData } from "./data.js";

const emotionRadios = document.getElementById("emotion-radios");
const getImageBtn = document.getElementById("get-image-btn");
const gifsOnlyOption = document.getElementById("gifs-only-option");
const memeModal = document.getElementById("meme-modal");
const memeModalInner = document.getElementById("meme-modal-inner");
const memeModalCloseBtn = document.getElementById("meme-modal-close-btn");

memeModalCloseBtn.addEventListener("click", closeModal);
function closeModal() {
  memeModal.style.display = "none";
}

getImageBtn.addEventListener("click", renderCat); //콜백은 괄호괄호 넣으면 안됨.

emotionRadios.addEventListener("change", function (e) {
  const radios = document.getElementsByClassName("radio");
  for (let radio of radios) {
    radio.classList.remove("highlight");
  }
  const selectedElement = document.getElementById(e.target.id); //인풋라디오
  const selectedParentEl = selectedElement.parentElement; //인풋라디오의 부모 디브
  selectedParentEl.classList.add("highlight");
});

function renderCat() {
  const catObject = getSingleCatObject(); //html 의 modal 에 띄워야함.
  memeModalInner.innerHTML = `
  <img
  class="cat-img"
  src="./images/${catObject.image}"
  >`;

  memeModal.style.display = "flex";
}

function getSingleCatObject() {
  //고양이 사진이 여러장 나올수도있고 없을수도잇음.
  //어찌됐든 한장만 랜덤으로 뽑을거임.
  const catsArray = getMatchingCatsArray(); //v필터링된 애를 들고오는것.
  if (catsArray.length === 1) {
    return catsArray[0];
  } else {
    const randomNumber = Math.floor(Math.random() * catsArray.length);
    return catsArray[randomNumber];
  }
}

function getMatchingCatsArray() {
  const isGif = gifsOnlyOption.checked; //체크유무  true false
  const selectedEmotion = document.querySelector(
    `input[type="radio"]:checked`
  ).value;

  const getMatchingCatsArray = catsData.filter(
    function (cat) {
      if (isGif) {
        //체크박스 체크 됐는지 여부
        return cat.emotionTags.includes(selectedEmotion) && cat.isGif; //cat.isGif는 catData 에 isGif가 true 인지.
      } else {
        return cat.emotionTags.includes(selectedEmotion);
      }
    }
    // return cat.emotionTags.includes(selectedEmotion);
  );
  console.log(getMatchingCatsArray);
}

function getEmotionsArray(cats) {
  const emotionsArray = [];
  for (let item of cats) {
    for (let emotion of item.emotionTags) {
      if (!emotionsArray.includes(emotion)) {
        emotionsArray.push(emotion);
      }
    }
  }
  return emotionsArray;
}

function renderEmotionRadios(cats) {
  const emotions = getEmotionsArray(cats);
  let radioItems = "";
  for (let emotion of emotions) {
    radioItems += `
    <div class="radio">
    <label for="${emotion}">${emotion}</label>
    <input 
    type="radio"
    id="${emotion}"
    value="${emotion}"
    name="emotions">
    </div>
    `;
  }
  emotionRadios.innerHTML = radioItems;
}
renderEmotionRadios(catsData);

//Get Image 버튼을 누르면
//getMatchingCatsArray()라는 함수가 동작하는데
//라디오에서 선택된 애의 값(내용 예: moody) 콘솔에 출력하기
//이벤트리스너 (이벤트이름, 콜벡함수이름)
//function 콜백함수이름() {}

//let 새로운 배열
//const 새로운 배열 이름 = 기존배열이름.filter(function (매개변수-이름알아서짓기){
// return 새로운 배열에 추가되는 조건식})

//for of
//import export
//radio & checkbox inputs
//querySelector
//getElementsByClassName
//classList.remove classList.add
//includes()
//.filter
//.parentElement
