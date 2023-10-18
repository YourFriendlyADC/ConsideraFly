window.onscroll = function(){
    if(document.documentElement.scrollTop > 100){
        document.querySelector('.go-top-contenedor').classList.add('show');
    }else{
        document.querySelector('.go-top-contenedor').classList.remove('show');
    }
}
document.querySelector('.go-top-contenedor')
    .addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
