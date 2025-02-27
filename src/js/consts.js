export async function getEnWord() {
	let dataWord = []
	await fetch('https://random-word-api.herokuapp.com/word?number=1')
		.then(res => (res.json()))
		.then(json => dataWord[0] = json[0])
		.catch((err) =>
			console.log(err)
		)
	if (dataWord[0] === 'undefined' || dataWord.length === 0) {
		const supArray = ['test', 'array']
		return [...supArray]
	} else {
		return [...dataWord]
	}
}


export let RU_WORDS = ['пока','не','нашёл','апи','позже','добавлю','русские','слова','сюда'];

export let KEYBOARD_LETTERS = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
export let RU_KEYBOARD_LETTERS = Array.from('АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ');