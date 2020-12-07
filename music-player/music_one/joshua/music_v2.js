
var mucis_play = document.querySelector('#music-play')
//获取到播放按钮
var play_button = document.querySelector('#play')
//所有按钮的最外面的元素
var controlPanelObj = document.getElementById('control-panel')
//弹出部分
var infoBarObj = document.getElementById('info')

var bar_line = document.querySelector('.bar')

// var bbb = setInterval(function() {
//     console.log(bar_line)

//     console.log(now_time)

// }, 1000);
const changeBar = () => {
    let all_time = mucis_play.duration
    let now_time = mucis_play.currentTime
    let percent = (Number(now_time) / Number(all_time) *100 ).toFixed()
    console.log(String(percent) + '%')
    bar_line.style.width = String(percent) + '%';
}


var timer;



const bindEventPlay = function(mucis_play) {
	play_button.addEventListener('click', function() {
        Array.from(controlPanelObj.classList).find(function (element) {
                if (!controlPanelObj.classList.contains('active')) {
                    // timer = setInterval(changeBar, 1000)
                    timer = window.setInterval('changeBar()',1000)
                    mucis_play.play()
                } else {
                    window.clearInterval(timer)
                    mucis_play.pause()
                }
            return element !== "active" ? controlPanelObj.classList.add('active') : controlPanelObj.classList.remove('active');
        });

        Array.from(infoBarObj.classList).find(function (element) {
            return element !== "active" ? infoBarObj.classList.add('active') : infoBarObj.classList.remove('active');
        });
	})

}

const songs_list = [
    '周杰伦 - 我不配.wav',
    '周杰伦 - 听妈妈的话.mp3',
    '周杰伦 - 菊花台.mp3',
    '周杰伦 - Ending.mp3',
    '周杰伦 - 简单爱.mp3',
]






//先没放循环随机按钮 , 这里放个0
let rand_stu = 0
let loop_stu = 0

var index = 0
//负责，逻辑处理，根据当前循环、随机按钮状态，返回一个歌曲名字
const nextSong = () => {
    if (loop_stu == 0 && rand_stu == 0) {
        console.log("sequence")
        index = (index + 1) % songs_list.length
    } else if (loop_stu == 1) {
        console.log("is loop")
        console.log("您都设置了循环了，还一直点下一首干嘛？")
        return mucis_play.src

    } else if (rand_stu == 1) {
        index = randomChoice(songs_list)
        console.log(`随机得到歌曲is is ${songs_list[index]}`)
    }    
        
    return songs_list[index]
}

const upSong = () => {
    if (loop_stu == 0 && rand_stu == 0) {
        console.log("sequence")
        index = (index - 1)
        console.log(songs_list.length)
        if (index < 0) {
            index = songs_list.length - 1
        }
        console.log(`up song's index is ${index}`)
    } else if (loop_stu == 1) {
        console.log("is loop")
        console.log("您都设置了循环了，还一直点下一首干嘛？")
        return mucis_play.src

    } else if (rand_stu == 1) {
        index = randomChoice(songs_list)
        console.log(`随机得到歌曲is is ${songs_list[index]}`)
    }  
    return songs_list[index]
}

/**
 * 对song-info 信息分解的操作
 * 
 */

const findNameAuther = (info) => {
    let name = ''
    let auther = ''
    let flag = ' - '
    for (let i = 0; i < info.length; i++) {
        // console.log(info.slice(i, flag.length + i))
        if (info.slice(i, flag.length + i) === flag) {
            name = info.slice(0, i)
            auther = info.slice(i + flag.length, info.indexOf('.'))
        }
    }
    info = [name, auther]
    return info
}


//单纯的播放功能 ,所有的操作　　,最后想要的播放，都用这个函数
//所以我把修改歌曲信息的也放在这里了 ,
const changeInfo = () => {
    var info_auther = document.querySelector('.artist')
    var info_name   = document.querySelector('.name')
    //对url 操作拿到最后歌曲文件名的操作
    let url = decodeURIComponent(mucis_play.src)
    let start_index = url.lastIndexOf('/')
    let info = url.slice(start_index + 1,)

    info = findNameAuther(info)
    console.log(info)
    //写入操作
    info_auther.innerHTML = `${info[1]}`
    info_name.innerHTML = `${info[0]}`
}

const songPlay = () => {
    mucis_play.addEventListener('canplay', function () {
        changeInfo()
        mucis_play.play()
    })
}


const bindEventUp = function(mucis_play) {
    let up_song = document.querySelector('.prev')
    up_song.addEventListener('click', function() {
        let up_song_info = upSong()
        mucis_play.src = `../music-list/` + up_song_info
        // console.log('up song is :', up_song_info)
        if (controlPanelObj.classList.contains('active')) {
            songPlay()
        } else if (!controlPanelObj.classList.contains('active')) {
            controlPanelObj.classList.add('active')
            infoBarObj.classList.add('active')
        }
    })
}

const bindEventNext = function(mucis_play) {
    //获取到next 按钮
    let next_song = document.querySelector('.next')
    next_song.addEventListener('click', function() {
        let next_song_info = nextSong()
        mucis_play.src = `../music-list/` + next_song_info
        if (controlPanelObj.classList.contains('active')) {
            songPlay()
        } else if (!controlPanelObj.classList.contains('active')) {
            controlPanelObj.classList.add('active')
            infoBarObj.classList.add('active')
        }

    })
}


bindEventUp(mucis_play)
bindEventNext(mucis_play)
bindEventPlay(mucis_play)