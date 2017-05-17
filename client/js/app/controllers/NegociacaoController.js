class NegociacaoController {

	constructor() {

		let $ = document.querySelector.bind(document);
		this._inputData = $("#data");
		this._inputQuantidade = $("#quantidade");
		this._inputValor = $("#valor");

		this._listaNegociacoes = ProxyFactory.create(
			new ListaNegociacoes(),
			["adiciona" , "limpaNegociacoes"],
			modelo => this._negociacoesView.update(modelo),
		);

		this._negociacoesView = new NegociacoesView($('#negociacoesView'));
		this._negociacoesView.update(this._listaNegociacoes);
		
		this._mensagem = ProxyFactory.create(
			new Mensagem(),
			["texto"],
			modelo => this._mensagemView.update(modelo),
		);
	 	this._mensagemView = new MensagemView($(".mensagemView"));

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
		//this._mensagemView.update(this._mensagem);

		this._limpaFormulario();
		//this._negociacoesView.update(this._listaNegociacoes);
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
		//this._negociacoesView.update(this._listaNegociacoes);

		this._mensagem.texto = "apagou as negociações!";
		//this._mensagemView.update(this._mensagem);
	}


}