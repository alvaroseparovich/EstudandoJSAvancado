class ProxyFactory{
	
	static create(objetoDoProxy, propriedadesVigiadasDoObjeto, acaoTomadaNasAtividades){

		//create retornara isso aqui \/ \/
		return new Proxy(new ListaNegociacoes(),{

			get(target, prop, reciver) {
				if( propriedadesVigiadasDoObjeto.includes(prop) && typeof(target[prop]) == typeof(Function) ) {

					return function(){
						console.log(`${prop} capturado!`);
						Reflect.apply(target[prop], target, arguments);
						return acaoTomadaNasAtividades(target);
					}
				}

				return Reflect.get(target, prop, reciver);
			}
		})
	}
}