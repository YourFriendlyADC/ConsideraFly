window.onscroll = function(){
    if(document.documentElement.scrollTop > 100){
        document.querySelector('.go-bottom-contenedor').classList.add('show');
    }else{
        document.querySelector('.go-bottom-contenedor').classList.remove('show');
    }
}
document.querySelector('.go-bottom-contenedor')
    .addEventListener('click', () => {
        window.scrollTo({
            bottom: 0,
            behavior: 'smooth'
        });
    });