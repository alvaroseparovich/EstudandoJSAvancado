class NegociacoesDoServer {
	
	constructor(){

		this._http = new HttpService;

	}

	negociacoesDaSemana(){

		return new Promise((resposta, error)=>{
			
			this._http
			.get('negociacoes/semana')
			.then(negociacoes => {
				resposta(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
			})
			.catch(erro => {
				console.log(erro);
				error('Não foi possível continuar a importação')
			})	
		})

	}

	negociacoesDaSemanaPassada(){

		return new Promise((resposta, erro)=>{
			let xhr = new XMLHttpRequest();
			xhr.open('GET', 'negociacoes/anterior');

			xhr.onreadystatechange = () => {
				if(xhr.readyState == 4){
					if(xhr.status == 200){
						resposta(JSON
							.parse(xhr.responseText)
							.map(obj=> new Negociacao(new Date(obj.data),obj.quantidade, obj.valor))
						);
					}else{
						console.log(xhr.responseText);
						erro("Não foi possível receber as informações do servidor.");
					}

				}

			}

			xhr.send();
			

			}
		)

	}

	negociacoesDaSemanaRetrasada(){

		return new Promise((resposta, erro)=>{
			let xhr = new XMLHttpRequest();
			xhr.open('GET', 'negociacoes/retrasada');

			xhr.onreadystatechange = () => {
				if(xhr.readyState == 4){
					if(xhr.status == 200){
						resposta(JSON
							.parse(xhr.responseText)
							.map(obj=> new Negociacao(new Date(obj.data),obj.quantidade, obj.valor))
						);
					}else{
						console.log(xhr.responseText);
						erro("Não foi possível receber as informações do servidor.");
					}

				}

			}

			xhr.send();
			

			}
		)

	}

}