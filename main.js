Vue.component('dico', {
	template: `
	<div>
		<h1>{{ title }}</h1>
		<h4 v-if="lang==='fr'"> Teste = {{ trans }} </h4>
		<h4 v-else> {{ trans }} = Teste </h4>
		<div class="row">
			<div class=" col-sm-6 image">
				<div class="row">
					<div class="col-sm-5">
						<img v-bind:src="imagefr" class="col-sm-12" 
							:style="dataImg" :alt="altImg"
						/>
					</div>
					<div class="col-sm-2">
						<p> => </p>
					</div>
					<div class="col-sm-5">
						<img v-bind:src="imagemg" class="col-sm-12"
						:style="dataImg" :alt="altImg" >
					</div>
				</div>
			</div>	
		</div>	

		<div class="row">
			<div class="col-sm-6">
				<strong>Traduction</strong>
				<p v-if="lang==='fr'" :style="{ 'color': textColor, 'font-size': textFontSize}">Français => Malagasy</p>
				<p v-else  :style="{ 'color': textColor, 'font-size': textFontSize}">Malagasy => Français</p>
			</div>
			<div class="col-sm-6">
				<button v-on:click="incrementNombreFr()" class="btn btn-primary">Traduire ( {{nombreFr}} )</button>
				<button v-on:click="incrementNombreMg()" class="btn btn-success">Translate ( {{nombreMg}} )</button>
			</div>	

			<div class="col-sm-12">
				<button v-on:click="compteur()" class="btn btn-danger">Compteur event</button>
			</div>		

			<div class="jumbotron">
				<h1> Commentaires </h1>
				<ul>
					<li v-for="comment in comments"> {{ comment.name + ' ' + comment.teste}}    </li>
				</ul>

			</div>	

			<div>
				<formulaire @clickSubmit="afficher"></formulaire>
			</div>
		</div>	
	</div>
	`,
	data(){
		return {
			trans: 'Andrana',
			imagefr: 'france.png',
			imagemg: 'dago.png',
			lang: 'fr',
			langues: ['Francais', 'Malagasy'],
			nombreFr : 0,
			nombreMg : 0,
			dataImg: {
				width: '80%',
			},
			altImg: 'drapeau',
			textColor: "#ffee11",
			textFontSize:"18px",
			comments : []
		}		
	},
	methods: {
		incrementNombreFr(){
			this.trans = 'Andrana',
			this.nombreFr += 1,
			this.imagefr = 'france.png',
			this.imagemg = 'dago.png',
			this.lang = 'fr'
		},
		incrementNombreMg(){
			this.trans = 'Andrana',
			this.lang === 'fr' ? this.nombreMg += 1: this.nombreMg,
			this.imagemg = 'france.png',
			this.imagefr = 'dago.png',
			this.lang = 'mg'
		},
		compteur(){
			this.$emit('click-component')
		},
		afficher(dataForm) {
			this.comments.push(dataForm)
			console.log(this.comments)
		}
	},
	computed: {
		title(){
			return this.lang === 'fr' ? 'Français => Malagasy' : 'Malagasy => Français'
		}
	}
})


Vue.component('formulaire', {
	template: `
		<div class="jumbotron" @submit.prevent="onSubmit">
			<ul>
				<li v-for="error in errors" class="text-danger"> {{ error }} </li>
			</ul>
			<form class="form-group">
				<input v-model="name" class="form-control"/><br/>
				<input v-model="teste" class="form-control"/><br/>
				<button class="btn btn-primary">Envoyer</button>
			</form>
		</div>		
	`,
	data(){
		return {
			name: null,
			teste: null,
			errors: []
		}
	},
	methods: {
		onSubmit() {
			if( this.name && this.teste){
				let dataForm = {
					name: this.name,
					teste: this.teste
				}
				this.$emit('clickSubmit', dataForm)
				this.name = null,
				this.teste = null
			}else{
				this.errors = []
				if( !this.name ) this.errors.push("Name required")
				if( !this.teste ) this.errors.push("Teste required")
			}
			
		}
	}
})

var app = new Vue({
	el:'#app',
	data: {
		compteur : 0
	},
	methods: {
		updateCompteur(){
			this.compteur += 1
		}
	}
})