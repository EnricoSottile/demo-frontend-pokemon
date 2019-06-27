<template>
  <nav class="nav">
    <div class="container-fluid">
      <a href="#" class="brand">Madisoft test project</a>

      <button @click="showMobileMenu = !showMobileMenu" class="open">apri menu</button>

      <div class="nav-menu" :class="{'nav-show': showMobileMenu}">
        
        

        <a @click="showMobileMenu = !showMobileMenu" class="close" href="#">&times;</a >

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
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
        showMobileMenu: false,
    };
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

  .nav-menu {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    width: 100%;

    display: none;

    &.nav-show {
        display: block;
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
