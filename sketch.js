var ball;
var database;
function setup(){
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    database = firebase.database();
    var currentpositionoftheballfromdb = database.ref("ball/position");
    currentpositionoftheballfromdb.on("value",readPosition,showError);
    ball.shapeColor = "red";
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){

    database.ref("ball/position").set(
        {
            "x" : ball.x + x,
            "y" : ball.y + y,
        }
    )
}

function readPosition(data){

   var currentPostionfromdb = data.val()
   ball.x = currentPostionfromdb.x
   ball.y = currentPostionfromdb.y

}

function showError(){
    console.log("error in reading and writing of data")
}