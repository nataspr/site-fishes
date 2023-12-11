// document.addEventListener('click', function handleClick(event) {
//     event.target.classList.add('scaled');
// });
// добавить классы из css для переворота
function addTransformedClass(event) {
    let svgpic = document.getElementById('letter');
    let shark = document.getElementById('shark');
    let myText = document.getElementById('text');
    if (event.shiftKey) {
        svgpic.classList.remove('transformed');
        startSharkAnimations();
        shark.style.display = 'inline';
        myText.style.display = 'inline';
        svgpic.classList.add('filtered');
    } else {
        svgpic.classList.add('transformed');
        shark.style.display = 'none';
        myText.style.display = 'none';
        svgpic.classList.remove('filtered');
    }
   
}
// убрать классы для refresh
function addMouseOverClass(){
    let svgpic = document.getElementById('letter');
    let shark = document.getElementById('shark');
    let myText = document.getElementById('text');
    shark.style.display = 'none';
    myText.style.display = 'none';
    svgpic.classList.remove('filtered');
}
// анимация увеличения
function startTransformAnimation() {
    document.getElementById('transformAnimationId').beginElement();
}
// начало движения рыбы
function startSharkAnimations() {
    document.getElementById('sharkMove1').beginElement();
    document.getElementById('sharkMove2').beginElement();
}