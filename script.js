const limiter = 361
let iterations = 0
let len = 100
let defaultZ = 0
let angle1 = 6
let angle2 = 67
let Axis = 2
let globalAngle = 1
//end of consts region



globalAngle = globalAngle*Math.PI/180;
angle1 = angle1*Math.PI/180;
angle2 = angle2*Math.PI/180;


let center = new Verticle(canvas.width/2, canvas.height/2, defaultZ)

let drawingSequence = []
let firstStickCoords = [] 
let secondStickCoords = []

firstStickCoords.push(new Verticle(center.X, center.Y, defaultZ))
firstStickCoords.push(new Verticle(center.X, center.Y-len, defaultZ))
secondStickCoords.push(new Verticle(center.X, center.Y, defaultZ))
secondStickCoords.push(new Verticle(center.X, center.Y-len, defaultZ))


window.requestAnimationFrame(function loop() {

    context.clearRect(0, 0, canvas.width, canvas.height)
    context.fillRect(0, 0, canvas.width, canvas.height)

    if(iterations<limiter)
    {
        firstStickCoords[1] = multiplyMatrixAndPoint( rotateAroundZAxis(angle1), firstStickCoords[1], center);
        let shiftX = secondStickCoords[0].X-firstStickCoords[1].X
        let shiftY = secondStickCoords[0].Y-firstStickCoords[1].Y
        let shiftZ = secondStickCoords[0].Z-firstStickCoords[1].Z

        secondStickCoords[0].X -=shiftX
        secondStickCoords[0].Y -=shiftY
        secondStickCoords[0].Z -=shiftZ
        
        console.log("here")
        console.log(secondStickCoords[0])
        console.log(firstStickCoords[1])



        secondStickCoords[1].X -= shiftX
        secondStickCoords[1].Y-= shiftY
        secondStickCoords[1].Z-= shiftZ

        secondStickCoords[1] = multiplyMatrixAndPoint( rotateAroundZAxis(angle1), secondStickCoords[1], firstStickCoords[1]);
        secondStickCoords[1] = multiplyMatrixAndPoint( rotateAroundZAxis(angle2), secondStickCoords[1], firstStickCoords[1]);




        drawingSequence.push(new Verticle(secondStickCoords[1].X, secondStickCoords[1].Y, secondStickCoords[1].Z))
        iterations+=1



        context.beginPath();
        context.moveTo(firstStickCoords[0].X, firstStickCoords[0].Y)
        context.lineTo(firstStickCoords[1].X, firstStickCoords[1].Y)
        context.stroke()
    
        context.beginPath();
        context.moveTo(secondStickCoords[0].X, secondStickCoords[0].Y)
        context.lineTo(secondStickCoords[1].X, secondStickCoords[1].Y)
        context.stroke()
    }
    for (var i = 0; i < drawingSequence.length; i++) {
        if(Axis==0)
        {
            drawingSequence[i] = multiplyMatrixAndPoint( rotateAroundXAxis(globalAngle), drawingSequence[i], center);
        }
        else if(Axis==1)
        {
            drawingSequence[i] = multiplyMatrixAndPoint( rotateAroundYAxis(globalAngle), drawingSequence[i], center);

        }
        else if(Axis==2)
        {
            drawingSequence[i] = multiplyMatrixAndPoint( rotateAroundZAxis(globalAngle), drawingSequence[i], center);
        }
    }
    context.beginPath();
    for (var i = 1; i < drawingSequence.length; i++) {
        context.moveTo(drawingSequence[i-1].X, drawingSequence[i-1].Y);
        context.lineTo(drawingSequence[i].X, drawingSequence[i].Y);
    }
    context.stroke()

    window.requestAnimationFrame(loop)
})