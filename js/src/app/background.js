// need to curate better colors tho
let colors = ['#E51B26', '#FFF219', '#C0D537', '#B71A8C', '#19378F', '#5F6061'];

(function myLoop (i) {          
   setTimeout(function () {   
      $('#quotes').css('background-color', colors[i % colors.length])               
      myLoop(++i);      
   }, 45000)
})(0);