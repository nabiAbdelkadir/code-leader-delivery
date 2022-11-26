import Vue from "vue";
import Swal from "sweetalert2";

function common(title, text, icon) {
    Swal.fire({
        icon,
        title,
        text,
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
    })
}

function successOption(title) {
    Swal.fire({
        icon: 'success',
        title,
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
    })
}


function toast() {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: 'success',
        title: 'Signed in successfully'
    })
}

export const func = {
    successInsert: (title = 'Your work has been saved.') => {
        successOption(title)
    },
    successUpdate: (title = 'Your work has been saved.') => {
        successOption(title)
    },
    successDelete: (title = "L'élément a été supprimé avec succès.") => {
        successOption(title)
    },
    errorMessages(text) {
        common("error", text, 'error')
    },

    deleteItems() {
        return new Promise(function (resolve) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#F64E60',
                //cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    resolve('')
                }
            })
        });
    },

    confirm() {
        return new Promise(function (resolve) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                //confirmButtonColor: '#F64E60',
                //cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    resolve('')
                }
            })
        });
    },
}

Vue.prototype.$sweet = func

/*
           *
            Swal.fire({
                icon: 'success',
                position: 'top-end',
                title: 'Signed in successfully',
                text: 'Something went wrong!',
                showConfirmButton: false,
                toast: true,
                timerProgressBar: true,

            })
           * */

/*
* Swal.fire({
    icon: 'info',
    title: 'Oops...',
    text: 'Something went wrong!',
    showCloseButton: true,
    showCancelButton: true,
    confirmButtonText: 'delete items',
    confirmButtonColor: '#F00',
    toast: true

})
* */
