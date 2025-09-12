//LOOPING LOGO PARTNER
const track = document.getElementById("partner-track");
  let scrollAmount = 0;

  function scrollLogos() {
    scrollAmount -= 1; // ke kiri
    track.style.transform = `translateX(${scrollAmount}px)`;

    if (Math.abs(scrollAmount) >= track.scrollWidth / 2) {
      scrollAmount = 0;
    }
  }

  track.innerHTML += track.innerHTML;
  setInterval(scrollLogos, 20);

//Bantuan Terkini
  const scrollBox = document.getElementById('bantuanScroll');
  function scrollLeft() {
    scrollBox.scrollBy({ left: -300, behavior: 'smooth' });
  }
  function scrollRight() {
    scrollBox.scrollBy({ left: 300, behavior: 'smooth' });
  }

// Footer loader
fetch("footer.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("footer").innerHTML = data;
  });
