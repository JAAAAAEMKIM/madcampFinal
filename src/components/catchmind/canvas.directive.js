// canvas.directive.js

import Pusher from 'pusher-js';
import axios from 'axios';

let USER_STROKE;
let LINE_WIDTH;

var isErasing = false;

function inserted(el,binding) {
  let canvas = el;
  let ctx = canvas.getContext('2d');

  USER_STROKE = binding.value.color;
  LINE_WIDTH = binding.value.width;

  canvas.width = 700;
  canvas.height = 700;

  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';


  const pusher = new Pusher('a2937fdcc7ec06649e65', {
    cluster: 'ap3',
  });
  const channel_name = binding.value.channel;
  const channel = pusher.subscribe(channel_name);
  console.log("directive 내의 channel : " + channel_name);

  let prevPos = { offsetX: 0, offsetY: 0 };
  let line = [];
  let isPainting = false;

  const userId = binding.value.username;
  console.log("유저 아이디 : " + userId);

  channel.bind('draw', (data) => {
      const { channel: channel, userId: id, color: color, linewidth : linewidth, line } = data;
      line.forEach((position) => {
           paint(position.start, position.stop, color, linewidth);
      });
   });

   console.log("binding의 erasing값 1 : " + isErasing);

   // Initial painting
   console.log("binding의 painting 값 : ")
   console.log(binding.value.painting)
   ctx.fillStyle = "white";
   ctx.fillRect(0, 0, canvas.width, canvas.height);
   var painting = binding.value.painting
   painting[0].forEach((position) =>{
     const { channel: channel, userId: id, color: color,linewidth : linewidth, line } = position;
     line.forEach((position) => {
          paint(position.start, position.stop, color, linewidth);
     });
   });


  function handleMouseDown(e) {
    const { offsetX, offsetY } = e;
    isPainting = true;
    prevPos = { offsetX, offsetY };
  }

  function endPaintEvent() {
    if (isPainting) {
      isPainting = false;
      sendPaintData();
    }
  }

  function handleMouseMove(e) {
    if (isPainting) {
      const { offsetX, offsetY } = e;
      const offSetData = { offsetX, offsetY };
      const positionInfo = {
        start: { ...prevPos },
        stop: { ...offSetData },
      };
      line = line.concat(positionInfo);

      paint(prevPos, offSetData, USER_STROKE, LINE_WIDTH);
    }
  }

  function sendPaintData() {
    const body = {
      line,
      channel : channel_name,
      userId,
      color : USER_STROKE,
      linewidth : LINE_WIDTH
    };
    console.log(body)
    axios.post(`https://143.248.39.49:4500/catchmind/paint`,body)
      .then(() => (line = []));
  }

  function paint(prevPosition, currPosition, strokeStyle, strokeWidth) {
    const { offsetX, offsetY } = currPosition;
    const { offsetX: x, offsetY: y } = prevPosition;
    ctx.beginPath();
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = strokeWidth;
    ctx.moveTo(x, y);
    ctx.lineTo(offsetX, offsetY); //visualize
    ctx.stroke();                 //visualize
    prevPos = { offsetX, offsetY };
  }

  canvas.addEventListener('mousedown', handleMouseDown);
  canvas.addEventListener('mousemove', handleMouseMove);
  canvas.addEventListener('mouseup', endPaintEvent);
  canvas.addEventListener('mouseleave', endPaintEvent);
}
//
function update(el,binding) {
  isErasing = binding.value.isErasing;
  console.log("binding의 erasing값 2 : " + isErasing);
  let canvas = el;
  let ctx = canvas.getContext('2d');
  if(isErasing){
    USER_STROKE = 'white';
    LINE_WIDTH = binding.value.width;
    console.log("지우개 색깔 : " + USER_STROKE + " 두께 : " + LINE_WIDTH);
  } else{
    USER_STROKE = binding.value.color;
    LINE_WIDTH = binding.value.width;
    console.log("새로운 색깔 : " + USER_STROKE + " 두께 : " + LINE_WIDTH);
  }
}

export default {
  inserted, update
};
