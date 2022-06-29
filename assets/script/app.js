var video_list = ["1.mp4", "2.mp4", "3.mp4", "4.mp4"];
var video_index = 0;
var video_player = null;
var video_url_helper = "assets/files/";
var i = 0;
var vidLen = 0;
var playPauseBtn, slider, volumeSlider, caption, timer, duration, backwardBtn, forwardBtn, prevBtn, nextBtn, volBtn, muteIcon;
var videolistArray = [];
var lastVolValue = 0;
var unmuted = false;
var volumeClick = false;
var backForTime = 3.0;

$(document).ready(function() {

    video_player = document.getElementById("m_video_Player");
    playPauseBtn = document.getElementById("playPauseBtn");
    slider = document.getElementById("slider");
    timer = document.getElementById("timer");
    duration = document.getElementById("duration");
    volumeSlider = document.getElementById("volume");
    caption = document.getElementById("m_video_Player_sub_title");
    backwardBtn = document.getElementById("scrollBackwardBtn");
    forwardBtn = document.getElementById("scrollForwardBtn");
    prevBtn = document.getElementById("btn-prev");
    nextBtn = document.getElementById("btn-next");
    volBtn = document.getElementById("btn-mute");
    muteIcon = document.getElementById("mute");


    $('#m_video_Player').on('click', function (e) {
        //nxt();
        e.preventDefault();
    });

    // $(".btn-mute").click(function(){
    //     if ($('#mute').hasClass('fa-volume-high'))
    //     {
    //         $("#mute").removeClass("fa-volume-high");
    //         $("#m_video_Player").prop('muted', true);
    //         $("#mute").addClass("fa-volume-xmark");
    //         volumeSlider.value = 0;
    //     }
    //     else
    //     {
    //         $("#mute").removeClass("fa-volume-xmark");
    //         $("#m_video_Player").prop('muted', false);
    //         $("#mute").addClass("fa-volume-high");
    //         if(!unmuted){
    //             unmuted = true;
    //             volumeSlider.value = 100;
    //         }else {
    //             volumeSlider.value = lastVolValue;
    //         }
    //     }
    // });

    $(".btn-next").click(function(){
        nxt();
    });

    $(".btn-prev").click(function(){
        prvs();
    });

    $(".btn-mute").click(function(){
        volumesControl();
    });
    video_index = 0;
    getData();
});

function playVideo(video_index){
    video_player.setAttribute("src", video_url_helper + videolistArray[video_index]);
    loadSubTitle(video_index);
    video_player.play();
}
function onVideoEnded(){

    // if(video_index == 0){
    //     video_index++;
    //     playVideo(video_index);
    //
    // }
    // else if(video_index == vidLen-2){
    //     nextBtn.classList.add("btn-hidden");
    //     video_index++;
    //     playVideo(video_index);
    //     console.log('vidLen : ' + vidLen);
    //     console.log('video_index : ' + video_index);
    //     console.log('exectuded from 2');
    // }
    // else{
    //     if(video_index < vidLen-1){
    //         //$("#btn-next").classList += (" btn-hidden");
    //         video_index++;
    //         playVideo(video_index);
    //         console.log('vidLen : ' + vidLen);
    //         console.log('video_index : ' + video_index);
    //         console.log('exectuded from 3');
    //     }
    //     else {
    //         //do nothing
    //         console.log('vidLen : ' + vidLen);
    //         console.log('video_index : ' + video_index);
    //         console.log('exectuded from 4');
    //     }
    // }
    console.log('vidLen : ' + vidLen);
    console.log('video_index : ' + video_index);
    //  if(video_index < vidLen-1){
    //     //$("#btn-next").classList += (" btn-hidden");
    //     if(video_index == 0){
    //         if(prevBtn.classList.contains('btn-hidden')){
    //             prevBtn.classList.remove("btn-hidden");
    //         }
    //         console.log('exectuded from 0');
    //     }
    //     else if(video_index == vidLen-2){
    //         nextBtn.classList.add("btn-hidden");
    //     }
    //     video_index++;
    //     playVideo(video_index);
    // }
    // else{
    //     video_index =0;
    //     prevBtn.classList.add("btn-hidden");
    //      if(nextBtn.classList.contains('btn-hidden')){
    //          nextBtn.classList.remove("btn-hidden");
    //      }
    //     playVideo(video_index);
    // }
    playVideo(video_index);
}
function nxt()
{
    if(video_index == 0){
        video_index++;
        if(prevBtn.classList.contains('btn-hidden')){
            prevBtn.classList.remove("btn-hidden");
        }
        playVideo(video_index);
    }
    else if(video_index == vidLen-2){
        video_index++;
        nextBtn.classList.add("btn-hidden");
        playVideo(video_index);
    }
    else{
        if(video_index < vidLen-1){
            video_index++;
            playVideo(video_index);
        }
        else {
            //do nothing
        }
    }

}

