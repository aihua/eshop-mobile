<template>
  <div id="modal">
    <div class="modal-mask" v-show="showView" transition='modal'>
      <div class="modal-container">
        <div class="modal-content">
          <div class="header">
              default header
          </div>
          <div class="body">
              default body
          </div>
          <div class="footer">
              <button @click='showView = false'>close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
//      props:{
//        show:
//          {
//            twoWay:true
//          }

//      },
    props:['showView'],
      methods:{

      }
  }
</script>
<style>
  .modal-mask
  {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    transition: opacity .3s ease;
  }
  .modal-container
  {
    position: absolute;
    top: 50%;
    left: 50%;
    transform:translate(-50%,-50%);
  }
  .modal-content
  {
    width: 300px;
    margin: 0 auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }
  .modal-enter,.modal-leave
  {
    opacity: 0;
  }
  .modal-enter .modal-content,
  .modal-leave .modal-content
  {
    transform: scale(1.1); /* 标准语法 */
  }
</style>
