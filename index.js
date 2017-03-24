var score1 = document.getElementById("score");
var over = document.getElementsByClassName("gameover")[0];
var data = [];//保存数字的二维数组
var row = 4;//4行
var col = 4;//4列
var score = 0;
//游戏开始
function start(){
	over.style.display = "none";
	data = [
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0]
	]
	score = 0;
	//游戏开始时在两位随机位置生成2或4
	randomNum();
	randomNum();
	//将数组中的数字放入填字的格中
	updateView();
}
//在随机位置生成一个2或4
function randomNum(){
	//如果格子还没有满.在移动后就重新生成一个2或4的数
	if(!isFull()){
		while(true){
			//行和列的位置
			var r = parseInt(Math.random()*4);
			var c = parseInt(Math.random()*4);
			//如果这个各自上没有数,就放入2或4
			if(data[r][c] == 0){
				data[r][c] = Math.random()<0.5?2:4;
				break;//退出循环
			}
		}
	}
}
//存入数据
function updateView(){
	for(var r=0;r<row;r++){
		for(var c=0;c<col;c++){
			//遍历每一个cell
			var div = document.getElementById("c"+r+c);
			//从数组中找出每一个cell的值
			var num = data[r][c];
			//如果这个值不是0就保持原来的数值,否则就置空
			div.innerHTML=num!=0?num:"";
			div.className = num!=0?"cell n"+num:"cell";
		}
	}
	if(isGameOver()){
		// alert("游戏结束!!!");
		over.style.display = "block";
		over.innerHTML = "GMAEOVER,您的分数为:" + score; 
		over.onclick = function(){
			start();
		}
	}
}
//检测数组是否被填满的函数
function isFull(){
	//把数组中的每一个元素都遍历一遍
	for(var r=0;r<row;r++){
		for(var c=0;c<col;c++){
			if(data[r][c] == 0){
				return false;
			}
		}
	}return true;
}
//检测gameover的函数
function isGameOver(){
	//如果数组还没有被填满就返回false
	if(!isFull()){
		return false;
	}else{
		//如果数组满了就遍历数组,找是否还能继续移动,如果不能的话就满足结束游戏的条件
		for(var r=0;r<row;r++){
			for(var c=0;c<col;c++){
				//如果不是最后一列,就看一下这一行是否还能合成新的数
				if(c<col-1){	
					if(data[r][c] == data[r][c+1]){
						return false;
					}
				}
				if(r<row-1){
					if(data[r][c] == data[r+1][c]){
						return false;
					}
				}	
			}
		}
		return true;
	}
}
//找到每一行中当前格后面下一个不为0的数
function getRightNext(r,c){
	//遍历当前格后面的每一格
	for(var next=c+1;next<col;next++){
		if(data[r][next] != 0){
			return next;
		}
	}return -1;
}
//实现左移动
function moveLeft(){
	var oldData = data.toString();
	//遍历每一行
	for(var r=0;r<row;r++){
		//遍历每一行的每一个格
		for(var c=0;c<col-1;c++){
			//让每一格找一次下一个不为0的格
			var next = getRightNext(r,c);
			//如果这个格后面没有不为0的格
			if(next == -1){
				break;
			}else{
				if(data[r][c]==0){
				//如果当前的位置为0,就把下一个不为0的值赋给第一个
				data[r][c] = data[r][next];
				//下一个位置置0
				data[r][next] = 0;
				// ?????
				c--;
				}else if(data[r][c] == data[r][next]){
					//如果下一个位置的数和这个位置的数相等,就把这个两个数加到当前的位置
					data[r][c] *= 2;
					//下一个位置置为0
					data[r][next] = 0;
					score += data[r][c];
					score1.innerHTML = score;
				}
			}
		}
	}//更新了数组中的内容
	var nowData = data.toString();
	//如果
	if(oldData != nowData){
		randomNum();
		updateView();
	}
}
//找到当前格的前一个不为0的格
function getLeftNext(r,c){
	for(var prev=c-1;prev>=0;prev--){
		if(data[r][prev] != 0){
			return prev;
		}
	}return -1;
}
//实现右移动
function moveRight(){
	var oldData = data.toString();
	//遍历每一行
	for(var r=0;r<row;r++){
		//遍历每一行的每一个格子
		for(var c=col-1;c>0;c--){
			var prev = getLeftNext(r,c);
			if(prev == -1){
				break;
			}else{
				if(data[r][c] == 0){
					data[r][c] = data[r][prev];
					data[r][prev] = 0;
					c++;
				}else if(data[r][c] == data[r][prev]){
					data[r][c] *= 2;
					data[r][prev] = 0;
					score += data[r][c];
					score1.innerHTML = score;
				}
			}
		}
	}
	var nowData = data.toString();
	if(oldData != nowData){
		randomNum();
		updateView();
	}
}
//找到每一格中下一个不为0的格
function getDownNext(r,c){
	for(var next=r+1;next<row;next++){
		if(data[next][c] != 0){
			return next;
		}
	}return -1;
}
//实现上移动
function moveUp(){
	var oldData = data.toString();
	//遍历每一列
	for(var c=0;c<col;c++){
		//遍历每一列中的每一格
		for(var r=0;r<row-1;r++){
			var next = getDownNext(r,c);
			if(next == -1){
				break;
			}else{
				if(data[r][c] == 0){
					data[r][c] = data[next][c];
					data[next][c] = 0;
					r--;
				}else if(data[r][c] == data[next][c]){
					data[r][c] *= 2;
					data[next][c] = 0;
					score += data[r][c];
					score1.innerHTML = score;
				}
			}
		}
	}
	var nowData = data.toString();
	if(oldData != nowData){
		randomNum();
		updateView();
	}
}
//找到每一列中每一格的前一个不为0的格
function getUpNext(r,c){
	for(var prev=r-1;prev>=0;prev--){
		if(data[prev][c] != 0){
			return prev;
		}
	}return -1;
}
//实现下移动
function moveDown(){
	var oldData = data.toString();
	//遍历每一列
	for(var c=0;c<col;c++){
		//遍历每一列中的每一格
		for(var r=row-1;r>0;r--){
			var prev = getUpNext(r,c);
			if(prev == -1){
				break;
			}else{
				if(data[r][c] == 0){
					data[r][c] = data[prev][c];
					data[prev][c] = 0;
				}else if(data[r][c] == data[prev][c]){
					data[r][c] *= 2;
					data[prev][c] = 0;
					score += data[r][c];
					score1.innerHTML = score;
				}
			}
		}
	}
	var nowData = data.toString();
	if(oldData != nowData){
		randomNum();
		updateView();
	}
}
window.onload = function(){
	start();
	document.onkeydown = function(e){
		switch(e.keyCode){
			case 37:
				moveLeft();
				break;
			case 38:
				moveUp();
				break;
			case 39:
				moveRight();
				break;
			case 40:
				moveDown();
				break;
		}
	}
}
