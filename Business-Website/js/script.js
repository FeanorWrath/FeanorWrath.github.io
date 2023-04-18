/* Scroll animation start*/
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if(entry.isIntersecting){
            entry.target.classList.add('show');
        }else{
            entry.target.classList.remove('show');
        }
    });
});
const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));
/* Scroll animation end*/

/* Point animation start */
const fadeInElements = document.querySelectorAll('.fade-in'); // fade-in sınıfına sahip tüm elementleri seçer

function checkFadeIn() {
  fadeInElements.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top; // elementin sayfanın üstünden uzaklığını alır
    const windowHeight = window.innerHeight; // pencere yüksekliğini alır

    if (elementTop < windowHeight) { 
      el.classList.add('wheelsturn'); 
    } else {
      el.classList.remove('wheelsturn'); 
    }
  });
}

window.addEventListener('scroll', checkFadeIn); 

/* Point animation end */