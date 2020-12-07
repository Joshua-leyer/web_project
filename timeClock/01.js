

const mark_template = (number) => {
    let str = `
        <li id="${number}">${number} </li>
    `
    return str
}
const make_time = () => {
    // let time_mark = $('li')

    for (let i = 1; i < 13; i++) {
        let one_time = mark_template(i)
        $('.number').append(one_time)
        // console.log(one_time)
    }
}
const rotate = () => {
    for (let i = 1; i < 13; i++) {
        $('li').eq(i - 1).css("transform", `translate(-50%) rotate(${i * 30}deg)`)
        $('li').eq(i - 1).css("color", 'red')

        console.log($('li'))
    }
}


$(document).ready(function(){
    make_time()
    rotate()
})