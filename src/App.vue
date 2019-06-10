<template>
  <v-app>

  <v-navigation-drawer
         enable-resize-watcher
         app
         v-model="drawer"
         clipped
       >
         <v-list avatar v-if="authenticated">
           <v-subheader>ACCOUNT 
           <br>
           {{profile.email}} </v-subheader>
           <v-divider></v-divider>
           <v-list-tile avatar to="/">
             <v-list-tile-action>
               <v-icon>format_align_justify</v-icon>
             </v-list-tile-action>
             <v-list-tile-title >Home</v-list-tile-title>
           </v-list-tile>


           <v-list-group
              no-action
              value="true"
            >
              <v-list-tile slot="activator">
                <v-list-tile-title>Menu</v-list-tile-title>
              </v-list-tile>

              <v-list-tile
                to="/paymentMethods"
              >
                <v-list-tile-title >TODO</v-list-tile-title>
                <v-list-tile-action>
                  <v-icon >monetization_on</v-icon>
                </v-list-tile-action>
              </v-list-tile>

              

            </v-list-group>

          <v-divider></v-divider>

           <v-list-tile avatar @click="logout()">
             <v-list-tile-action>
               <v-icon>exit_to_app</v-icon>
             </v-list-tile-action>
             <v-list-tile-title >Logout</v-list-tile-title>
           </v-list-tile>
        </v-list>
        <v-divider></v-divider>
        <v-list>

           <v-list-tile avatar to="/login" v-if="!authenticated">
             <v-list-tile-action>
               <v-icon>https</v-icon>
             </v-list-tile-action>
             <v-list-tile-title >Login</v-list-tile-title>
           </v-list-tile>
         </v-list>
       </v-navigation-drawer>

    <v-toolbar dense
      fixed
      clipped-left
      app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"  ></v-toolbar-side-icon>
      <v-toolbar-title class="headline text-uppercase">
        <span>APP</span>
        <span class="font-weight-light"> VUE + STRAPI</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items >
            <v-btn v-if="!authenticated" to="/login" small  >Login</v-btn>
            <v-menu v-if="authenticated">
             <v-btn slot="activator" >
               <v-icon>more_vert</v-icon>
             </v-btn>

             <v-list>
               <v-list-tile to="/">
                 <v-list-tile-title>Home</v-list-tile-title>
               </v-list-tile>
               <v-divider></v-divider>

              <v-list-tile @click="logout()">
                 <v-list-tile-title>Logout</v-list-tile-title>
               </v-list-tile>
             </v-list>
           </v-menu>

          </v-toolbar-items>

    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>

    <v-snackbar
        v-model="networkError"
        color="error"
      >
        <v-icon >signal_wifi_off</v-icon>
        <v-flex class="subheading" ma-3 >
        Network error
      </v-flex>


    </v-snackbar>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  name: 'App',
  components: {

  },
  data () {
    return {
      clipped: true,
      drawer: true,
      fixed: true,
      networkError:false
    }
  },
  methods: {
    logout (){
        this.$store.dispatch("AUTH_LOGOUT");
        this.$router.push('/')
    }
  },
 computed: {
      authenticated() {
          return this.$store.getters.isAuthenticated
      },
      profile(){
        return this.$store.getters.getProfile
      }
  },
  created: function () {
    if (this.$store.getters.isAuthenticated) {
      this.$store.dispatch("USER_REQUEST")
    }

    axios.interceptors.response.use(response => {
       return response;
    }, error => {
      if (error.message === 'Network Error') {
        this.networkError=true;
        return Promise.reject(error);
      }

      if (error && error.response && error.response.status === 401) {
       this.$store.dispatch("AUTH_LOGOUT")
       //this.$router.push('/')
      }
      return Promise.reject(error);
    });
  }
}
</script>
