const ffmpeg = require('fluent-ffmpeg');
const { Exception } = require('../../modules');
const Exception = require('../models/Error')
const path = require('path')
const HttpStatuscode = require('../models/Enums').HttpStatus
const command = ffmpeg();
const video_transcode_dir = require('../../config/config').video_transcode_dir

class ffmpeg{
    constructor(){
        if (!video_transcode_dir)
            throw new Exception(HttpStatuscode.INTERNAL_SERVER_ERROR, "Server have some issues, please try again later!")
    }

    outputPath() {
        return video_transcode_dir;
    }

    transcodeVideo(path, resolution){
        const name = path.basename(path, path.extname(path))
        const OUTPUT = path.join(this.outputPath(), name, `output_${resolution.name}.mp4`)
        command = ffmpeg(path).size(`${resolution.width}x${resolution.height}`)
        .videoBitrate(resolution.bitrate)
        .output(OUTPUT)
        .on('end', () => {
           console.log(resolution.name)
        })
        .on('error', (err) => {
            console.error("Transcoding error:", err.message);
            throw new Exception(HttpStatuscode.INTERNAL_SERVER_ERROR, "Server have some issues, please try again later!")
        });
    }
}

module.exports = new ffmpeg();