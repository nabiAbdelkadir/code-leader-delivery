function requiredField(target) {
    const errors = [];
    if (!target.$dirty)
        return errors;
    !target.required && errors.push('This field is required');
    return errors;
}

function requiredField2(target) { // return
    console.log('model ' + JSON.stringify(target) + ' error ' + target.$error + " dirty " + target.$dirty)
    return (target.$error) ? 'This field is required' : ''
}

export {requiredField, requiredField2}
