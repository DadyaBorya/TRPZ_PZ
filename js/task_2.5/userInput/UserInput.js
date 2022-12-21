import prompt from "prompt-async";

export async function getInput(text) {
    prompt.start()
    return await prompt.get(text)
}

export async function getInputRange(text, low, high) {
    prompt.start()
    let result = await prompt.get(text);
    if (result[text] >= low && result[text] <= high) {
        return result
    }

    console.log("Не правильний ввід!")
    return await getInputRange(text, low, high)
}
