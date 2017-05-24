class NegociacoesDoServer {
	
	negociacoesDaSemana(){

		return new Promise((resposta, erro)=>{
			let xhr = new XMLHttpRequest();
			xhr.open('GET', 'negociacoes/semana');

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