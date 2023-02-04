console.log('[WB] Game about me ')

let frames = 0

const somCaiu = new Audio()
somCaiu.src = './assets/efeitos/efeitos_caiu.wav'

const somHit = new Audio()
somHit.src = './assets/efeitos/efeitos_hit.wav'

const somJump = new Audio()
somJump.src = './assets/efeitos/efeitos_pulo.wav'

const sprites = new Image()
sprites.src = './assets/sprite.png'

const astro1 = new Image()
astro1.src = './assets/atrotres-removebg.png'

const meteoro = new Image()
meteoro.src = './assets/meteoro1.png'

const foguete = new Image()
foguete.src = './assets/foguete2.png'

const ready = new Image()
ready.src = './assets/newgame.png'

const lavaFloor = new Image()
lavaFloor.src = './assets/bg.png'

const canvas = document.querySelector('canvas')
const contexto = canvas.getContext('2d')

/// Funcao de colisao astronauta e o chao 

function fazColisao(astronaut, floor) {
    const astronautY = astronaut.y + 80
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
            somJump.play()
        },
        gravidade: 0.25,
        velocidade: 0,
        atualiza() {
            if(fazColisao(astronaut, globais.floor)){
                //console.log("colide")
                somCaiu.play()

                
                    mudaParaTela(telas.FIMDOJOGO)
                
                
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
    spriteX: 0,
    spriteY: 0,
    width: 3122,
    height: 1821,
    x: 0,
    y:0,
    newWidth: 1000,
    newHeight: 600,
    atualiza(){
        const backgroundMove = 2
        const repeatIn = background.width  / 1
        const movement = background.x - backgroundMove

       // background.x = movement % repeatIn
    },
    drawBackground() {
        /* se fosse necessrio completar o plano de fundo com alguma cor*/
        //contexto.fillStyle = '#00000'//cor ficticia
        //contexto.fillRect(0,0, canvas.width, canvas.height)

        contexto.drawImage(
        lavaFloor, // image é a imagem base do arquivo que trara a imagem a tela , no caso sprite
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
    spriteX: 0,
    spriteY: 1870,
    width: 3122,
    height: 329,
    x: 0,
    y: canvas.height - 120,
    newWidth: 3122,
    newHeight: 120,
    atualiza(){
        const floorMove = 1
        const repeatIn = floor.width /2 
        const movement = floor.x - floorMove

        floor.x = movement % repeatIn
    },
    drawFloor() {
        contexto.drawImage(
        lavaFloor, // image é a imagem base do arquivo que trara a imagem a tela , no caso sprite
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
                    somHit.play()
                    return true
                }
                
                if(peDoAstronaut >= par.navechao.y){
                    somHit.play()
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
                    x: canvas.width - 500,
                    y: -70 * (Math.random() + 1),
                })
            }

            nave.pares.forEach(function(par) {
                par.x = par.x - 2

                if (nave.temColisaoComOAstronauta(par)) {
                    console.log('voce perdeu')
                    mudaParaTela(telas.FIMDOJOGO)

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

//
// Tela de inicio ( Orbit Run - Ready)
//
const inicio = {
    spriteX: 18,
    spriteY: 450,
    width: 826,
    height: 390,
    x: 250,
    y: 150,
    newWidth: 500,
    newHeight: 250,
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
// Tela de GameOver( Orbit Run - GameOver)
//
const gameOver = {
    spriteX: 18,
    spriteY: 27,
    width: 826,
    height: 390,
    x: 250,
    y: 150,
    newWidth: 500,
    newHeight: 250,
    drawGameOver() {
        contexto.drawImage(
        ready, // image é a imagem base do arquivo que trara a imagem a tela , no caso sprite
        gameOver.spriteX , gameOver.spriteY, // sprite x e y
        gameOver.width,gameOver.height, // tamanho do recorte na sprite
        gameOver.x,gameOver.y, // ponto de inicio do personagem no canvas
        gameOver.newWidth, gameOver.newHeight // tamanho da imagem que ira aparecer no canvas (redimensionada)
        
       )
       

    }
}



//
// Criando Placar ou Score
//
function createPlacar() {
    const placar = {
        pontuacao: 0,
        drawPlacar() {
            contexto.font = '35px vt323'
            contexto.fillStyle = 'white'
            contexto.fillText(`SCORE ${placar.pontuacao}`,canvas.width -200, 35)
            placar.pontuacao

        },
        atualiza() {
            const intervaloDeFrames = 20
            const passouOIntervalo = frames % intervaloDeFrames ===0

            if(passouOIntervalo) {
            placar.pontuacao = placar.pontuacao + 1
        }
        }
    }
    return placar
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
           globais.nave = createNave()

        },
        desenha() {
            globais.background.drawBackground()
            globais.floor.drawFloor()
            globais.astronaut.drawAstronaut()
            
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
    inicializa(){
        globais.placar = createPlacar()

    },
    
    desenha() {
        globais.background.drawBackground()
        globais.floor.drawFloor()
        globais.astronaut.drawAstronaut()
        globais.nave.drawNave()
        globais.placar.drawPlacar()
    },
    click() {
        globais.astronaut.jump()

    },
    atualiza() {
        globais.astronaut.atualiza()
        globais.floor.atualiza()
        globais.nave.atualiza()
        globais.placar.atualiza()
        
    }
}

telas.FIMDOJOGO = {
    desenha() {
       gameOver.drawGameOver()

    },
    atualiza() {

    },
    click(){
        mudaParaTela(telas.INICIO)

    }

}

function loop() {
    
    telaAtiva.desenha()
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

