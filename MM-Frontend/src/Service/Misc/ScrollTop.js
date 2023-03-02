class ScrollTop{

    // scrolls to the top of the window
    scrollUp(){

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });  
    }

    scrollToFAQ(){
        window.scrollTo(0, document.body.scrollHeight*.73);
        
    }

}

export default new ScrollTop(); 