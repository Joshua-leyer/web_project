// var mucis_play = document.querySelector('#music-play')
// //获取到播放按钮
// var play_button = document.querySelector('#play')
// //所有按钮的最外面的元素
// var controlPanelObj = document.getElementById('control-panel')
// //弹出部分
// var infoBarObj = document.getElementById('info')

// var bar_line = document.querySelector('.bar')

var dot = document.querySelector('.dot')
var bar_line = document.querySelector('.bar')
//总长度
var progress = document.querySelector('.progress-bar')


//改变一下 时间


const changeCurrent = (nowp, allp) => {
    //得到一个 数值类型的进度数据
    //已知道歌曲总时间长度
    let music_all_time = mucis_play.duration
    //接受两个参数 , 一个是当前的位置 一个是总位置  。 是数字格式
    let music_now_time = (nowp / allp) * music_all_time

    mucis_play.currentTime = music_now_time
}               



const bindEventMove = () => {
    let deltaX = 0
    dot.addEventListener('mousedown', (event) => {
        // event = event || window.event

        //身体内长度 = 鼠标位置 - 元素左上角位置
        deltaX = event.clientX - dot.offsetLeft

        document.onmousemove = function (event) {//拿到全局x、y、
            // event = event || window.event;
            var x = event.clientX - deltaX
            if (x < 0) {
                x = 0
            } else if (x > progress.clientWidth - dot.offsetWidth) {
                x = progress.clientWidth - dot.offsetWidth
            }
            dot.style.left = `${x}px`

            // 当前位置 x
            let nowp = x
            // let dot_width = parseInt(dot.style.width)
            let dot_width = parseInt( window.getComputedStyle ? window.getComputedStyle(dot, null).width : dot.currentStyle.width)

            let allp = progress.clientWidth - dot_width
            changeCurrent(nowp, allp)
        }

        document.onmouseup = function(event) {
            document.onmousemove = null
        }
    })
}
bindEventMove()


mucis_play.ontimeupdate = () => {
    
    let music_all_time = mucis_play.duration
    let music_now_time = mucis_play.currentTime
    //这一步是为了减去dot元素本身的长度 , 如果css能解决,就不需要这里了
    let dot_width = parseInt( window.getComputedStyle ? window.getComputedStyle(dot, null).width : dot.currentStyle.width)
    let bar_len = progress.clientWidth - dot_width
    // 发现不在点击事件里面也能用这个获取某个元素的width 不知道有什么区别
    // console.log(progress.clientWidth)
    let po_x = (music_now_time / music_all_time) * bar_len
    dot.style.left = `${po_x}px`
}


const varEventClick = () => {
    progress.addEventListener('click', (event) => {
        console.log('点到线了')
        let self = event.target
        console.log(self)

        if (!self.classList.contains('dot')) {
            let click_posx = event.offsetX
            let bar_len = progress.clientWidth

            let music_now_time = (click_posx / bar_len) * mucis_play.duration
            mucis_play.currentTime = music_now_time
        } else {
            console.log('你可能点到dot上面了')
        }


    })
}

varEventClick()






