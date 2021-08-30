

// GEt what we need -- (html class names)
const sliderContainer = document.querySelector('.slider-container');
const slider = document.querySelector('.slider');
const sliderImg = document.querySelectorAll('.slider-img');


// Colors for div' borders
let colors =['#094E85', '#077BA4', '#28BBDC', '#24D2ED', '#E8ECF7', '#09a0d5', '#06698c'];

for(i=0; i<colors.length; i++){
   sliderImg.forEach((img)=>{
      img.style.border = `1px solid ${colors[i++]}`
   })
}


// SLIDER

let pressed = false;
let startx;
let x;

sliderContainer.addEventListener('mousedown', (e)=>{
   pressed = true;
   startx = e.offsetX - slider.offsetLeft;
   sliderContainer.style.cursor = 'grabbing';
});
sliderContainer.addEventListener('mouseenter', ()=>{
   sliderContainer.style.cursor = 'grab';
});
sliderContainer.addEventListener('mouseup', ()=>{
   sliderContainer.style.cursor = 'grab';
});
window.addEventListener('mouseup', ()=>{
   pressed = false;
});
sliderContainer.addEventListener('mousemove', (e)=>{
   if(!pressed) return
   e.preventDefault();
   x = e.offsetX;

   slider.style.left = `${x-startx}px`;
   checkboundary();
});




// ----------------touch event --------------------!

//Same same but different -- offsetX don't work on touch screen --
//-- add to replace it by touches[0].clientX -----!


sliderContainer.addEventListener('touchstart', (e)=>{
   pressed = true;
   startx = e.touches[0].clientX - slider.offsetLeft;
});
window.addEventListener('touchend', ()=>{
   pressed = false;
});
sliderContainer.addEventListener('touchmove', (e)=>{
   if(!pressed) return
   e.preventDefault();
   x = e.touches[0].clientX;
   slider.style.left = `${x - startx}px`;
   checkboundary();
});




// ----Check when the slider arrived at his maximum on the left and right side---!
function checkboundary(){
   let outer = sliderContainer.getBoundingClientRect();
   let inner = slider.getBoundingClientRect();

   if(parseInt(slider.style.left) > 0){
      slider.style.left = '0px';


   }else if(inner.right < outer.right){
      slider.style.left = `-${inner.width - outer.width}px`;
   }
}