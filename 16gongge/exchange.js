/**
 * Created by Administrator on 2017/6/22 0022.
 */
    //只是交换
var container = document.getElementById("container");

var piece = container.getElementsByClassName("piece");
console.log(piece)
for(var i=0;i<piece.length;i++){
    (function(){
        var p =piece[i];
         srcdiv = null;
        p.addEventListener("dragstart",function(event){
            srcdiv = p;
          //  console.log(srcdiv);
            event.dataTransfer.setData("text",p.innerHTML);
            //console.log(event.dataTransfer.getData("text"));
        });
        //使元素可拖动
        p.addEventListener("dragover", function(event){
            event.preventDefault();
        });
        srcrow = null;
        p.addEventListener("drop",function(event){
            event.preventDefault();
            console.log(srcdiv)

            srcrow = srcdiv.getAttribute("indexrow");
            srcdivrow = $(".piece[indexrow="+srcrow+"]");
            console.log(srcdivrow);
            if(srcdiv!=event.target){
                srcdiv.innerHTML = event.target.innerHTML;
                event.target.innerHTML = event.dataTransfer.getData("text");
            }
        })

    })(i);
}
/*function drop(ev){
    ev.preventDefault();
    if(srcdiv!=tagdiv){
        srcdiv.innerHTML = tagdiv.innerHTML;
        ev.target.innerHTML = ev.dataTransfer.getData("text");
    }*/
    // srcdiv.innerHTML = event.target.innerHTML;
    // p.innerHTML = event.dataTransfer.getData("text");

