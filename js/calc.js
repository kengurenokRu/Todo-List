export const calc = () => {

    const x = document.querySelector('#x');
    const y = document.querySelector('#y');
    const res = document.querySelector('.calc__result');
    const btn = document.querySelector('.calc__btn-wrapper');   

    btn.addEventListener('click', function (event) {
        if (event.target.innerHTML === '+') {
            res.value = Number(x.value) + Number(y.value);
        } else if (event.target.innerHTML === '-') {
            res.value = Number(x.value) - Number(y.value);
        } else if (event.target.innerHTML === 'х') {
            res.value = Number(x.value) * Number(y.value);
        } else if (event.target.innerHTML === '÷') {
            //res.value = (Number(x.value) / Number(y.value)).toFixed(2); //всегда 2 знака после запятой
            res.value = Math.round((Number(x.value) / Number(y.value)) *100)/100; //плавающее количество знаков. 0, 1 или 2 знака после запятой 
        }
    })
};