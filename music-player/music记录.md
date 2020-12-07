music_v5.html /.js 是最后版本 

# 功能: 进度条, 能拖拽,点击变换进度,








日猴 ,　忘了写了。 
play_v1.js 完成一大半了。
#  > 实现: 切换歌曲 , 并修改歌曲标题（info） 信息。 
    有个bug 就是第一首歌 直接播放，不显示info 信息。不懂。为啥。已经整合到一起了

# music_v2.js 
    > 实现功能 :     进度条


有别的事 , 不写了。这种代码越写越乱，感觉粘合度不够高。 不是自己写的都看不懂。

# > bug  blog:   
    > 定时 , 切换歌曲后，进度条不能迅速归零 ,　定时器功能写的不够好 , 硬写。
    > 代码粘合度不够高。  

# music_v3.js  最后  解决一个拖拽功能  # 一个bug : 第一首歌,没有信息

    >第二个bug 解决：

    code line 33:
    ```
        if (!controlPanelObj.classList.contains('active')) {
        // timer = setInterval(changeBar, 1000)
        timer = window.setInterval('changeBar()',1000)
        //很明显感觉代码重复了，但是就是不知道怎么 放一起。放一起到Play()函数里面就会有播放后在播放,没有声音的bug
        var info_auther = document.querySelector('.artist')
        var info_name   = document.querySelector('.name')
        let info = getInfo()
        info_auther.innerHTML = `${info[1]}`
        info_name.innerHTML = `${info[0]}`
        mucis_play.play()
    ```
    >解决 拖拽问题  拖拽是需要拖拽某个元素的, 所以我的利用width 来表示进度条的办法不太行
        添加一个元素当dot 拖拽用吧 把它弄成透明的，不然脑壳疼,而且只能拖拽那个dot．
        点击进度条直接跳转就有点不好用了。看看能不能都能实现的方法。
        google 别人的code看看

        知道一个progress 标签 , 不过想看看能不能自己给实现出来
        
    <progress value="22" max="100"></progress>


    ######
    点击时候事件发生的位置(鼠标点击的位置)在整个屏幕的位置
    event.clientX 
    event.clientY
    // self = event.target   self 就是事件发生的地方在那个元素身上
        offsetLeft 元素左上角来算 , 相对于父元素(可能 , 具体看如何设定的)的位置 具体看MDN 官网的描述
    self.offsetLeft
    self.offsetTop


    可给我麻烦死了 , 现在还没搞明白咋回事。 晚饭都过了
    最核心的两行code
                deltaX = event.clientX - dot.offsetLeft

                let x = event.clientX - deltaX

    搞不明白。
    硬理解，，也能理解，但是写的时候我肯定不会这样写。
    //身体内长度 = 鼠标位置 - 元素左上角位置

    发现个问题 , js 拖拽会脱离物体出现bug

# progress_v3.html 试一试解决拖拽 出去以后 脱离的 bug
    解决了找了一张图 , 核心就是监控的对象变一下。这些人挺厉害。
    code 贴出来

