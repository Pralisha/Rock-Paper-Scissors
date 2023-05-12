
const score=JSON.parse(localStorage.getItem('score')) || {
    wins:0,
    losses:0,
    ties:0
 };
/*  
if(!score) //if score is null
{
 score={
    wins:0,
    losses:0,
    ties:0
 };
}
*/
updateScore();
 function pickComputerMove()
 {
     
    const randomNumber=Math.random();
     // console.log(randomNumber);
     let computerMove='';
      if (randomNumber>=0 && randomNumber<1/3)
      {
         computerMove='rock';
      }
      else if(randomNumber>=1/3 && randomNumber<2/3)
      {
         computerMove='paper';
      }
      else if(randomNumber>=2/3 && randomNumber<1)
      {
          computerMove='scissors';
      }
      return computerMove;
 }

document.querySelector('.js-rock-button').addEventListener('click',() =>{
   playGame('rock');
});

document.querySelector('.js-paper-button').addEventListener('click',() =>{
   playGame('paper');
});

document.querySelector('.js-scissors-button').addEventListener('click',() =>{
   playGame('scissors');
});

document.querySelector('.js-reset-button').addEventListener('click',() =>{
   score.wins=0;
   score.ties=0;
   score.losses=0;
   localStorage.removeItem('score');
   updateScore();
});

document.querySelector('.js-autoplay-button').addEventListener('click',() =>{
   autoPlay();
});

document.body.addEventListener('keydown',(event) =>{
   if(event.key === 'r' || event.key==='R' )
   {
      playGame('rock');
   }
   else if(event.key === 'p' || event.key==='P')
   {
      playGame('paper');
   }
   else if(event.key === 's' || event.key==='S')
   {
      playGame('scissors');
   }
});

 function playGame(playerMove)
 {
        if (!playerMove) {
         console.error('Player move not provided');
        return;
       }
       const computerMove=pickComputerMove();
       result='';
       if (playerMove==='scissors')
       {
             if (computerMove==='rock')
             {
                result='You lose.';
             }
             else if(computerMove==='paper')
             {
                result='You win!';
             }
             else if(computerMove==='scissors')
             {
                result='Tie.';
             }
             
        }
        else if (playerMove==='paper')
        {
          
             if (computerMove==='rock')
             {
                result='You win!';
             }
             else if(computerMove==='paper')
             {
                result='Tie.';
             }
             else if(computerMove==='scissors')
             {
                result='You lose.';
             }

        }
        else if (playerMove==='rock')
        {
             if (computerMove==='rock')
             {
                result='Tie.';
             }
             else if(computerMove==='paper')
             {
                result='You lose.';
             }
             else if(computerMove==='scissors')
             {
                result='You win!';
             }
            
        }
        if(result==='You win!')
        {
          score.wins++;
        }
        else if(result==='You lose.'){
          score.losses++;
        }
        else if(result==='Tie.')
        {
          score.ties++;
        }
 
 localStorage.setItem('score',JSON.stringify(score));

 updateScore();

 document.querySelector('.js-result')
 .innerHTML = `${result}`;
 document.querySelector('.js-moves')
 .innerHTML = `You
 <img src="${playerMove}-emoji.png" style="width:80px; height:80px;">
 <img src="${computerMove}-emoji.png" style="width:80px; height:80px;">
 Computer`;

    /*    alert(`You picked ${playerMove}. Computer picked ${computerMove}. ${result} \n Wins: ${score.wins}  Losses: ${score.losses}  Ties: ${score.ties}`); */
 }

 function updateScore()
 {
    document.querySelector('.js-score')
 .innerHTML = `Wins: ${score.wins}  Losses: ${score.losses}  Ties: ${score.ties}`;
 }
 let isAutoPlay=false;
 let intervalID;
function autoPlay()
{
   if(!isAutoPlay)
   {
      
      
      intervalID = setInterval(() =>
      {
         const playerMove=pickComputerMove();
         playGame(playerMove);
      },800);
      isAutoPlay=true;
   }
   else
   {
      clearInterval(intervalID);
      isAutoPlay=false;
   }
   
}
function autoPlayStop()
{
   
   const autoPlayStopElement=document.querySelector('.auto-play-stop');
      autoPlayStopElement.innerHTML=`<button class="auto-play" onclick="autoPlay();"
      >Auto Play</button>`
}
