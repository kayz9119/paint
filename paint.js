var c = document.getElementById("canv"); // html'deki canvas elementim
c.width = document.body.clientWidth - 100; // body'min genişliğine eşitliyorum
c.height = document.body.clientHeight -100; // body'min yüksekliğine eşitliyorum
var ciz = false;
var tool = document.getElementById('tool');
var ctx = c.getContext("2d");
var sc = document.getElementById("strokecolor");
var ss = document.getElementById("strokesize");
ctx.fillStyle = 'black';
var usage;
usage = tool.value;
var text = document.getElementById('text');
var textsize = document.getElementById('textsize');

ctx.clearRect(0, 0, c.width, c.height);
ctx.fillRect(0, 0, c.width, c.height);
ctx.strokeStyle = sc.value; 
ctx.strokeWidth = ss.value; // edit: ctx.lineWidth ile çizgi kalınlığı veriyomuşuz :D

ctx.moveTo(0, 0); // imleci belirlediğimiz koordinata getirdik
c.addEventListener('mousedown', (e) => {
    ctx.moveTo(e.pageX -50, e.pageY -50);
    ctx.strokeStyle = sc.value; 
    ctx.lineWidth = ss.value;
    ctx.fillStyle = sc.value;
    if(usage == 'stroke'){
        ciz = true;
        console.log(usage)
    }else if(usage == 'yazi'){
        ctx.font = textsize.value + 'px Arial';
        ctx.fillText(text.value, e.pageX -50, e.pageY -50);
    }
    console.log(usage)
});

tool.addEventListener('change', (e) => {
    usage = tool.value;
});


c.addEventListener('mouseup', (e) => {
    ciz = false;
    ctx.moveTo(0, 0);
})


c.addEventListener('mousemove', (event) => {
    if(ciz){
        ctx.lineTo(event.pageX -50, event.pageY -50); // koordinattan itibaren x ve y eksenlerinde bir çizgi çektik
        ctx.moveTo(event.pageX -50, event.pageY -50); // imleci belirlediğimiz koordinata getirdik
        ctx.stroke(); // çizgimize kenarlık ekledik
    }
});


sc.addEventListener('change', (e) => {
    ctx.strokeStyle = e.explicitOriginalTarget.value;
    console.log(e.explicitOriginalTarget.value);
});


ss.addEventListener('change', (e) => {
    ctx.lineWidth = e.explicitOriginalTarget.valueAsNumber;
})
// çizebiliyorum fakat 0-0'dan başlıyor xd