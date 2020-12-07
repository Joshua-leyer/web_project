// console.clear();

class musicPlayer {
	constructor() {
		this.play = this.play.bind(this);
		this.playBtn = document.getElementById('play');
		console.log(this.playBtn)
		this.playBtn.addEventListener('click', this.play);
		this.controlPanel = document.getElementById('control-panel');
		this.infoBar = document.getElementById('info');
	}
    
	play() {
		let controlPanelObj = this.controlPanel,
		infoBarObj = this.infoBar
		Array.from(controlPanelObj.classList).find(function(element){
					return element !== "active" ? controlPanelObj.classList.add('active') : 		controlPanelObj.classList.remove('active');
			});
		
		Array.from(infoBarObj.classList).find(function(element){
					return element !== "active" ? infoBarObj.classList.add('active') : 		infoBarObj.classList.remove('active');
			});
	}
}

// const newMusicplayer = new musicPlayer();


////////////////////////////////////////////////////


//网上查的
function tenDigit(time){
	return time<10? '0'+time : time;
	}

var index = 0
//负责，逻辑处理，根据当前循环、随机按钮状态，返回一个歌曲链接
const nextSong = function(mucis_play) {
	if (loop_stu == 0 && rand_stu == 0) {
		console.log("sequence")
		index = (index + 1) % songs_list.length
	} else if (loop_stu == 1) {
		console.log("is loop")
		// mucis_play.currentTime = 0
		// mucis_play.play()
		// console.log(`当前歌曲is ${mucis_play}`)
		// console.log(mucis_play.src)
		console.log("您都设置了循环了，还一直点下一首干嘛？")
		return mucis_play.src

	} else if (rand_stu == 1) {
		index = randomChoice(songs_list)
		console.log(`随机得到歌曲is is ${songs_list[index]}`)
	}    
		
	return songs_list[index]
}

const upSong = function() {
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




const bindEventPlay = function(mucis_play) {
	//获取到播放按钮
	let play_button = document.querySelector('#play')
	play_button.addEventListener('click', function() {
		mucis_play.play()
	})



	let controlPanelObj = this.controlPanel,
	infoBarObj = this.infoBar
	Array.from(controlPanelObj.classList).find(function(element){
				return element !== "active" ? controlPanelObj.classList.add('active') : 		controlPanelObj.classList.remove('active');
		});
	
	Array.from(infoBarObj.classList).find(function(element){
				return element !== "active" ? infoBarObj.classList.add('active') : 		infoBarObj.classList.remove('active');
		});
	


}

// const bindEventPause = function(mucis_play) {
// 	let pause_ct = document.querySelector('#pause-ct')
// 	pause_ct.addEventListener('click', function() {
// 		mucis_play.pause()
// 	})
// }


// const bindEventUp = function(mucis_play) {
// 	let up_song = document.querySelector('#change-up')
// 	up_song.addEventListener('click', function() {
// 		let up_song_src = upSong()
// 			mucis_play.src = up_song_src
// 			mucis_play.addEventListener('canplay', function() {
// 			mucis_play.play()
// 		})
// 	})
// }

// const bindEventNext = function(mucis_play) {
// 	let next_song = document.querySelector('#change-down')
// 	next_song.addEventListener('click', function() {
// 		let next_song_src = nextSong(mucis_play)
// 		mucis_play.src = next_song_src
// 		mucis_play.addEventListener('canplay', function() {
// 			mucis_play.play()
// 		})

// 	})
// }

//获取到音乐控件 
var mucis_play = document.querySelector('#music-play')

const bindEvents = function() {
        
	bindEventPlay(mucis_play)
	// bindEventPause(mucis_play)
	// bindEventListChangeSong(mucis_play)
	// bindEventEnded(mucis_play)
	// bindEventLoop(mucis_play)
	// bindEventRand(mucis_play)
	// bindEventUp(mucis_play)
	// bindEventNext(mucis_play)
}

// let time_status = setInterval(function() {

// 	var all_minutes = parseInt(mucis_play.duration / 60, 10)
// 	var all_seconds = parseInt(mucis_play.duration % 60, 10)
// 	var all_time = `${all_minutes}:${all_seconds}`

// 	var now_seconds = parseInt(mucis_play.currentTime % 60, 10)
// 	var now_minutes = parseInt(mucis_play.currentTime / 60, 10)
// 	var now_time = tenDigit(now_minutes) + ":" + tenDigit(now_seconds)

// 	time_span.innerHTML = `${now_time} / ${all_time}`    

// }, 500);

bindEvents()
