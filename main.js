function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(380,380);
    objectDetector = ml5.objectDetector('cocossd', modelLoaded); 
        document.getElementById("status").innerHTML = "status: detecting object";
    
    }
    function start(){
        
    }
    song = "";
    status1 ="";
    objects =[];
    
    
    function preload(){
        song = loadSound("alarm.mp3");
    }
    function draw(){
        image(video, 0, 0, 380, 380);
        if(status1 !== ""){
            r = random(255);
            g = random(255);
            b = random(225);
            objectDetector.detect(video, gotResult);

            for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "status: objects detected"; 
            document.getElementById("number_of_objects").innerHTML = "number of objects detected are :" + objects.length;
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x, objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(object[i].label == "person"){
                document.getElementById("number_of_objects").innerHTML = "baby found";
                song.stop();

            }
            else{
                document.getElementById("number_of_objects").innerHTML = "baby not found";
                song.play();

            }


    
            
    
            }
        }
        
    }
    
    function modelLoaded(){
        console.log("model loaded");
        status1 = true;
        
    }
    function gotResult(error,results){
        if(error){
            console.log(error);
        }
        console.log(results);
        objects = results;
    }