import backgroundSoundFile from '../../res/sounds/background.mp3';
import shipHitSoundFile from '../../res/sounds/singleHit.wav';
import shipSunkSoundFile from '../../res/sounds/shipSunk.wav';
import defeatSoundFile from '../../res/sounds/defeat.mp3';
import victorySoundFile from '../../res/sounds/victory.mp3';
import missedSoundFile from '../../res/sounds/shotMissed.mp3';
import clickSoundFile from '../../res/sounds/cannonFire.mp3';
import autoAssignFile from '../../res/sounds/reloadSound.mp3';
import playButtonFile from '../../res/sounds/startBattle.mp3';
class AudioManager {
  constructor() {
    this.currentlyPlayingSound = new Audio(shipHitSoundFile);
    this.backgroundSound = new Audio(backgroundSoundFile);

    this.backgroundSound.autoplay = true;
    this.backgroundSound.loop = true;

    this.hitShipSound = new Audio(shipHitSoundFile);
    this.shipSunkSound = new Audio(shipSunkSoundFile);
    this.victorySound = new Audio(victorySoundFile);
    this.missedSound = new Audio(missedSoundFile);
    this.defeatSound = new Audio(defeatSoundFile);
    this.clickSound = new Audio(clickSoundFile);
    this.autoAssignSound = new Audio(autoAssignFile);
    this.playButtonSound = new Audio(playButtonFile);
  }
  playBackgroundEffect = () => {
    this.backgroundSound.currentTime = 0;
    this.backgroundSound.play();
  };
  playShipHitEffect = () => {
    this.hitShipSound.currentTime = 0;
    this.hitShipSound.play();
  };
  playShipSunkEffect = () => {
    this.shipSunkSound.currentTime = 0;
    this.shipSunkSound.play();
  };

  playVictoryEffect = () => {
    this.victorySound.currentTime = 0;
    this.victorySound.play();
  };
  playMissedEffect = () => {
    this.missedSound.currentTime = 0;
    this.missedSound.play();
  };
  playDefeatEffect = () => {
    this.defeatSound.currentTime = 0;
    this.defeatSound.play();
  };
  playClickEffect = () => {
    this.clickSound.currentTime = 0;
    this.clickSound.play();
  };
  playAutoAssignEffect = () => {
    this.autoAssignSound.currentTime = 0;
    this.autoAssignSound.play();
  };
  playStartButtonEffect = () => {
    this.playButtonSound.play();
  };
}

const audioManager = new AudioManager();

export { audioManager };
