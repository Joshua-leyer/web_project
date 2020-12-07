

const markTemplate = (number) => {
    let str = `
        <li id="${number}" class="select">
        <span> ${number} </span>
        </li>
    `
    return str
}
const makeTime = () => {
    // let time_mark = $('li')

    for (let i = 1; i < 13; i++) {
        let one_time = markTemplate(i)
        $('.number').append(one_time)
        // console.log(one_time)
    }
}
const rotate = () => {
    for (let i = 1; i < 13; i++) {
        $('li').eq(i - 1).css("transform", `translate(-50%) rotate(${i * 30}deg)`)
        // $('li').eq(i - 1).css("color", 'red')
        if (i > 3 && i < 9) {
            $('span').eq(i - 1).css("transform", `translate(-50%) rotate(${180}deg)`)
        }

    }
}

const changeNumber = () => {
    // let span12 = `
    //     <span class="num num-12"></span>
    // `
    // let span3 = `
    //     <span class="num num-3"></span>
    // `
    // let span6 = `
    //     <span class="num num-6"></span>
    // `
    // let span9 = `
    // <span class="num num-9"></span>
    // `
    // $('span').eq(2).replaceWith(span3)
    // $('span').eq(5).replaceWith(span6)
    // $('span').eq(8).replaceWith(span9)
    // $('span').eq(11).replaceWith(span12)
    for (let i = 3; i < 13; i += 3) {
        $('span').eq(i - 1).replaceWith(`<span class="num num-${i}"></span>`)
    }
    
}




setInterval(function() {
    let time = new Date()
    let sec = time.getSeconds()
    let min = time.getMinutes()
    //得到的时间范围对12 趋于,规定数值范围。
    let hour = (time.getHours() ) % 12

    //这种比例转换其实是有bug的,当 转换的两边的数字范围差距太大这个百分比就会出错

    $('.sec').css("transform", `translate(-50%, -50%) rotate(${(sec / 60) * 360}deg`)
    let min_deg =  (min / 60) * 360
    $('.min').css("transform", `translate(-50%) rotate(${min_deg}deg)`)
    let hour_deg = ((hour / 12) * 360) + (min_deg / 360) * 30
    $('.hour').css("transform", `translate(-50%) rotate(${hour_deg}deg)`)


}, 1000)


$(document).ready(function(){
    makeTime()
    rotate()
    changeNumber()
    // updateTime()
})