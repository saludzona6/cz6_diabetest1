<template>
  <v-container >
      <v-layout  justify-center mt-2 >
        <v-flex xs12 md12 ma-1 transition="scale-transition">
          <v-toolbar >
              User: {{profile.username}} | {{profile.email}}
              <v-spacer></v-spacer>
              <v-toolbar-items class="hidden-sm-and-down">
                <v-btn  to="/profile" color="blue-grey lighten-1" >Profile</v-btn>
              </v-toolbar-items>
          </v-toolbar>
          <v-card>
          </v-card>
        </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
import axios from "axios"
export default {
  data(){
    return {

    }
  },
  computed:{
    profile(){
        return this.$store.getters.getProfile
      }
  },
  methods: {

  }
}
</script>
