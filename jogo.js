console.log('[WB] Game about me ')
const sprites = new Image()
sprites.src = './assets/sprite.png'

const astro1 = new Image()
astro1.src = './assets/astro1.png'

const meteoro = new Image()
meteoro.src = './assets/meteoro1.png'

const canvas = document.querySelector('canvas')
const contexto = canvas.getContext('2d')

//(personagem Astronauta)
const astronaut = {
    spriteX: 25,
    spriteY: 28,
    width: 282,
    height: 701,
    x: 10,
    y:380,
    newWidth: 80,
    newHeight: 180,

    atualiza() {
        astronaut.y = astronaut.y +1
    },
    drawAstronaut() {
        contexto.drawImage(
        astro1, // image é a imagem base do arquivo que trara a imagem a tela , no caso sprite
        astronaut.spriteX , astronaut.spriteY, // sprite x e y
        astronaut.width,astronaut.height, // tamanho do recorte na sprite
        astronaut.x,astronaut.y, // ponto de inicio do personagem no canvas
        astronaut.newWidth, astronaut.newHeight // tamanho da imagem que ira aparecer no canvas (redimensionada)
)
    }
}

//( definicao de background )
const background = {
    spriteX: 753,
    spriteY: 8,
    width: 1766,
    height: 1026,
    x: 0,
    y:0,
    newWidth: 1200,
    newHeight: 602,
    drawBackground() {
        /* se fosse necessrio completar o plano de fundo com alguma cor*/
        /*contexto.fillStyle = '#70c5ce'//cor ficticia
        contexto.fillRect(0,0, canvas.width, canvas.height)*/

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
const floor = {
    spriteX: 14,
    spriteY: 1264,
    width: 1476,
    height: 392,
    x: 0,
    y:500,
    newWidth: 1000,
    newHeight: 200,
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

// ( ataques de cometa )
const cometa = {
    spriteX: 58,
    spriteY: 17,
    width: 510,
    height: 363,
    x: 400,
    y: 400,
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




function loop() {
    
    background.drawBackground()
    floor.drawFloor()
    astronaut.drawAstronaut() 
    cometa.drawCometa()
    requestAnimationFrame(loop)

   

}
loop()

