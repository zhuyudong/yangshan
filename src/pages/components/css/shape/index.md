# 形状

##### 1. 正方形

<!--start-code-->

```js
const Square = styled.div`
  width: 100px;
  height: 100px;
  background: red;
`
ReactDOM.render(<Square />)
```

<!--end-code-->

<!--divider-->

##### 2. 长方形

<!--start-code-->

```js
const Rectangle = styled.div`
  width: 200px;
  height: 100px;
  background: red;
`
ReactDOM.render(<Rectangle />)
```

<!--end-code-->

<!--divider-->

##### 3. 圆形

<!--start-code-->

```js
const Circle = styled.div`
  width: 100px;
  height: 100px;
  background: red;
  border-radius: 50%;
`
ReactDOM.render(<Circle />)
```

<!--end-code-->

<!--divider-->

##### 4. 椭圆形

<!--start-code-->

```js
const Oval = styled.div`
  width: 200px;
  height: 100px;
  background: red;
  border-radius: 100px / 50px;
`
ReactDOM.render(<Oval />)
```

<!--end-code-->

<!--divider-->

##### 5. 上三角

<!--start-code-->

```js
const TriangleUp = styled.div`
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 100px solid red;
`
ReactDOM.render(<TriangleUp />)
```

<!--end-code-->

<!--divider-->

##### 6. 下三角

<!--start-code-->

```js
const TriangleDown = styled.div`
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-top: 100px solid red;
`
ReactDOM.render(<TriangleDown />)
```

<!--end-code-->

<!--divider-->

##### 7. 左三角

<!--start-code-->

```js
const TriangleLeft = styled.div`
  width: 0;
  height: 0;
  border-top: 50px solid transparent;
  border-right: 100px solid red;
  border-bottom: 50px solid transparent;
`
ReactDOM.render(<TriangleLeft />)
```

<!--end-code-->

<!--divider-->

##### 8. 右三角

<!--start-code-->

```js
const TriangleRight = styled.div`
  width: 0;
  height: 0;
  border-top: 50px solid transparent;
  border-left: 100px solid red;
  border-bottom: 50px solid transparent;
`
ReactDOM.render(<TriangleRight />)
```

<!--end-code-->

<!--divider-->

##### 9. 左上角

<!--start-code-->

```js
const RectangleTopLeft = styled.div`
  width: 0;
  height: 0;
  border-top: 100px solid red;
  border-right: 100px solid transparent;
`
ReactDOM.render(<RectangleTopLeft />)
```

<!--end-code-->

<!--divider-->

##### 10. 右上角

<!--start-code-->

```js
const RectangleTopRight = styled.div`
  width: 0;
  height: 0;
  border-top: 100px solid red;
  border-left: 100px solid transparent;
`
ReactDOM.render(<RectangleTopRight />)
```

<!--end-code-->

<!--divider-->

##### 11. 左下角

<!--start-code-->

```js
const RectangleBottomLeft = styled.div`
  width: 0;
  height: 0;
  border-bottom: 100px solid red;
  border-right: 100px solid transparent;
`
ReactDOM.render(<RectangleBottomLeft />)
```

<!--end-code-->

<!--divider-->

##### 12. 右下角

<!--start-code-->

```js
const RectangleBottomRight = styled.div`
  width: 0;
  height: 0;
  border-bottom: 100px solid red;
  border-left: 100px solid transparent;
`
ReactDOM.render(<RectangleBottomRight />)
```

<!--end-code-->

<!--divider-->

##### 13. 箭头

<!--start-code-->

```js
// TODO
// const CurveDarrow = styled.div`
//   position: relative;
//   width: 0;
//   height: 0;
//   border-top: 9px solid transparent;
//   border-right: 9px splid red;
//   transform: rotate(10deg);
//   :after {
//     content: '';
//     position: absolute;
//     border: 0 solid transparent;
//     border-top: 3px solid red;
//     border-radius: 20px 0 0 0;
//     top: -12px;
//     left: -9px;
//     width: 12px;
//     height: 12px;
//     transform: rotate(45deg);
//   }
// `
// ReactDOM.render(<CurveDarrow />)
```

<!--end-code-->

<!--divider-->

##### 14. 梯形

<!--start-code-->

```js
```

<!--end-code-->

<!--divider-->

##### 15. 平行四边形

<!--start-code-->

```js
```

<!--end-code-->

<!--divider-->

##### 16. 星星（6 角）

<!--start-code-->

```js
```

<!--end-code-->

<!--divider-->

##### 17. 星星（5 角）

<!--start-code-->

```js
```

<!--end-code-->

<!--divider-->

##### 18. 五边形

<!--start-code-->

```js
```

<!--end-code-->

<!--divider-->

##### 19. 六边形

<!--start-code-->

```js
```

<!--end-code-->

<!--divider-->

##### 20. 八变形

<!--start-code-->

```js
```

<!--end-code-->

<!--divider-->

##### 21. 爱心

<!--start-code-->

```js
```

<!--end-code-->

<!--divider-->

##### 22. 无穷大

<!--start-code-->

```js
```

<!--end-code-->

<!--divider-->

##### 23. 菱形

<!--start-code-->

```js
```

<!--end-code-->

<!--divider-->

##### 24. 钻石

<!--start-code-->

```js
```

<!--end-code-->

<!--divider-->

##### 25. 钻戒

<!--start-code-->

```js
```

<!--end-code-->

<!--divider-->

##### 26. 钻石 2

<!--start-code-->

```js
```

<!--end-code-->

<!--divider-->

##### 27. 蛋蛋

<!--start-code-->

```js
```

<!--end-code-->

<!--divider-->

##### 28. 吃豆人

<!--start-code-->

```js
```

<!--end-code-->

<!--divider-->

##### 29. 对话泡泡

<!--start-code-->

```js
```

<!--end-code-->

<!--divider-->

##### 30. 12 点爆发

<!--start-code-->

```js
```

<!--end-code-->

<!--divider-->

##### 31. 8 点爆发

<!--start-code-->

```js
```

<!--end-code-->

<!--divider-->

##### 32. 太极

<!--start-code-->

```js
```

<!--end-code-->

<!--divider-->

##### 33. 徽章丝带

<!--start-code-->

```js
```

<!--end-code-->

<!--divider-->

##### 34. 太空入侵者（电脑游戏名）

<!--start-code-->

```js
```

<!--end-code-->

<!--divider-->

##### 35. 电视

<!--start-code-->

```js
```

<!--end-code-->

<!--divider-->

##### 36. 雪佛龙

<!--start-code-->

```js
```

<!--end-code-->

<!--divider-->

##### 37. 放大镜

<!--start-code-->

```js
```

<!--end-code-->

<!--divider-->

##### 38. Facebook 图标

<!--start-code-->

```js
```

<!--end-code-->

<!--divider-->

##### 39. 月亮

<!--start-code-->

```js
```

<!--end-code-->

<!--divider-->

##### 40. 旗

<!--start-code-->

```js
```

<!--end-code-->

<!--divider-->

##### 41. 圆锥

<!--start-code-->

```js
```

<!--end-code-->

<!--divider-->

##### 42. 十字架

<!--start-code-->

```js
```

<!--end-code-->

<!--divider-->

##### 43. 根基

<!--start-code-->

```js
```

<!--end-code-->

<!--divider-->

##### 44. 指示器

<!--start-code-->

```js
```

<!--end-code-->

<!--divider-->

##### 45. 锁

<!--start-code-->

```js
```

<!--end-code-->

#### 参考资料

- [45 个值得收藏的 CSS 形状](https://www.toutiao.com/i6763165670759727619/)
