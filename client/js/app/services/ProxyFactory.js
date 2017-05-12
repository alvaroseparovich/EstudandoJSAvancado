class ProxyFactory{
	static create(objetoDoProxy, propriedadesVigiadasDoObjeto, acaoTomadaNasAtividades){

		new Proxy(new ListaNegociacoes(),{

			get(target, prop, reciver) {
				if( propriedadesVigiadasDoObjeto.includes(prop) && Typeof(target[prop]) == typeof(Function) ) {

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