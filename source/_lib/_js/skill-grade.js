(function() {
  var percent = document.querySelectorAll(".skills__percent"),
      canvases = document.querySelectorAll(".skills__canvas");

  for (var i = 0; i < percent.length; i++) {
    var percent_i = percent[i],
        canvas = canvases[i];
    percent_i = parseInt(percent_i.innerHTML)/100;
    ctx = canvas.getContext("2d");

    ctx.strokeStyle = "#eee";
    ctx.arc(canvas.width/2, canvas.height/2, canvas.width/2*0.9, 0, 2*Math.PI);
    ctx.lineWidth = 11;
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = "#0cf";
    ctx.arc(canvas.width/2, canvas.height/2, canvas.width/2*0.9, 0, 2*Math.PI*percent_i);
    ctx.lineWidth = 11;
    ctx.stroke();
  }
})();
