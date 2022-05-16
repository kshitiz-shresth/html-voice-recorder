let recordButton = document.querySelector('.record');
let stopButton = document.querySelector('.stop');
let url = document.querySelector('.url');
let device;
let recorder;
let file;
let fileUrl;
recordButton.addEventListener('click',(e)=>{
    let chunk = [];
    device = navigator.mediaDevices.getUserMedia({audio:true});
    device.then(stream=>{
        recorder = new MediaRecorder(stream)
        recorder.ondataavailable = e => {
           chunk.push(e.data);
           if(recorder.state == 'inactive')
            {
                console.log('stop')
                file = new Blob(chunk,{type:'audio/webm'})
                fileUrl = URL.createObjectURL(file)
                url.innerHTML = fileUrl;
            }
        }
        recorder.start(1000);
    })
});

stopButton.addEventListener('click',e=>{
    recorder.stop()
    console.log(file);
    console.log(fileUrl);
})

