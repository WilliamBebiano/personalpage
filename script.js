window.onload = function() {
    const text = document.getElementById("typing").innerText;
    document.getElementById("typing").innerText = "";
  
    let i = 0;
    function type() {
        if (i < text.length) {
            document.getElementById("typing").innerHTML += text.charAt(i);
            i++;
            setTimeout(type, 50);
        }
    }
    setTimeout(type, 2000);