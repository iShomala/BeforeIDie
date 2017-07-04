// need to curate better colors tho
let colors = ['#F42C04', '#0CCE6B', '#182825', '#016FB9', '#770058', '#D0021B'];

(function myLoop (i) {          
   setTimeout(function () {   
      console.log(i);
      $('#quotes').css('background-color', colors[i % colors.length])               
      myLoop(++i);      
   }, 20000)
})(0);