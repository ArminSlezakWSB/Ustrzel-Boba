//CONSTRUCTORS
function Jumper(score)
{
    this.face = 'url("img/score.png")',
    this.score = score,
    this.jump = function()
    {
        return Math.floor(Math.random()*11);
    }
}
//OBJECTS
var jumper1 = new Jumper(1);
var Xjumper = new Jumper(20);

//VARIABLE
var body = document.getElementById("body");
var startButton = document.getElementById("start");
var timer = document.getElementById("timer");

var time = 61;
var gameOver = false;
var YouCanClick = true;
var score = 0;

var jump;
var Xjump;

startButton.onclick = function()
{
    //LOADING WEBPAGE CONTENT
    body.innerHTML = '<div class="window_container"><div class="window_row"><div class="window"></div><div class="window"></div><div class="window"></div><div class="window"></div></div><div class="window_row"><div class="window"></div><div class="window"></div><div class="window"></div></div> <div class="window_row"> <div class="window"></div> <div class="window "></div> <div class="window"></div> <div class="window"></div> </div> </div> <div class="timer" id="timer">'+time+'</div> <div class="score" id="score">0</div>';
    
    //TIMER
    function timer()
    {
        time--;
        document.getElementById("timer").innerHTML = time;
        if(!time<=10){
            if(time == 10) document.getElementById("timer").classList.add("timer_down");            
        }
        if(time>0) setTimeout(timer, 1000);
        if(time == 0)
            {
                gameOver = true;
                document.getElementById("timer").classList.remove("timer_down");
            }
    }
    timer(); 
    
    //SET JUMP TO NORMAL SCORE
    function randomObj()
    {
        jump = jumper1.jump();
        document.getElementsByClassName("window")[jump].classList.add("jumper-window");
        function removeJumperPicture()
        {
            document.getElementsByClassName("window")[jump].classList.remove("jumper-window");
            YouCanClick = true;
        }
        setTimeout(removeJumperPicture, 300);
    }
    randomObj();
    
    function randomXObj()
    {
        do{
            Xjump = Xjumper.jump();
        }while(Xjump == jump);
    }   
    randomXObj();
    
    //CardClick
    function CheckCard(nr)
    {
        document.getElementsByClassName("window")[nr]["onclick"] = function()
        {
            if(YouCanClick == true && gameOver == false)
                {
                    YouCanClick = false;
                    if(nr == jump)
                        {
                            document.getElementsByClassName("window")[jump].classList.remove("jumper-window");
                            score+=jumper1.score;
                            document.getElementById("score").textContent = score;
                        }
                    else if(nr == Xjump)
                        {
                            function x()
                            {
                                document.getElementsByClassName("window")[Xjump].classList.add("extra-jumper");
                                score+=Xjumper.score;
                                document.getElementById("score").textContent = score;
                            }
                            setTimeout(x, 0);
                            
                            function removeClass()
                            {
                                document.getElementsByClassName("window")[Xjump].classList.remove("extra-jumper");
                                YouCanClick = true;
                            }
                            setTimeout(removeClass, 300);
                        }
                    
                    //SET JUMP TO NORMAL SCORE
                   setTimeout(randomXObj, 300);
                   randomObj();  
                }
        }
    } CheckCard(0);CheckCard(1);CheckCard(2);CheckCard(3);CheckCard(4);CheckCard(5);CheckCard(6);CheckCard(7);CheckCard(8);CheckCard(9);CheckCard(10);
}