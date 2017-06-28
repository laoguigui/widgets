/**
 * Created by Administrator on 2017/6/24 0024.
 */
    //题目要求的
var container = document.getElementById("container");
var piece = container.getElementsByClassName("piece");
for(var i=0;i<piece.length;i++){
    (function(){
        var p =piece[i];
        srcdiv = null;
        srcdivrow = null;
        srcdivline = null;
        p.addEventListener("dragstart",function(event){
            srcdiv = p;
            //  console.log(srcdiv);
            //获取得到要拖动的数据
          event.dataTransfer.setData("text",p.innerHTML);
            //拖动数据块所对应的行和列
            var srcrow1 = p.getAttribute("indexrow");
            var srcline1 = p.getAttribute("indexline");
            var srcdivr1 = $(".piece[indexrow="+srcrow1+"]");
            var srcdivl1 = $(".piece[indexline="+srcline1+"]");
            sr=[];
            sl = [];
            for(let i=0;i<srcdivr1.length;i++){
                sr.push(srcdivr1[i].innerHTML);
                sl.push(srcdivl1[i].innerHTML);
            }

         /*  event.dataTransfer.setData("indexrow",sr);
           event.dataTransfer.setData("indexline",sl);
            console.log(event.dataTransfer.setData("indexrow",sr))*/

        });
        //使元素可拖动
        p.addEventListener("dragover", function(event){
            event.preventDefault();
        });
        p.addEventListener("drop",function(event){
            event.preventDefault();
            srcrow = srcdiv.getAttribute("indexrow");
            srcline = srcdiv.getAttribute("indexline");
            tarrow = event.target.getAttribute("indexrow");
            tarline = event.target.getAttribute("indexline");
            srcdivrow = $(".piece[indexrow="+srcrow+"]");//取出源那一行
            srcdivline = $(".piece[indexline="+srcline+"]");
            tardivrow = $(".piece[indexrow="+tarrow+"]");//取出目标源的那一行
            tardivline = $(".piece[indexline="+tarline+"]");
            //如果是拖动到相邻的块就拖动整行或整列
            if(Math.abs(srcrow-tarrow)==0&&Math.abs(srcline-tarline)==1){
                for(let i=0;i<srcdivrow.length;i++){
                   srcdivline[i].innerHTML = tardivline[i].innerHTML;
                  tardivline[i].innerHTML = sl[i];
                }
            }else if(Math.abs(srcline-tarline)==0&&Math.abs(srcrow-tarrow)==1){
                for(let i=0;i<srcdivline.length;i++){
                    srcdivrow[i].innerHTML = tardivrow[i].innerHTML;
                    tardivrow[i].innerHTML = sr[i];
                }
            }else{
                if(srcdiv!=event.target){
                    srcdiv.innerHTML = event.target.innerHTML;
                    event.target.innerHTML = event.dataTransfer.getData("text");
                }
            }

        })
    })(i);
}
