class View{

	constructor(elemento){
		this._elemento = elemento;
	}

	template(){
		throw new Error("o methodo tamplate deve ser implementado");
	}

	update(model){

		this._elemento.innerHTML = this.template(model);
	}
}