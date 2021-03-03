const sprites = new Image()
sprites.src = './sprites.png'

const canvas = document.querySelector('canvas')
const contexto = canvas.getContext('2d')


const background = {
	spriteX: 	390,
	spriteY: 	0,
	largura: 	275,
	altura: 	204,
	canvasX: 	0,
	canvasY: 	 canvas.height - 204,

	draw()
	{
		contexto.fillStyle = '#70c5ce'
		contexto.fillRect(0, 0, canvas.width, canvas.height)

		contexto.drawImage
		(
			sprites,
			background.spriteX, background.spriteY,
			background.largura, background.altura,
			background.canvasX, background.canvasY,
			background.largura, background.altura,
		)

		contexto.drawImage
		(
			sprites,
			background.spriteX, background.spriteY,
			background.largura, background.altura,
			(background.canvasX + background.largura), background.canvasY,
			background.largura, background.altura,
		)
		
	}
}

const ground = {
	spriteX: 	0,
	spriteY: 	610,
	largura: 	224,
	altura: 	112,
	canvasX: 	0,
	canvasY: 	 canvas.height - 112,

	draw()
	{
		contexto.drawImage
		(
			sprites,
			ground.spriteX, ground.spriteY,
			ground.largura, ground.altura,
			ground.canvasX, ground.canvasY,
			ground.largura, ground.altura,
		);

		contexto.drawImage
		(
			sprites,
			ground.spriteX, ground.spriteY,
			ground.largura, ground.altura,
			(ground.canvasX + ground.largura), ground.canvasY,
			ground.largura, ground.altura,
		)
	}
}

function fazCollisao(flappyBird, ground)
{
	const flappyBirdY = flappyBird.canvasY + flappyBird.altura
	const groundY = ground.canvasY

	if(flappyBirdY >= groundY)
		return true

	return false
}

const flappyBird = {
	spriteX: 	0,
	spriteY: 	0,
	largura: 	33,
	altura: 	24,
	canvasX: 	10,
	canvasY: 	50,	
	pulo: 4.6,

	pular()
	{
		flappyBird.velocidade = - flappyBird.pulo
	},

	velocidade: 0,
	gravidade: 	0.25,
	Update()
	{
		if(fazCollisao(flappyBird, ground))
		{
			console.log('colidiu')
			return
		}

		flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade
		flappyBird.canvasY = flappyBird.canvasY + flappyBird.velocidade
	},

	draw()
	{
		contexto.drawImage
		(
			sprites,
			flappyBird.spriteX, flappyBird.spriteY,       	//sprite posição x e posição x=y
			flappyBird.largura, flappyBird.altura, 			//tamanho do recorte do sprite
			flappyBird.canvasX, flappyBird.canvasY,			//posição no canvas
			flappyBird.largura, flappyBird.altura,			//tamanho da imagem no canvas
		)
	}
}

const mensagemGetReady = {
	sX: 134,
	sY: 0,
	w: 174,
	h: 152,
	x: (canvas.width / 2) - 174 / 2,
	y: 50,

	draw()
	{
		contexto.drawImage
		(
			sprites,
			mensagemGetReady.sX, mensagemGetReady.sY,
			mensagemGetReady.w, mensagemGetReady.h,
			mensagemGetReady.x, mensagemGetReady.y,
			mensagemGetReady.w, mensagemGetReady.h
		)
	}
}

let telaAtiva = {}
function mudaTela(novaTela)
{
	telaAtiva = novaTela
}

const Telas = {
	INICIO:{
		draw()
		{
			background.draw()
			ground.draw()
			flappyBird.draw()
			mensagemGetReady.draw()
		},
		click()
		{
			mudaTela(Telas.game)
		},
		update()
		{

		}
	}
}

Telas.game = {
	draw()
	{
		background.draw()
		ground.draw()
		flappyBird.draw()
	},
	click()
	{
		flappyBird.pular()
	},
	update()
	{
		flappyBird.Update()
	}
}

function Update()
{
	telaAtiva.draw()
	telaAtiva.update()

	requestAnimationFrame(Update)
}

window.addEventListener('click', function(){
	if(telaAtiva.click)
	{
		telaAtiva.click()
	}
})

mudaTela(Telas.INICIO)
Update()