class InputCleaner {
    static clean(input: String){
        return input.replace(/\s+/g, '').trim();
    }

}

export default InputCleaner;
