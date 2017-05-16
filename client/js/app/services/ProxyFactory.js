class ProxyFactory{
	
	static create(objetoDoProxy, propriedadesVigiadasDoObjeto, acaoTomadaNasAtividades){

		//create retornara isso aqui \/ \/
		return new Proxy(objetoDoProxy,{

			get(target, prop, reciver) {

				if( propriedadesVigiadasDoObjeto.includes(prop) && ProxyFactory.eFuncao(target[prop]) ) {
					
					return function(){

						console.log(`${prop} capturado!`);
						Reflect.apply(target[prop], target, arguments);
						return acaoTomadaNasAtividades(target);
					}
				}

				return Reflect.get(target, prop, reciver);
			},

			set(target, prop, value, reciver) {

				if(propriedadesVigiadasDoObjeto.includes(prop)){

					acaoTomadaNasAtividades(target);	
				}
				
				return Reflect.set(target, prop, value, reciver);
			}
		})
	}

	static eFuncao(algo){
		typeof(algo) == typeof(Function) 
	}

}