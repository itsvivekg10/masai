interface MediaFile {
  play(): void;
}

class AudioFile implements MediaFile {
  play(): void {
    console.log("Playing audio file...");
  }
}

class VideoFile implements MediaFile {
  play(): void {
    console.log("Playing video file...");
  }
}

class PDFFile implements MediaFile {
  play(): void {
    console.log("Displaying PDF document...");
  }
}

class MediaPlayer {
  private media: MediaFile;

  constructor(media: MediaFile) {
    this.media = media;
  }

  playMedia(): void {
    this.media.play();
  }

  // Optional: Switch media type at runtime
  setMedia(media: MediaFile): void {
    this.media = media;
  }
}

// Step 4: Test
const audio = new AudioFile();
const video = new VideoFile();
const pdf = new PDFFile();

const player = new MediaPlayer(audio);
player.playMedia();

player.setMedia(video);
player.playMedia();

player.setMedia(pdf);
player.playMedia();
