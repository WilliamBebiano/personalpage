console.log('[WB] Game about me ')

let frames = 0

const somHit = new Audio()
somHit.src = './assets/efeitos/efeitos_hit.wav'

const sprites = new Image()
sprites.src = './assets/sprite.png'

const astro1 = new Image()
astro1.src = './assets/atrotres-removebg.png'

const meteoro = new Image()
meteoro.src = './assets/meteoro1.png'

const ready = new Image()
ready.src = './assets/initial2.png'

const canvas = document.querySelector('canvas')
const contexto = canvas.getContext('2d')

/// Funcao de colisao astronauta e o chao 

function fazColisao(astronaut, floor) {
    const astronautY = astronaut.y + 180
    const floorY = floor.y

    if(astronautY >= floorY){
        return true
    }
    return false
}

//(personagem Astronauta)
function createNewAstronaut() {
    const astronaut = {
        spriteX: 31,
        spriteY: 229.9,
        width: 276,
        height: 619,
        x: 0,
        y:0,
        newWidth: 80,
        newHeight: 180,
        
        pulo:4.6,
    
        jump(){
            console.log("devo ter pulado")
            astronaut.velocidade = - astronaut.pulo 
    
        },
        gravidade: 0.25,
        velocidade: 0,
        atualiza() {
            if(fazColisao(astronaut, globais.floor)){
                console.log("colide")
                somHit.play()

                setTimeout(() => {
                    mudaParaTela(telas.INICIO)
                }, 500);
                
                return
    
            }
            astronaut.velocidade = astronaut.velocidade + astronaut.gravidade
            astronaut.y = astronaut.y +  astronaut.velocidade
        },
        movimentos: [
            {spriteX: 31,spriteY: 229.9, width: 276, height: 619,}, // normal
            {spriteX: 429.5, spriteY: 229.9, width: 377.3, height: 619,}, // turbo medio
            {spriteX: 817.7, spriteY: 228, width: 338, height: 775.3,} // mega turbo
        ],
        frameAtual : 0,
        atualizarOFrameAtual(){
            const intervaloDeFrames = 10
            const passouOIntervalo = frames % intervaloDeFrames ===0
            if(passouOIntervalo) {
            const baseDoIncremento = 1
            const incremento = baseDoIncremento + astronaut.frameAtual
            const baseRepeticao = astronaut.movimentos.length
            astronaut.frameAtual = incremento % baseRepeticao

            }
        },
        drawAstronaut() {
            astronaut.atualizarOFrameAtual()
            const { spriteX, spriteY, width , height }   = astronaut.movimentos[astronaut.frameAtual]         
            contexto.drawImage(
            astro1, // image é a imagem base do arquivo que trara a imagem a tela , no caso sprite
            spriteX , spriteY, // sprite x e y
            width,height, // tamanho do recorte na sprite
            astronaut.x,astronaut.y, // ponto de inicio do personagem no canvas
            astronaut.newWidth, astronaut.newHeight // tamanho da imagem que ira aparecer no canvas (redimensionada)
    )
        }
    }
    return astronaut
}


//( definicao de background )
const background = {
    spriteX: 763,
    spriteY: 15,
    width: 1766,
    height: 1026,
    x: 0,
    y:0,
    newWidth: 1200,
    newHeight: 602,
    drawBackground() {
        /* se fosse necessrio completar o plano de fundo com alguma cor*/
        contexto.fillStyle = '#00000'//cor ficticia
        contexto.fillRect(0,0, canvas.width, canvas.height)

        contexto.drawImage(
        sprites, // image é a imagem base do arquivo que trara a imagem a tela , no caso sprite
        background.spriteX , background.spriteY, // sprite x e y
        background.width,background.height, // tamanho do recorte na sprite
        background.x,background.y, // ponto de inicio do personagem no canvas
        background.newWidth, background.newHeight // tamanho da imagem que ira aparecer no canvas (redimensionada)
)
    }
}


// (chao do jogo)
function createFloor(){
const floor = {
    spriteX: 14,
    spriteY: 1264,
    width: 1476,
    height: 392,
    x: 0,
    y:500,
    newWidth: 1800,
    newHeight: 200,
    atualiza(){
        const floorMove = 1
        const repeatIn = floor.width /2 
        const movement = floor.x - floorMove

        floor.x = movement % repeatIn
    },
    drawFloor() {
        contexto.drawImage(
        sprites, // image é a imagem base do arquivo que trara a imagem a tela , no caso sprite
        floor.spriteX , floor.spriteY, // sprite x e y
        floor.width,floor.height, // tamanho do recorte na sprite
        floor.x,floor.y, // ponto de inicio do personagem no canvas
        floor.newWidth, floor.newHeight // tamanho da imagem que ira aparecer no canvas (redimensionada)
)
    }
}
return floor
}
// ( ataques de cometa )
const cometa = {
    spriteX: 58,
    spriteY: 17,
    width: 510,
    height: 363,
    x: 900,
    y: 10,
    newWidth: 100,
    newHeight: 50,
    drawCometa() {
        contexto.drawImage(
        meteoro, // image é a imagem base do arquivo que trara a imagem a tela , no caso sprite
        cometa.spriteX , cometa.spriteY, // sprite x e y
        cometa.width,cometa.height, // tamanho do recorte na sprite
        cometa.x,cometa.y, // ponto de inicio do personagem no canvas
        cometa.newWidth, cometa.newHeight // tamanho da imagem que ira aparecer no canvas (redimensionada)
)
    }
}
// Tela de inicio 
const inicio = {
    spriteX: 29.1,
    spriteY: 50.9,
    width: 723.1,
    height: 399.1,
    x: 120,
    y: 100,
    newWidth: 1000,
    newHeight: 400,
    drawInicio() {
        contexto.drawImage(
        ready, // image é a imagem base do arquivo que trara a imagem a tela , no caso sprite
        inicio.spriteX , inicio.spriteY, // sprite x e y
        inicio.width,inicio.height, // tamanho do recorte na sprite
        inicio.x,inicio.y, // ponto de inicio do personagem no canvas
        inicio.newWidth, inicio.newHeight // tamanho da imagem que ira aparecer no canvas (redimensionada)
)
    }
}
//
//(Telas)
//
const globais = {}
let telaAtiva = {}

function mudaParaTela(novaTela) {
    telaAtiva = novaTela

    if(telaAtiva.inicializa){
    telaAtiva.inicializa()
} 
}


const telas = {
    INICIO: {
        inicializa() {
           globais.astronaut = createNewAstronaut() 
           globais.floor = createFloor()
        },
        draw() {
            background.drawBackground()
            //floor.drawFloor()
            //astronaut.drawAstronaut()
            globais.floor.drawFloor()
           // globais.astronaut.drawAstronaut()
            inicio.drawInicio()
            

        },
        click() {
            mudaParaTela(telas.JOGO)
        },
        atualiza() {
            globais.floor.atualiza()

        }
    }
}

telas.JOGO = {
    draw() {
        background.drawBackground()
        globais.floor.drawFloor()
        globais.astronaut.drawAstronaut()
        cometa.drawCometa()
    },
    click() {
        globais.astronaut.jump()

    },
    atualiza() {
        globais.astronaut.atualiza()
        globais.floor.atualiza()
    }
}

function loop() {
    
    telaAtiva.draw()
    telaAtiva.atualiza()
    
    frames = frames + 1
    requestAnimationFrame(loop)
  
}
window.addEventListener('click', function(){
   if(telaAtiva.click){
    telaAtiva.click()

   }
})

mudaParaTela(telas.INICIO)
loop()

