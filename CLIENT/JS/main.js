document.addEventListener('DOMContentLoaded', () => {
    // Array of block selectors
    const blocks = ['.block1', '.block2', '.block3', '.block4'];

    // Function to add the slide-in class
    const addSlideIn = (element) => {
        element.classList.add('slide-in');
    };

    // Function to remove the slide-in class (for reversing the animation)
    const removeSlideIn = (element) => {
        element.classList.remove('slide-in');
    };

    // Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                addSlideIn(entry.target);
            } else {
                removeSlideIn(entry.target); // Reverse animation when out of view
            }
        });
    }, {
        root: null, // Use the viewport as the container
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    // Query all blocks and observe them
    blocks.forEach(selector => {
        const block = document.querySelector(selector);
        if (block) {
            observer.observe(block); // Observe the block if it exists
        }
    });

    // Check visibility on scroll
    const checkVisibilityOnScroll = () => {
        blocks.forEach(selector => {
            const block = document.querySelector(selector);
            if (block) {
                const rect = block.getBoundingClientRect();
                // Check if the element is visible in the viewport
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    addSlideIn(block);
                } else {
                    removeSlideIn(block); // Reverse the animation if not in view
                }
            }
        });
    };

    // Check visibility on scroll
    window.addEventListener('scroll', checkVisibilityOnScroll);
});

  
  


    
    



    
function customerDash(){
    window.open('customerDash.html', '_self')
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



    // Function to check if an element is in the viewport
// Function to observe the elements and trigger the slide-in class
// JavaScript code to observe when the elements come into the viewport

// Function to observe elements and add the slide-in class

  