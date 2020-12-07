塔姆阿的 ,　 codepen 网站上找模板，自己换皮肤。费劲死了，我还是决定自己照着他们的搓一个算了。

同样 --- 问题记录。

> 最后选了个小的，不要 随机，和顺序播放按钮功能了。

self_v1.html 是自己最开始实践所有功能时候的代码。自己写的时候能感觉到粘合度不够。

self_v2.html 添加上一个h3歌曲标题
    ? > q_q  ? :
        music_play.src 获取链接的编码格式不是汉字。
        最后知道有个decodeURIComponent ()
        函数可以转换。
        所以，写个监听函数。字符串操作一波，然后放进去就好了不过一个这东西写个监听函数不太好。为了方便就这吧。 不想动原来的代码了。越该越头疼。总觉得这种一种操作不太好。
        动作重复有些多。
    > 链接 样子的巨长 。 
        lastIndexOf  拿到最后一个/ 后面的内容
    over!

    > 我发现这个东西可以通用 , 扔到这里了。

    ```
    const changeInfo = () => {
        let url = decodeURIComponent(mucis_play.src)
        let start_index = url.lastIndexOf('/')
        let info = url.slice(start_index + 1,)
        console.log(info)
        `被修改的对象`.innerHTML = info
    }
    
    ```