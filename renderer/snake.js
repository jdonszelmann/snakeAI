int = parseInt


var snake = function( p ) {
	let cols = 30
	let rows = 30
	let width = 640
	let height = 480
	let snakes = []

	class snake{
		constructor(){
			this.x = int(p.random(cols))
			this.y = int(p.random(rows))
			this.size = 5
			this.blocks = [{x:this.x,y:this.y}]
			this.direction = p.random(["north","east","south","west"])
		}

		north(){
			if(this.direction == "east" || this.direction == "west"){
				this.direction = "north"
			}
		}

		east(){
			if(this.direction == "north" || this.direction == "south"){
				this.direction = "east"
			}
		}

		south(){
			if(this.direction == "east" || this.direction == "west"){
				this.direction = "south"
			}
		}

		west(){
			if(this.direction == "north" || this.direction == "south"){
				this.direction = "west"
			}
		}

		update(){
			if(this.direction == "north"){
				this.y -= 1
			}else if(this.direction == "east"){
				this.x += 1
			}else if(this.direction == "south"){
				this.y += 1
			}else if(this.direction == "west"){
				this.x -= 1
			}
			if(this.x > cols-1){
				this.x = 0
			}
			if(this.x < 0){
				this.x = cols
			}
			if(this.y > rows - 1){
				this.y = 0
			}
			if(this.y < 0){
				this.y = rows
			}

			this.blocks.push({x:this.x,y:this.y})
			if(this.blocks.length > this.size){
				this.blocks.shift()
			}
		}

	}

	p.setup = function(){
		p.createCanvas(width,height)
		snakes.push(new snake())
	}

	p.draw = function(){
		p.background(51)
		p.noStroke()
		p.fill(0,255,255)
		for(s of snakes){
			s.update()
			for (i of s.blocks){
				if(i != undefined){
					p.rect(i.x*(width-1)/cols,i.y*(height-1)/rows,(width-1)/cols,(height-1)/rows);
				}
			}
		}
		p.noFill()
	}

	p.keyPressed = function(key){
		if (p.keyCode === p.LEFT_ARROW) {
			snakes[0].west()
		} else if (p.keyCode === p.RIGHT_ARROW) {
			snakes[0].east()
		} else if (p.keyCode === p.UP_ARROW) {
			snakes[0].north()
		} else if (p.keyCode === p.DOWN_ARROW) {
			snakes[0].south()
		}
	}
}

windows = []


windows.push(new p5(snake));