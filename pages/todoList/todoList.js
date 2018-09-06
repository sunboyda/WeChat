// pages/todoList/todoList.js
Page({
  data:{
    list:[
      {id:1,name:"第一条",isSelect:false},
      { id: 2, name: "第二条", isSelect: false }
      ],
    todoName:"",
    num:0
  },
  addToDo(e){
    let {list,todoName} =this.data
    this.todoName = e.detail.value
    if (this.todoName.trim()===""){return}
    let length= list.length
    let id=0
    if(length===0){
      id=1
    }else{
      id=list[length-1].id+1
    }
    this.setData({
       list: [...list, { id, name: this.todoName,isSelect:false}],
      todoName:""
    })
    this.checkNum()
    this.setStorage()
  },
  select(e){
    let {list} = this.data
    let id=e.currentTarget.dataset.id
    let item = list.find(item=>id==item.id)
    item.isSelect = !item.isSelect
    this.setData({list:list})
    this.checkNum()
    this.setStorage()
  },
  del(e){
    let { list } = this.data
    let id = e.currentTarget.dataset.id
    let items = list.find(item => id == item.id)
    list=list.filter(item=>item!=items)
    this.setData({
      list
    })
    this.checkNum()
    this.setStorage()
  },
  checkAll(){
    let {list} = this.data
    let All=list.every(item=>item.isSelect)
    if(All){
      list.forEach(item=>item.isSelect=false)
    }else{
      list.forEach(item => item.isSelect = true)
    }
    this.setData({list})
    this.checkNum()
    this.setStorage()
  },
  clear(){
    let {list} = this.data
    list=list.filter(item=>!item.isSelect)
    this.setData({list})
    this.checkNum()
    this.setStorage()
  },
  setStorage(){
    wx.setStorageSync("todo", this.data.list)
  },
  onShow(){
    let {list} = this.data
    list = wx.getStorageSync("todo")
    this.setData({ list })
    this.checkNum()
  },
  checkNum(){
    let num=0
    this.data.list.forEach(item=>{
      if(!item.isSelect){
          num++
      }
    })
    this.setData({
      num
    })
  }
})