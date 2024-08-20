song1 ="";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftWrist = 0;
song_status = "" ;
function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
  
    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on('pose', gotPoses);

    startSong();
}
function gotPoses(results){
    if(results.length > 0){
        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreleftWrist = "+ scoreleftWrist);

        console.log(results)
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX +" leftWristY = "+leftWristY )

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +" rightWristY = "+rightWristY )


       
    }
}

function modelLoaded(){
    console.log('PoseNet Is Initialized')
}
function draw() {
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000")

   song1.isPlaying();
   song_status = "true";
   if(scoreleftWrist > 0.2){
    circle(leftWristX,leftWristY,20);
    song1.stop();
    song_status = "false";
    if(song_status = "false"){
        song2.play();
    }
   }
}

function startSong(){
    song1.play();
}