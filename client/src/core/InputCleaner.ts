class InputCleaner {
    static clean(input: string) {
        // Solo eliminar espacios innecesarios antes y después del string
        return input.trim();
    }
}

export default InputCleaner;