```

    dot.addEventListener('mousedown', (event) => {
        // event = event || window.event

        //身体内长度 = 鼠标位置 - 元素左上角位置
        deltaX = event.clientX - dot.offsetLeft
        
        document.onmousemove = function (event) {//拿到全局x、y、
            // event = event || window.event;
            console.log(11)
            let x = event.clientX - deltaX
            if (x < 0) {
                x = 0
            } else if (x > progress.clientWidth - dot.offsetWidth) {
                x = progress.clientWidth - dot.offsetWidth
            }
            console.log(x)
            dot.style.left = `${x}px`;
        }

        document.onmouseup = function(event) {
            document.onmousemove = null
        }
        // box.onmouseup = (event) => {
        //     document.onmousemove = document.onmouseup = null
        // }

    })

 ```

    参考文章 ：
    (01)[https://blog.csdn.net/weixin_48291770/article/details/108973572]
    ()[https://blog.csdn.net/weixin_43348064/article/details/106087553]

    > 添加一个功能 , 修改进度条的时候 , 
    核心修改出效果的代码是
        dot.style.left = `${x}px`;
    可以看出来是 是一个数值，不是百分比。
    所以， 计算当前dot  在line  位置的百分比。返回给 一个函数 然后让这个函数计算
    应该的事件 写入到 进去
    不过我的music 没有时间显示 , 所以修改播放的位置就可以了
    
    ? bug >  MD 又发现一个问题 
    ```
    
    dot.style.left = `${x}px`
    console.log(dot.style)
    // line 的长度
    // 当前位置 x
    // 需要一个百分比
    let nowp = x
    let allp = progress.clientWidth - dot.getAttribute('width')
    // console.log(x)
    console.log(progress.clientWidth, dot.getAttribute('width'))
    ```
    拿不到width 属性值 , 我怀疑是根自己设置了style.left有关 ,　跟内联外联样式的有关系

    我把left 设置的注释掉发现还不行

    //找了一个方法能拿到
    window.getComputedStyle(dot,null).width

    最终解决办法锁定关键词 : Js获取/设置行内样式和非行内样式

    完事~~~~~!

    
# music_v4.js     在v3.js版本 ， 上一首 , 下一首按钮上面还有bug处理一下
    进度条 有问题。不会搞了定时器不会弄了 搞定了


```
const changePlay = () => {
    changeInfo()
    controlPanelObj.classList.add('active')
    infoBarObj.classList.add('active')
    //清除定时器
    clearInterval(timer)
    timer = window.setInterval('changeBar()',1000)
    bar_line.style.width = 0 + '%';
    mucis_play.addEventListener('canplay', function () {
        //播放前都要重新设定一个定时器
        mucis_play.play()
    })
}

```

# music_v5.js  添加拖拽进度条功能 、 添加点击进度条功能
    代码太多了 , 滚轮累 , 在music_v5_bar.js 文件写这个功能
    progress_v3.html code 直接拿过来就能用 , 
    
    MD 我就不懂了 , 这个B  获取CSS属性怎么这个恶心。
    又是拿不到属性值
    大概关键坑 就是 内联外联 ,以及文件外部引用的情况,获取css 样式的属性值

```
    return window.getComputedStyle ? window.getComputedStyle(obj,null).paddingLeft : obj.currentStyle.paddingLeft;
```

    这个东西能拿到但是MD 的 是带 px的。就这把 , 自己处理
    感觉这个样不好 , dot 元素的位置是我拖拽的 , 歌曲重新播放怎么办？应该写成 , 让dot跟踪播放的进度
    这样才正确

    dot 还需要跟踪bar 的长度一起运行
    目前自己想写一个监听函数 , 估计要自己手写一个自定义事件函数了。
    发现ontimeupdate  , 有个自带的函数



    ```

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
    ```

    # 点击进度条功能 , 现在progress_V3.html练习
    有个bug 鼠标拖拽超出了bar line外面,time数据还是会变 ,这个跟我处理时间有关系，实际上因该是监听当前的播放位置,然后改变,但是就会有跟不上的情况,时间有延迟。所以还是原来的方式, 鼠标移动的时候就改变time

```
        //处理time现实方面
    if (music_now_time > music_all_time) {
        music_now_time = music_all_time
    } else if (music_now_time < 0) {
        music_now_time = 0
    }
```


回到music_v5_bar.js 
添加一个监听点击事件, 这次利用ontimeupdate 事件 ,这个事件一般配合currentTime 使用
点击之后换算一下百分比 计算播放的时间位置,直接currentTime

    varEventClick 函数中    
    ?bug >         
        //点击事件相对于 元素的距离
        //如果点击到dot上面会有Bug ,, 点击dot会导致拿到的数据是0 ,本来需要计算点击的位置 在 总进度条的位置关系就行了，但是
        //我搜了半天不知道怎么搞
        //所以,

    > 加一个end函数
    

