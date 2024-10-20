const recentprojects = document.querySelector('.recentprojects')
const downbox = document.querySelector('.down')
const downbox2 = document.querySelector('.down2')

let boxes = Array.from(document.querySelectorAll('.box'))
window.addEventListener('scroll',()=>{
    boxes.forEach(e =>{
        const slidebox = e.querySelector('.slidebox')
        const mainbox = e.querySelector('.mainbox')
        if( e.getBoundingClientRect().y - window.innerHeight < -  e.getBoundingClientRect().height/2){
            slidebox.style.left = '100%';
            mainbox.style.top = '25%';
            mainbox.style.opacity = '1';
        }
    })
    if (downbox.getBoundingClientRect().y - window.innerHeight < - 300){
        downbox.style.top = 0;
    }
    if (downbox2.getBoundingClientRect().y - window.innerHeight < - 300){
        downbox2.style.top = 0;
    }
})
boxes.forEach(e =>{
    const detailsbox = e.querySelector('.detailsbox')
    const mainbox = e.querySelector('.mainbox')
    const details = e.querySelector('.details')
    e.addEventListener('mouseenter',()=>{
        detailsbox.style.left = '0%';
        if(window.innerWidth>1000){
            mainbox.classList.add('scale');
            details.style.top = '35%';
        }
        else{
            details.style.top = '28%';
        }
        details.style.opacity = '1';
    })
    e.addEventListener('mouseleave',()=>{
    detailsbox.style.left = '-100%';
    if(window.innerWidth>1000){
        mainbox.classList.remove('scale');
    }
    details.style.top = '100%';
    details.style.opacity = '0';
})
})

const home = document.querySelector('.mainn')
home.addEventListener('mousemove',e => {
    home.querySelectorAll('.layer').forEach(layer => {
        const speed = layer.getAttribute('data-speed')
        const x = (window.innerWidth - e.pageX*speed)/100   
        const y = (window.innerHeight - e.pageY*speed)/100
        layer.style.transform = `translateX(${x}px) translateY(${y}px) `
    } )
})
const aboutMe = document.querySelector('.about-me')
const aboutYou = document.querySelector('.about-you')
aboutMe.style.display = 'none';
aboutYou.style.display = 'none';
const buttonn = document.getElementById('buttonn')
const select = Array.from(document.querySelectorAll('.aboutbuttons'))
const aboutcontact = document.querySelector('.about-contact')
select.forEach( e => {
    e.addEventListener('click',() => {
    if(screen.width>=1100){
        aboutMe.classList.remove('meme')
        aboutYou.classList.remove('youyou')
        aboutMe.classList.remove('goR')
        aboutYou.classList.remove('goR')
        aboutMe.classList.remove('goL')
        aboutYou.classList.remove('goL')
        aboutMe.classList.add('me')
        aboutYou.classList.add('you')
        aboutMe.style.display = 'block';
        aboutYou.style.display = 'block';
        aboutcontact.style.boxShadow = '0 20px 80px 0 rgb(0 0 0 / 55%)';
    }
    else{
        aboutMe.classList.remove('meme')
        aboutYou.classList.remove('youyou')
        aboutMe.classList.remove('me')
        aboutYou.classList.remove('you')
        aboutMe.classList.remove('goR')
        aboutYou.classList.remove('goR')
        aboutMe.classList.add('goL')
        aboutYou.classList.add('goL')
        aboutMe.style.display = 'block';
        aboutYou.style.display = 'block';
    }
})
}) 
buttonn.addEventListener('click',() =>{
    if(screen.width>=1100){
        aboutMe.classList.remove('me')
        aboutYou.classList.remove('you')
        aboutMe.classList.remove('goR')
        aboutYou.classList.remove('goR')
        aboutMe.classList.remove('goL')
        aboutYou.classList.remove('goL')
        aboutMe.classList.add('meme')
        aboutYou.classList.add('youyou')
        aboutcontact.style.boxShadow = 'none';
        aboutMe.addEventListener('animationend',()=>{
            if( aboutMe.classList.value != 'about-me me' && aboutMe.classList.value != 'about-me goL'){
            aboutMe.style.display = 'none';
            }
        })
        aboutYou.addEventListener('animationend',()=>{
            if( aboutYou.classList.value != 'about-you you' && aboutYou.classList.value != 'about-you goL'){
            aboutYou.style.display = 'none';
            }
        })
    }
    else{
        aboutMe.classList.remove('meme')
        aboutYou.classList.remove('youyou')
        aboutMe.classList.remove('me')
        aboutYou.classList.remove('you')
        aboutMe.classList.remove('goL')
        aboutYou.classList.remove('goL')
        aboutMe.classList.add('goR')
        aboutYou.classList.add('goR')
        aboutMe.addEventListener('animationend',()=>{
            if( aboutMe.classList.value != 'about-me goL' && aboutMe.classList.value != 'about-me me' ){
                aboutMe.style.display = 'none';
            }
        })
        aboutYou.addEventListener('animationend',()=>{
            if( aboutYou.classList.value != 'about-you goL' && aboutYou.classList.value != 'about-you you'){
                aboutYou.style.display = 'none';
            }
        })
    }
})

const bars = document.getElementById('bars')
const butoni = document.getElementById('butoni')
const links = document.getElementById('Links')
bars.addEventListener('click',()=>{
    links.style.left = '0vw';
})
butoni.addEventListener('click',()=>{
    links.style.left = '-100vw';
})
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Show loading message
    const submitBtn = document.getElementById('submitBtn');
    const loadingIcon = document.getElementById('loadingIcon');

    // Disable button and show loading icon
    submitBtn.disabled = true;
    loadingIcon.style.display = 'block';

    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      message: document.getElementById('message').value,
      _captcha: false,
    };

    // Make the POST request
    fetch('https://formsubmit.co/alexbalaskasgr@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => {
        submitBtn.disabled = false; // Enable button
      loadingIcon.style.display = 'none'; // Hide loading icon
      if (response.ok) {
        submitBtn.disabled = false; // Enable button
      loadingIcon.style.display = 'none'; // Hide loading icon
        buttonn.click();
        alert('Message sent successfully!')
      } else {
        alert('Message not sent')
      }
    })
    .catch(error => {
        submitBtn.disabled = false; // Enable button
      loadingIcon.style.display = 'none'; // Hide loading icon
        alert('Error: ',error)
      console.error('Error:', error);
    });
  });
