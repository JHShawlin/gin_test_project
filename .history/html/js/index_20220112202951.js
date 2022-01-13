// 4. 获取游戏场景
var scene = document.getElementsByClassName('scene')[0];
// 获取战斗层
var warLayer = document.getElementsByClassName('war-layer')[0];

// 5. 获取小飞机
var hero = document.getElementById('hero');
//获得游戏中分数显示界面
var scorediv=document.getElementById("scorediv");
//获得分数界面
var scorelabel=document.getElementById("label");
var scores=0;
// 6. 使用鼠标移动小飞机
// 鼠标移动事件

var move=function (event) {

    // 获得鼠标的位置坐标
    var x = event.clientX;
    var y = event.clientY;

    // 把鼠标的坐标赋值给飞机
    hero.style.top = y - hero.offsetHeight / 2 + 'px';
    hero.style.left = x - hero.offsetWidth / 2 + 'px';
}

scene.addEventListener("mousemove", move);

// 7.发射子弹
function makeBullet() {
    // 生成子弹元素
    var bullet = document.createElement('img');
    // 设置子弹图片
    bullet.src = "./img/bullet.png";
    // 这是子弹样式
    bullet.setAttribute('class', 'bullet');
    // 设置子弹位置，在飞机头部中间位置发射
    bullet.style.left = hero.offsetLeft + hero.offsetWidth / 2 + -5 + 'px';
    bullet.style.top = hero.offsetTop - 20 + 'px';

    // 把子弹添加到战斗层页面上
    warLayer.appendChild(bullet);
}


// 8. 使用定时器定时生成子弹
var timer = setInterval(function () {
    makeBullet();
}, 500)


/** 子弹飞行动画 **/ 

// var 子弹飞行速度
var speed = 10;
var espeed = 8;
// 9.子弹移动动画
set=setInterval(function () {

    var bullets = document.getElementsByClassName('bullet');
    var enemies = document.getElementsByClassName('enemy');
    // 子弹飞行
    for (var i = 0; i < bullets.length; i++) {
        var bullet = bullets[i];

        bullet.style.top = bullet.offsetTop - speed + 'px';

        if (bullet.offsetTop < -100) {
            warLayer.removeChild(bullet);
        }

    }



    // 12. 敌机飞行
    for (var i = 0; i < enemies.length; i++) {
        var enemy = enemies[i];
        enemy.style.top = enemy.offsetTop + espeed + 'px';

        if (enemy.offsetTop > scene.offsetHeight) {

            warLayer.removeChild(enemy);
        }

        if (hero.offsetLeft >= enemy.offsetLeft && hero.offsetLeft <= enemy.offsetLeft+enemy.offsetWidth
            && hero.offsetTop >= enemy.offsetTop && hero.offsetTop <= enemy.offsetTop+enemy.offsetHeight) {
                if (document.removeEventListener) {
                    scene.removeEventListener("mousemove", move);
                } else if (document.detachEvent) {
                    scene.detachEvent("onmousemove", move);
                }
                clearInterval(set);
                clearInterval(timer);
            }
        for (var j = 0; j < bullets.length; j++) {
            var bullet = bullets[j];
            if (bullet.offsetLeft >= enemy.offsetLeft && bullet.offsetLeft <= enemy.offsetLeft+enemy.offsetWidth
                && bullet.offsetTop >= enemy.offsetTop && bullet.offsetTop <= enemy.offsetTop+enemy.offsetHeight) {
                    warLayer.removeChild(enemy);
                    warLayer.removeChild(bullet);
                    scores++;
                    scorelabel.innerHTML=scores;
                    break;
                }
        }
    }

}, 16)


// 10. 生成敌机
function makeEnemy() {
    var enemy = document.createElement('img');
    enemy.src = "./img/monster.png";
    enemy.setAttribute('class', 'enemy');
    enemy.style.left = Math.random() * scene.offsetWidth - 100 + 'px';
    enemy.style.top = '0px';
    warLayer.appendChild(enemy);
}

// 11. 使用定时器定时生成敌机
var timer = setInterval(function () {
    makeEnemy();
}, 500)
