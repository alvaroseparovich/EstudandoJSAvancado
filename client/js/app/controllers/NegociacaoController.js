class NegociacaoController {

	constructor() {

		let $ = document.querySelector.bind(document);
		this._inputData = $("#data");
		this._inputQuantidade = $("#quantidade");
		this._inputValor = $("#valor");

		this._listaNegociacoes = new Bind(
			new ListaNegociacoes(),
			new NegociacoesView($('#negociacoesView')),
			'adiciona','limpaNegociacoes',
		);

		this._mensagem = new Bind(
			new Mensagem(),
			new MensagemView($(".mensagemView")),
			"texto",
		);

	}

	adiciona(event){
		event.preventDefault();

		let negociacao = new Negociacao(
			DateHelper.textoParaData(this._inputData.value),
			this._inputQuantidade.value,
			this._inputValor.value
		)

		this._listaNegociacoes.adiciona(this._criaNegociacao());
		this._mensagem.texto = "Negociacao Adicionada com sucesso!"

		this._limpaFormulario();
	}

	_criaNegociacao(){
		return new Negociacao(
			DateHelper.textoParaData(this._inputData.value),
			this._inputQuantidade.value,
			this._inputValor.value
		)
	}

	_limpaFormulario(){
		this._inputData.value = '';
		this._inputQuantidade.value = 1;
		this._inputValor.value = 0;
		this._inputData.focus();
	}

	limpaNegociacoes(){

		this._listaNegociacoes.limpaNegociacoes();

		this._mensagem.texto = "apagou as negociações!";
	}

	importarDeServer(){

		let xhr = new XMLHttpRequest();
		xhr.open('GET', 'negociacoes/semana');

		xhr.onreadystatechange = () => {
			if(xhr.readyState == 4){
				if(xhr.status == 200){
					JSON.parse(xhr.responseText)
						.map(obj=> new Negociacao(new Date(obj.data),obj.quantidade, obj.valor))
						.forEach(negociacaoH=> this._listaNegociacoes.adiciona(negociacaoH));
					this._mensagem.texto = "Negociações adicionadas com sucesso!";
				}else{
					console.log(xhr.responseText);
					this._mensagem.texto = "Deu zigzira";
				}
			}
		}
		xhr.send();

	}


}