function prvs()
{
    if(video_index == 1){
        video_index--;
        prevBtn.classList.add("btn-hidden");
        playVideo(video_index);
    }
    else if(video_index == vidLen-1)
    {
        video_index--;
        if(nextBtn.classList.contains('btn-hidden')){
            nextBtn.classList.remove("btn-hidden");
        }
        playVideo(video_index);
    }
    else
    {
        if(video_index < vidLen-1){
            video_index--;
            playVideo(video_index);
        }
        else {
            //do nothing
        }
    }
}


function getData() {
    var form_data = new FormData();
    url = video_url_helper;
    form_data.append("filelist", "filelist");
    getRequest(
        url, // URL for the PHP file
        form_data, // dataset to server
        drawSuccess,  // handle successful request
        drawError    // handle error
    );
}

function getRequest(url, data, success, error) {
    var req = false;
    try{
        req = new XMLHttpRequest();
    } catch (e){
        // IE
        try{
            req = new ActiveXObject("Msxml2.XMLHTTP");
        } catch(e) {
            // try an older version
            try{
                req = new ActiveXObject("Microsoft.XMLHTTP");
            } catch(e) {
                return false;
            }
        }
    }
    if (!req) return false;
    if (typeof success != 'function') success = function () {};
    if (typeof error!= 'function') error = function () {};
    req.onreadystatechange = function(){
        if(req.readyState == 4) {
            var response = req.responseText;
            drawOutput(response);
            return req.status === 200 ?
                success(req.responseText) : error(req.status);
        }
    }
    req.open("POST", url, true);
    req.send(data);
    return req;
}
function drawOutput(response) {

    var listArray = response.split(',');
    listArray.pop();
    for(var i = 0; i< listArray.length;i++){
        videolistArray.push(listArray[i].toString());
        //console.log(videolistArray[i]);
    }
    //console.log(videolistArray.length);
    vidLen = videolistArray.length;
    shuffle(videolistArray);
    video_player.setAttribute("src", video_url_helper + videolistArray[0]);
    playPauseBtn.addEventListener("click", toggleVideoStatus);
    //backwardBtn.addEventListener("click", playBack);
    //forwardBtn.addEventListener("click", playForward);
    video_player.addEventListener("play", updateIcon);
    video_player.addEventListener("pause", updateIcon);
    video_player.addEventListener("timeupdate", setSliderAndTimer);
    video_player.addEventListener("ended", onVideoEnded);
    video_player.addEventListener("click", toggleVideoStatus);
    //volBtn.addEventListener("click", volumesControl);
    //volBtn.addEventListener("touchstart", volumesControl);
    //muteIcon.addEventListener("click", volumesControl);
    // $("#btn-mute").click(function(e) {
    //     volumesControl();
    // });
    // $("#mute").click(function(e) {
    //     volumesControl();
    // });
    slider.addEventListener("input", seeked);
    // volumeSlider.addEventListener("input", volControl);
    // volumeSlider.addEventListener("input", function(evt) {
    //     video_player.value = evt.target.value;
    //     if (evt.target.value > 0 && evt.target.value <55) {
    //         if ($('#mute').hasClass('fa-volume-high')){
    //             $("#mute").removeClass("fa-volume-high");
    //             $("#m_video_Player").prop('muted', false);
    //             $("#mute").addClass("fa-volume-low");
    //         }else {
    //             $("#mute").removeClass("fa-volume-xmark");
    //             $("#m_video_Player").prop('muted', false);
    //             $("#mute").addClass("fa-volume-low");
    //         }
    //     }else if(evt.target.value >= 55){
    //         $("#mute").removeClass("fa-volume-low");
    //         $("#m_video_Player").prop('muted', false);
    //         $("#mute").addClass("fa-volume-high");
    //     }else{
    //         $("#mute").removeClass("fa-volume-high");
    //         $("#m_video_Player").prop('muted', true);
    //         $("#mute").addClass("fa-volume-xmark");
    //     }
    // });
    // video_player.play();
    //
    // loadSubTitle(0);
    playVideo(video_index);
}

