console.log('Hello Client')


const onFormSubmit = (e) => {

    e.preventDefault();
    console.log('FORM', e.target)

}

let form = document.querySelector('#userForm');
form.addEventListener('submit', onFormSubmit)