class DateHelper {

	constructor(){
		throw new Error("esta classe só tem methodos estaticos, esta classe não pode ter instancia! bocó");
	}
	static textoParaData(texto){
		//aaaa-mm-dd
		if (!/\d{4}-\d{2}-\d{2}/.test(texto)) 
			throw new Error('o formato necessita ser YYYY-MM-DD')

		return new Date(... texto.split("-").map((item,indice)=> item - indice % 2));

	}

	static dataParaTexto(data){

		return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`

	}
}