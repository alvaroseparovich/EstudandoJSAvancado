class NegociacoesDoServer {
	
	negociacoesDaSemana(cb){

		let xhr = new XMLHttpRequest();
		xhr.open('GET', 'negociacoes/semana');

		xhr.onreadystatechange = () => {
			if(xhr.readyState == 4){
				if(xhr.status == 200){
					cb(null,
						JSON.parse(xhr.responseText)
						.map(obj=> new Negociacao(new Date(obj.data),obj.quantidade, obj.valor))
						);
				}else{
					console.log(xhr.responseText);
					cb("não foi possível receber as informações do servidor.",null);
				}

			}

		}

		xhr.send();

	}

}