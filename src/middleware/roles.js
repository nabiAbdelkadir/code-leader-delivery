export default function auth({next, router, to}) {
    console.log('from middleware ' + to.name);

    /*
    * if (!localStorage.getItem('jwt')) {
        return router.push({name: 'test2'});
    }
    * */
    return next();
}
