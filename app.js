class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.clapAudio = document.querySelector(".clap-sound");
    this.currentKick = "./sounds/kick-808.wav";
    this.currentSnare = "./sounds/snare-808.wav";
    this.currentClap = "./sounds/clap-808.wav";
    this.currentHihat = "./sounds/hihat-808.wav";
    this.currentOpenhat = "./sounds/openhat-808.wav";
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.openhatAudio = document.querySelector(".openhat-sound");
    this.index = 0;
    this.bpm = 150;
    this.playButton = document.querySelector(".play");
    this.isPlaying = null;
    this.selects = document.querySelectorAll("select");
    this.muteButtons = document.querySelectorAll(".mute");
    this.tempoSlider = document.querySelector(".tempo-slider");
  }
  activePad() {
    this.classList.toggle("active");
  }
  repeat() {
    let step = this.index % 8;
    const activeBars = document.querySelectorAll(`.b${step}`);
    //Loop over the pads
    activeBars.forEach((bar) => {
      bar.style.animation = `playTrack 300ms alternate ease-in-out 2`;
      //Check if the pads are active
      if (bar.classList.contains("active")) {
        if (bar.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (bar.classList.contains("clap-pad")) {
          this.clapAudio.currentTime = 0;
          this.clapAudio.play();
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
        if (bar.classList.contains("openhat-pad")) {
          this.openhatAudio.currentTime = 0;
          this.openhatAudio.play();
        }
      }
    });
    this.index++;
  }
  start() {
    const interval = (60 / this.bpm) * 1000;
    //Check if it is playing
    if (!this.isPlaying) {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    }
    //Clear the interval
    else {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    }
  }
  //Updating the Play button text to Stop when the loop is active
  updateButton() {
    if (!this.isPlaying) {
      this.playButton.innerText = "Stop";
      this.playButton.classList.add("active");
    } else {
      this.playButton.innerText = "Play";
      this.playButton.classList.remove("active");
    }
  }

  changeSound(e) {
    const selectionName = e.target.name;
    const selectionValue = e.target.value;

    switch (selectionName) {
      case "kick-select":
        this.kickAudio.src = selectionValue;
        break;
      case "snare-select":
        this.snareAudio.src = selectionValue;
        break;
      case "clap-select":
        this.clapAudio.src = selectionValue;
        break;
      case "hihat-select":
        this.hihatAudio.src = selectionValue;
        break;
      case "openhat-select":
        this.openhatAudio.src = selectionValue;
        break;
    }
  }

  mute(e) {
    const muteIndex = e.target.getAttribute("data-track");

    e.target.classList.toggle("active");
    if (e.target.classList.contains("active")) {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 0;
          break;
        case "1":
          this.snareAudio.volume = 0;
          break;
        case "2":
          this.hihatAudio.volume = 0;
          break;
        case "3":
          this.clapAudio.volume = 0;
          break;
        case "4":
          this.openhatAudio.volume = 0;
          break;
      }
    } else {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 1;
          break;
        case "1":
          this.snareAudio.volume = 1;
          break;
        case "2":
          this.hihatAudio.volume = 1;
          break;
        case "3":
          this.clapAudio.volume = 1;
          break;
        case "4":
          this.openhatAudio.volume = 1;
          break;
      }
    }
  }
  changeTempo(e) {
    const tempoText = document.querySelector(".tempo-nr");

    this.bpm = e.target.value;
    tempoText.innerText = e.target.value;
  }
  updateTempo(e) {
    clearInterval(this.isPlaying);
    this.isPlaying = null;

    const playButton = document.querySelector(".play");
    if (playButton.classList.contains("active")) {
      this.start();
    }
  }
}

const drumKit = new DrumKit();

//Event Listeners

drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", drumKit.activePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

drumKit.playButton.addEventListener("click", () => {
  drumKit.updateButton();
  drumKit.start();
});

drumKit.selects.forEach((select) => {
  select.addEventListener("change", function (e) {
    drumKit.changeSound(e);
  });
});

drumKit.muteButtons.forEach((mute) => {
  mute.addEventListener("click", function (e) {
    drumKit.mute(e);
  });
});

drumKit.tempoSlider.addEventListener("input", function (e) {
  drumKit.changeTempo(e);
});
drumKit.tempoSlider.addEventListener("change", function (e) {
  drumKit.updateTempo(e);
});
