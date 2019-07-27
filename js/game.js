const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;

let tryes = 1;
let miss = 0;

function round() {
  // FIXME: надо бы убрать "target" прежде чем искать новый
  
  let divSelector = randomDivId();
  let missDivSelector = randomDivId();
  compare();
  $(missDivSelector).addClass("miss");
  $(divSelector).addClass("target");
  $(divSelector).text(tryes);
  tryes += 1;
  if (hits === 0){
    firstHitTime = getTimestamp();
  }

  // TODO: помечать target текущим номером

  // FIXME: тут надо определять при первом клике firstHitTime

  if (hits === maxHits) {
    endGame();

    }
  function compare(){
      
      if(missDivSelector === divSelector){
        missDivSelector = randomDivId();
        compare();
    }
  }
}

function endGame() {
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $(".game-field").hide();
  $('#button-reload').hide();
  $("#total-time-played").text(totalPlayedSeconds);
  $("#total-miss").text(miss);

  $("#win-message").removeClass("d-none");

  
}

function handleClick(event) {
  // FIXME: убирать текст со старых таргетов. Кажется есть .text?
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    $(".target").text("");
    $(".target").removeClass("target");
    $(".miss").removeClass("miss");
    
    round();

  }
  if ($(event.target).hasClass("miss")) {
     
    miss +=1;
  }
  
  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
}



function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  round();

  $(".game-field").click(handleClick);
  //$("#button-reload").click(function() {
  //  location.reload();
  //});
}

$('#button-reload').click(function(){
  $(document).ready(init);
  event.preventDefault();
});

$('#reload').click(function(){
  location.reload();
});