function volumesControl() {

    // var touched = true;
    // if($("#mute").hasClass("fa-volume-high")){
    //     console.log('fa-volume-high');
    //     $('#mute').removeClass("fa-volume-high");
    //     $('#mute').addClass("fa-volume-xmark");
    //     $("#m_video_Player").prop('muted', true);
    // }else if($("#mute").hasClass("fa-volume-xmark")){
    //     console.log('fa-volume-xmark');
    //     $('#mute').removeClass("fa-volume-xmark");
    //     $('#mute').addClass("fa-volume-high");
    //     $("#m_video_Player").prop('muted', false);
    // }
    //video_player.muted = !video_player.muted;
    if ($("#m_video_Player").prop('muted')) {
        $('#mute').removeClass("fa-volume-xmark");
        $('#mute').addClass("fa-volume-high");
        $("#m_video_Player").prop('muted', false);
    }
    else {
        $('#mute').removeClass("fa-volume-high");
        $('#mute').addClass("fa-volume-xmark");
        $("#m_video_Player").prop('muted', true);
    }
    // if(video_player.muted){
    //     muteIcon.classList.remove("fa-volume-high");
    //     muteIcon.classList.add("fa-volume-xmark");
    //     video_player.muted = false;
    // }
    // else {
    //     muteIcon.classList.remove("fa-volume-xmark");
    //     muteIcon.classList.add("fa-volume-high");
    //     video_player.muted = true;
    // }

}



function loadSubTitle(randomnumber) {
    try{
        var vttFilename = videolistArray[randomnumber].slice(0, videolistArray[randomnumber].lastIndexOf('.'));
        var vttURL = video_url_helper + vttFilename + ".vtt";
        if(urlExists(vttURL)){
            caption.setAttribute("src", video_url_helper + vttFilename + ".vtt");
            video_player.textTracks[0].mode = 'showing';
        }
        else {
            video_player.textTracks[0].mode = 'hidden';
        }
    }
    catch(err){
        //console.log(err);
        //video_player.textTracks[0].mode = 'hidden';
    }
}

function urlExists(url)
{
    try{
        var http = new XMLHttpRequest();
        http.open('HEAD', url, false);
        http.send();
        return http.status!=404;
    }
    catch(err){}
}

function volumeControl() {
    volumeSlider.value = video_player.volume
    if (video_player.muted || video_player.volume === 0) {
        volumeSlider.value = 0;
    }
}


function shuffle(arra1) {
    var ctr = arra1.length, temp, index;

// While there are elements in the array
    while (ctr > 0) {
// Pick a random index
        index = Math.floor(Math.random() * ctr);
// Decrease ctr by 1
        ctr--;
// And swap the last element with it
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}
function drawSuccess() {
    //console.log("Success");
}
function drawError() {
    console.log("Failed");
}
/*Helper JS*/


function updateIcon() {
    if (video_player.paused) {
        playPauseBtn.innerHTML = "<i class='fas fa-play'></i>";
        playPauseBtn.style.color = "#f4f4f4";
    } else {
        playPauseBtn.innerHTML = "<i class='fas fa-pause'></i>";
        playPauseBtn.style.color = "#f4f4f4";
    }
}
function toggleVideoStatus() {
    if (video_player.paused) {
        video_player.play();
        updateIcon();
    } else {
        video_player.pause();
        updateIcon();
    }
}
function stopVideo() {
    video_player.currentTime = 0;
    setSliderAndTimer();
    video_player.pause();
}

function setSliderAndTimer() {
    try{
        //get minutes
        var minutes = Math.floor(video_player.currentTime / 60);
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        //get seconds
        var seconds = Math.floor(video_player.currentTime % 60);
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        timer.textContent = minutes +':'+seconds;

        //get minutes duration
        var minutes_duration = Math.floor(video_player.duration / 60);
        if (minutes_duration < 10) {
            minutes_duration = "0" + minutes_duration;
        }
        //get seconds duration
        var seconds_duration = Math.floor(video_player.duration % 60);
        if (seconds_duration < 10) {
            seconds_duration = "0" + seconds_duration;
        }
        duration.textContent = minutes_duration +':'+seconds_duration;

        slider.value = (video_player.currentTime / video_player.duration) * 100;
        if (video_player.currentTime == video_player.duration) {
            slider.value = 0;
            stopVideo();
        }
    }
    catch (err){
        timer.textContent = '00:00';
        duration.textContent = '00:00';
    }

}
function seeked() {
    video_player.currentTime = (slider.value / 100) * video_player.duration;
}
function volControl() {
    video_player.volume = volumeSlider.value / 100;
    lastVolValue = volumeSlider.value;
}
function playBack() {
    video_player.currentTime -= backForTime;
}
function playForward() {
    video_player.currentTime += backForTime;
}

//event listeners

