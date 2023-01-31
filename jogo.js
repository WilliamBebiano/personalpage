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

const foguete = new Image()
foguete.src = './assets/foguete2.png'

const ready = new Image()
ready.src = './assets/initial2.png'

const canvas = document.querySelector('canvas')
const contexto = canvas.getContext('2d')

/// Funcao de colisao astronauta e o chao 

function fazColisao(astronaut, floor) {
    const astronautY = astronaut.y + 100
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
        x: 25,
        y:10,
        newWidth: 45,
        newHeight: 85,
        
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
function createBackground() {
const background = {
    spriteX: 763,
    spriteY: 15,
    width: 1766,
    height: 1026,
    x: 0,
    y:0,
    newWidth: 2800,
    newHeight: 1200,
    atualiza(){
        const backgroundMove = 2
        const repeatIn = background.width  / 1
        const movement = background.x - backgroundMove

        background.x = movement % repeatIn
    },
    drawBackground() {
        /* se fosse necessrio completar o plano de fundo com alguma cor*/
        //contexto.fillStyle = '#00000'//cor ficticia
        //contexto.fillRect(0,0, canvas.width, canvas.height)

        contexto.drawImage(
        sprites, // image é a imagem base do arquivo que trara a imagem a tela , no caso sprite
        background.spriteX , background.spriteY, // sprite x e y
        background.width,background.height, // tamanho do recorte na sprite
        background.x,background.y, // ponto de inicio do personagem no canvas
        background.newWidth, background.newHeight // tamanho da imagem que ira aparecer no canvas (redimensionada)
)
    }
}
return background
}

// (chao do jogo)
function createFloor(){
    
const floor = {
    spriteX: 14,
    spriteY: 1264,
    width: 1476,
    height: 392,
    x: 0,
    y: canvas.height - 120,
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
/*// ( ataques de cometa )
function createCometa() {
    const cometa = {
        width: 510,
        height: 363,
        newWidth: 250,
        newHeight: 200,


        chao: {
            spriteX: 58,
            spriteY: 5,
        },
        ceu: {
            spriteX: 52,
            spriteY: 10,
        },
        espaco: 80,
        drawCometa() {
            
        // const cometaCeuX = 600
        // const cometaCeuY = 0
            
            cometa.pares.forEach(function(par){
            const yRandom = par.y
            const spaceBetweenCometa = 90
            const cometaCeuX = par.x;
            const cometaCeuY = yRandom;
           
        // (Cometa do Ceu)
                contexto.drawImage(
                meteoro, // image é a imagem base do arquivo que trara a imagem a tela , no caso sprite
                cometa.ceu.spriteX, cometa.ceu.spriteY, // sprite x e y
                cometa.width, cometa.height, // tamanho do recorte na sprite
                cometaCeuX, cometaCeuY, // ponto de inicio do personagem no canvas
                cometa.newWidth, cometa.newHeight // tamanho da imagem que ira aparecer no canvas (redimensionada)
            )

        /// (Cometa do chao)
           const cometaChaoX = par.x
            const cometaChaoY = cometa.newHeight + spaceBetweenCometa +yRandom
            contexto.drawImage(
                meteoro, // image é a imagem base do arquivo que trara a imagem a tela , no caso sprite
                cometa.chao.spriteX, cometa.chao.spriteY, // sprite x e y
                cometa.width, cometa.height, // tamanho do recorte na sprite
                cometaChaoX, cometaChaoY, // ponto de inicio do personagem no canvas
                cometa.newWidth, cometa.newHeight // tamanho da imagem que ira aparecer no canvas (redimensionada)
            )

            par.cometaCeu = {
                x: cometaCeuX,
                y: cometa.height + cometaCeuY
            }

            par.cometaChao = {
                x: cometaChaoX,
                y: cometaChaoY
            }

             })
        },
        pares: [],
        atualiza() {
          const passou100frames =  frames & 100 ===0
            if(passou100frames){
                cometa.pares.push({
                x: 600,
                y: -150 * (Math.random() + 1),
                })
            }

            cometa.pares.forEach(function(par){
                par.x = par.x - 2
            })
        }
    
    }
    return cometa
}*/
// Nave espacial 
function createNave() {
    const nave = {
        width: 68.5,
        height: 281,
        chao: {
            spriteX: 3,
            spriteY: 1,
        },
        ceu: {
            spriteX: 69,
            spriteY: 1,
        },
        espaco: 80,
        drawNave() {


            nave.pares.forEach(function(par) {

                const yRandom = par.y
                const spaceBetweenNave = 160

                const naveCeuX = par.x
                const naveCeuY = yRandom


                // (Cometa do Ceu)
                contexto.drawImage(
                    foguete, // image é a imagem base do arquivo que trara a imagem a tela , no caso sprite
                    nave.ceu.spriteX, nave.ceu.spriteY, // sprite x e y
                    nave.width, nave.height, // tamanho do recorte na sprite
                    naveCeuX, naveCeuY, // ponto de inicio do personagem no canvas
                    nave.width, nave.height // tamanho da imagem que ira aparecer no canvas (redimensionada)
                )

                /// (Cometa do chao)
                const naveChaoX = par.x
                const naveChaoY = nave.height + spaceBetweenNave + yRandom
                contexto.drawImage(
                    foguete, // image é a imagem base do arquivo que trara a imagem a tela , no caso sprite
                    nave.chao.spriteX, nave.chao.spriteY, // sprite x e y
                    nave.width, nave.height, // tamanho do recorte na sprite
                    naveChaoX, naveChaoY, // ponto de inicio do personagem no canvas
                    nave.width, nave.height // tamanho da imagem que ira aparecer no canvas (redimensionada)
                )

                par.naveCeu = {
                      x: naveCeuX,
                      y: nave.height + naveCeuY
                  },
      
                  par.navechao = {
                      x: naveChaoX,
                      y: naveChaoY
                  }

            })
        },

        temColisaoComOAstronauta(par){

            const cabecaDoAstronaut = globais.astronaut.y
            const peDoAstronaut = globais.astronaut.y + globais.astronaut.newHeight

            if((globais.astronaut.x + globais.astronaut.newWidth >= par.x) ){
                if( cabecaDoAstronaut <= par.naveCeu.y){
                    return true
                }
                
                if(peDoAstronaut >= par.navechao.y){
                    return true
                }
            }
            return false

        },
        pares: [],

        

        atualiza() {
            const passou100frames = frames % 100 === 0
            if (passou100frames) {
                console.log('passou 100 frames')
                nave.pares.push({
                    x: canvas.width - 100,
                    y: -70 * (Math.random() + 1),
                })
            }

            nave.pares.forEach(function(par) {
                par.x = par.x - 2

                if (nave.temColisaoComOAstronauta(par)) {
                    console.log('voce perdeu')
                    mudaParaTela(telas.INICIO)

                }

                if (par.x + nave.width <= 0) {
                    nave.pares.shift()
                }
            }
            )
        }

    }
    return nave
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
           globais.background = createBackground()
           globais.astronaut = createNewAstronaut() 
           globais.floor = createFloor()
           //globais.cometa = createCometa()
           globais.nave = createNave()

        },
        draw() {
            globais.background.drawBackground()
            globais.floor.drawFloor()
            //globais.nave.drawNave()
            globais.astronaut.drawAstronaut()
            
            inicio.drawInicio()
            

        },
        click() {
            mudaParaTela(telas.JOGO)
        },
        atualiza() {
            globais.floor.atualiza()
            //globais.nave.atualiza()
            
            
            

        }
    }
}

telas.JOGO = {
    draw() {
        globais.background.drawBackground()
        globais.floor.drawFloor()
        globais.astronaut.drawAstronaut()
        //globais.cometa.drawCometa()
        globais.nave.drawNave()
    },
    click() {
        globais.astronaut.jump()

    },
    atualiza() {
        //globais.cometa.atualiza()
        globais.astronaut.atualiza()
        globais.floor.atualiza()
        globais.background.atualiza()
        globais.nave.atualiza()
        
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

