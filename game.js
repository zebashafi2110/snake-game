let canvas = document.querySelector('canvas')
let pen = canvas.getContext('2d')
let cellSize=50
pen.fillRect(0,0,50,50)
let snakecell=[[0,0]]
let gameOver=false
let boardH=550
let boardW=1200

let direction='right'
let foodcell=generateFood()
let count=0

document.addEventListener('keydown',(e)=>{
    if(e.key==='ArrowUp'){
        direction='up'
    }
    
    else if(e.key==='ArrowDown'){
        direction='down'
    }
    else if(e.key==='ArrowRight'){
        direction='right'
    }
    else{
        direction='left'
    }
})

//drow
function draw(){
    if(gameOver){
      //clearInterval(id)
      pen.font="80px Georgia";
      pen.fillText(" Game Over",400,250);
      pen.font="80px Verdana"
      return;
    }
    pen.clearRect(0,0,1200,550)
    for(let cell of snakecell){
        pen.fillStyle='black'
        pen.fillRect(cell[0],cell[1],cellSize,cellSize)
    }
    pen.fillStyle='pink'
    pen.fillRect(foodcell[0],foodcell[1],cellSize,cellSize)

    pen.font='35px san-sarif'
    pen.fillText(`score ${count}`,70,50)
    
}
//drow()

function update(){
    let headX= snakecell[snakecell.length-1][0]
    let headY=snakecell[snakecell.length-1][1]
    let newX
    let newY
    if(direction==='right'){
        newX=headX+cellSize;
        newY=headY
        if(newX===boardW||checkMate(newX,newY)){
            gameOver=true
        }
    }
    
    else if(direction==='left'){
        newX=headX-cellSize;
        newY=headY
        if(newX<0){
            gameOver=true
        }
    }
    else if(direction==='down'){
        newX=headX;
        newY=headY+cellSize
        if(newY===boardH){
            gameOver=true
        }
    }
    else{
        newX=headX
        newY=headY-cellSize
        if(newY<0){
            gameOver=true
        }
    }
    snakecell.push([newX,newY])
    if(newX===foodcell[0]&&newY===foodcell[1]){
        foodcell=generateFood()
        count++
    }
    else{

    snakecell.shift()
    }
}
//update
let id=setInterval(()=>{
    draw()
    update()
},200)

function generateFood(){

    return([
        Math.round(Math.random()*(boardW-cellSize)/50)*50,
        Math.round(Math.random()*(boardH-cellSize)/50)*50
    ])
}
console.log(generateFood())

//khud ko box cut na kre ,if cut kre to gameover ho jaye.
function checkMate(newX,newY){
    for(let item of snakecell){
        if(item[0]==newX && item[1]===newY){
            return true

        }
        else{
            return false
        }
    }
    
}

    
    