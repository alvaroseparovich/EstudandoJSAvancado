class Bind {
	
	constructor(model, view, ...propriedades){
	
		let proxy = ProxyFactory.create(
			model,
			propriedades,
			modelo => {view.update(model)}
		);
	
		view.update(model);
		
		return proxy;

	}
}