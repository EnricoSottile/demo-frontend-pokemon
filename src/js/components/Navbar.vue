<template>
  <nav class="nav">
    <div class="container-fluid">
      <a href="#" class="brand">Madisoft test project</a>

      <button @click="showMobileMenu()" class="open">apri menu</button>

      <div id="nav-menu">
        
        <a @click="hideMobileMenu()" class="close" href="#">&times;</a >

        <ul>
          <li>
            <a href="#">Menu item 1</a>
          </li>
          <li>
            <a href="#">Menu item 2</a>
          </li>
          <li>
            <a href="#">Menu item 3</a>
          </li>
          <li>
            <a href="#">Menu item 4</a>
          </li>
        </ul>
      </div><!--#nav-menu-->

    </div>
  </nav>
</template>

<script>
import { setTimeout } from 'timers';
export default {
  data() {
    return {

    };   
  },

  methods: {

    // Vue's Transition component has specific requirement
    // and does not work with the way I made the menu.
    // Therefore I do a simple vanilla js/css to animate nav
    showMobileMenu(){
      const menu = document.getElementById('nav-menu');
      menu.classList.add("nav-showing");
      
      setTimeout(() => {
        menu.classList.add("nav-show");
      }, 1);
    },
    hideMobileMenu(){
      const menu = document.getElementById('nav-menu');
      menu.classList.remove("nav-show");

      setTimeout(() => {
        menu.classList.remove("nav-showing");
      }, 310); // css animation time .3s
    }


  }



};
</script>

<style lang="scss" scoped>
.nav {
  height: 60px;
  margin-bottom: 20px;
  background-color: white;
  box-shadow: 0px 1px 10px 2px rgba(0, 0, 0, 0.1);

  .container-fluid {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

ul {
  display: flex;

  li {
    margin: 0 0.8rem;
  }

  a {
    color: #777;
    &:hover {
      color: #222;
    }
  }
}

.brand {
  color: #222;
  text-transform: uppercase;
}

.close, .open {
  display: none;
}

@media only screen and (max-width: 48em) {
    .open {
        display: block;
    }

  #nav-menu {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    width: 100%;

    transition: all .3s cubic-bezier(0.445, 0.05, 0.55, 0.95);
    display: none;
    opacity:0;

    &.nav-showing {
      display: block;
    }

    &.nav-show {
        display: block;
        opacity:1;
    }

    .close {
        display: block;
        position: absolute;
        top: 1rem;
        right: 1rem;
        width: 30px;
        font-size: 30px;
        line-height: 1;
        text-align: center;
        color: #aaa;

        &:hover {
            color: #333;
        }
    }

    ul {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;

      padding: 2rem;
      background-color: white;
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;

      text-align: center;
    }

    li {
      padding: 0.5rem 0;
      display: block;
      margin: 0;
    }
  }
}
</style>
