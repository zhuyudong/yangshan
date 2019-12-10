#### 立方体

<!--start-code-->

```js
const Cube = () => {
  React.useEffect(() => {
    let playing = false
    function handleClick() {
      playing = !playing
      render()
    }
    //获取canvas
    const canvas = getCanvas('#canvas')
    //设置canvas尺寸为满屏
    resizeCanvas(canvas)
    //获取绘图上下文
    const gl = getContext(canvas)
    //创建着色器程序
    const program = createSimpleProgramFromScript(
      gl,
      `
          //浮点数设置为中等精度
          precision mediump float;
          //接收 JavaScript 传递过来的点的坐标（X, Y, Z）
          attribute vec3 a_Position;
          // 接收顶点颜色
          attribute vec4 a_Color;
          varying vec4 v_Color;
          uniform mat4 u_Matrix;

          void main(){
              gl_Position = u_Matrix * vec4(a_Position, 1);
              // 将顶点颜色插值处理传递给片元着色器
              v_Color = a_Color;
              gl_PointSize = 5.0;
          }
        `,
      `
          //浮点数设置为中等精度
          precision mediump float;
          varying vec4 v_Color;

          void main(){
              // 点的最终颜色。
              gl_FragColor = v_Color;
          }
        `
    )

    //使用该着色器程序
    gl.useProgram(program)
    const positions = [
      -0.5,
      -0.5,
      0.5,
      1,
      0,
      0,
      1,
      0.5,
      -0.5,
      0.5,
      1,
      0,
      0,
      1,
      0.5,
      0.5,
      0.5,
      1,
      0,
      0,
      1,
      -0.5,
      0.5,
      0.5,
      1,
      0,
      0,
      1,

      -0.5,
      0.5,
      0.5,
      0,
      1,
      0,
      1,
      -0.5,
      0.5,
      -0.5,
      0,
      1,
      0,
      1,
      -0.5,
      -0.5,
      -0.5,
      0,
      1,
      0,
      1,
      -0.5,
      -0.5,
      0.5,
      0,
      1,
      0,
      1,

      0.5,
      0.5,
      0.5,
      0,
      0,
      1,
      1,
      0.5,
      -0.5,
      0.5,
      0,
      0,
      1,
      1,
      0.5,
      -0.5,
      -0.5,
      0,
      0,
      1,
      1,
      0.5,
      0.5,
      -0.5,
      0,
      0,
      1,
      1,

      0.5,
      0.5,
      -0.5,
      1,
      0,
      1,
      1,
      0.5,
      -0.5,
      -0.5,
      1,
      0,
      1,
      1,
      -0.5,
      -0.5,
      -0.5,
      1,
      0,
      1,
      1,
      -0.5,
      0.5,
      -0.5,
      1,
      0,
      1,
      1,

      -0.5,
      0.5,
      0.5,
      1,
      1,
      0,
      1,
      0.5,
      0.5,
      0.5,
      1,
      1,
      0,
      1,
      0.5,
      0.5,
      -0.5,
      1,
      1,
      0,
      1,
      -0.5,
      0.5,
      -0.5,
      1,
      1,
      0,
      1,

      -0.5,
      -0.5,
      0.5,
      0,
      1,
      1,
      1,
      -0.5,
      -0.5,
      -0.5,
      0,
      1,
      1,
      1,
      0.5,
      -0.5,
      -0.5,
      0,
      1,
      1,
      1,
      0.5,
      -0.5,
      0.5,
      0,
      1,
      1,
      1
    ]
    const indices = [
      0,
      1,
      2,
      0,
      2,
      3,
      4,
      5,
      6,
      4,
      6,
      7,
      8,
      9,
      10,
      8,
      10,
      11,
      12,
      13,
      14,
      12,
      14,
      15,
      16,
      17,
      18,
      16,
      18,
      19,
      20,
      21,
      22,
      20,
      22,
      23
    ]
    // 随机生成一个颜色。
    const color = randomColor()
    // 找到着色器中的全局变量 u_Color;
    const u_Matrix = gl.getUniformLocation(program, 'u_Matrix')
    const a_Position = gl.getAttribLocation(program, 'a_Position')
    const a_Color = gl.getAttribLocation(program, 'a_Color')

    gl.enableVertexAttribArray(a_Position)
    gl.enableVertexAttribArray(a_Color)
    // 创建缓冲区
    const buffer = gl.createBuffer()
    // 绑定缓冲区为当前缓冲
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    // 设置 a_Position 属性从缓冲区读取数据方式
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 28, 0)
    // 设置 a_Color 属性从缓冲区读取数据方式
    gl.vertexAttribPointer(a_Color, 4, gl.FLOAT, false, 28, 12)
    // 向缓冲区传递数据
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

    //创建索引缓冲区
    const indicesBuffer = gl.createBuffer()
    //绑定索引缓冲区
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer)
    //向索引缓冲区传递索引数据
    gl.bufferData(
      gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(indices),
      gl.STATIC_DRAW
    )

    //设置清屏颜色为黑色。
    gl.clearColor(0, 0, 0, 1)
    //隐藏背面
    gl.enable(gl.CULL_FACE)

    const aspect = canvas.width / canvas.height
    //计算正交投影矩阵
    const projectionMatrix = matrix.ortho(
      -aspect * 4,
      aspect * 4,
      -4,
      4,
      100,
      -100
    )
    const deg2radians = lib3d.math.deg2radians
    const dstMatrix = matrix.identity()
    /*渲染*/
    function render() {
      xAngle += 1
      yAngle += 1
      //先绕 Y 轴旋转矩阵。
      matrix.rotationY(deg2radians(yAngle), dstMatrix)
      //再绕 X 轴旋转
      matrix.multiply(
        dstMatrix,
        matrix.rotationX(deg2radians(xAngle), tmpMatrix),
        dstMatrix
      )
      //模型投影矩阵。
      matrix.multiply(projectionMatrix, dstMatrix, dstMatrix)

      gl.uniformMatrix4fv(u_Matrix, false, dstMatrix)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0)
      if (!playing) {
        return
      }
      requestAnimationFrame(render)
    }
    let xAngle = 0
    let yAngle = 0
    // var dstMatrix = matrix.identity()
    const tmpMatrix = matrix.identity()
    document.body.addEventListener('click', handleClick)
    render()
    return () => {
      document.body.removeEventListener('click', handleClick)
    }
  }, [])
  return <canvas id="canvas" style={{ width: '100%' }}></canvas>
}
ReactDOM.render(<Cube />)
```

<!--end-code-->
