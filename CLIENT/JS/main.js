document.addEventListener('DOMContentLoaded', () => {
   
    const blocks = ['.block1', '.block2', '.block3', '.block4'];

  
    const addSlideIn = (element) => {
        element.classList.add('slide-in');
    };

  
    const removeSlideIn = (element) => {
        element.classList.remove('slide-in');
    };

  
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                addSlideIn(entry.target);
            } else {
                removeSlideIn(entry.target); 
            }
        });
    }, {
        root: null, 
        threshold: 0.1 
    });


    blocks.forEach(selector => {
        const block = document.querySelector(selector);
        if (block) {
            observer.observe(block); 
        }
    });

    const checkVisibilityOnScroll = () => {
        blocks.forEach(selector => {
            const block = document.querySelector(selector);
            if (block) {
                const rect = block.getBoundingClientRect();
                
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    addSlideIn(block);
                } else {
                    removeSlideIn(block); 
                }
            }
        });
    };

    
    window.addEventListener('scroll', checkVisibilityOnScroll);
});

  
  




    
function customerDash(){
    window.location.href = `customerDash.html?email_address=${email_address}&first_name=${first_name}`
}

    function menuHTML(){
        window.open('menu.html', '_blank')
    }

    function contactHTML(){
        window.open("contact.html", '_self')
    }

    function homeHTML(){
        window.open('index.html', '_self')
    }

    function reservationHTML(){
        window.open('reservation.html', '_self')
    }

    function calendarHTML(){
        window.open('calendar.html', '_blank')
    }

    function adminLoginHTML(){
        window.open('adminLogin.html', '_self')
    }

    function signInHTML(){
        window.open('signIn.html', '_self')
    }
    
    function createAccountHTML(){
        window.open('createAccount.html', '_self')
    }


    function hideMenu()
    {
        document.getElementById('menu').style.display = 'none';
        // document.getElementById('container-aboutUs').style.display= 'none';
        // document.getElementById('aboutUs').style.display = 'none';
        // document.getElementById('cateringOptions').style.display = 'none';
        // document.getElementById('catering').style.display= 'none';

    }

    function displayMenu()
    {
        document.getElementById('menu').style.display = 'flex';
        document.getElementById('aboutUs').style.display = 'flex';
        document.getElementById('cateringOptions').style.display = 'flex';
        document.getElementById('container-aboutUs').style.display= 'flex';
        document.getElementById('catering').style.display= 'flex';

    }




  